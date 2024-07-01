import { get, post } from "./requests";

const apiUrl = import.meta.env.VITE_API_URL;

export const GET_ANSWER_LIST_WITH_USERNAME = 'GET_ANSWER_LIST_WITH_USERNAME';
export const SEARCH_ANSWER_WITH_KEYWORD = 'SEARCH_ANSWER_WITH_KEYWORD';
export const GET_ANSWER_NOT_DEFAULT_WITH_TEMPLATE_ID = 'GET_ANSWER_NOT_DEFAULT_WITH_TEMPLATE_ID';
export const SET_ANSWER_DATA_CURRENT = 'SET_ANSWER_DATA_CURRENT';
export const GET_ANSWER_WITH_ID = 'GET_ANSWER_WITH_ID';

// action
export const getAnswerListWithUsername = username => (dispatch) => {
    get(`${apiUrl}/Answers/GetAnswersWithUsername/${username}`).then(res => {
        dispatch({
            type: GET_ANSWER_LIST_WITH_USERNAME,
            payload: res.data
        });
    }).catch(err => {
        console.log("getAnswerListWithUsername", err.message);
        dispatch({
            type: GET_ANSWER_LIST_WITH_USERNAME,
            payload: []
        })
    })
};

export const searchAnswerWithKeyword = keyword => (dispatch) => {
    get(`${apiUrl}/Answers/Search?keyword=${keyword}`).then(res => {
        dispatch({
            type: SEARCH_ANSWER_WITH_KEYWORD,
            payload: res.data
        });
    }).catch(err => {
        console.log("getAnswerListWithUsername", err.message);
        dispatch({
            type: SEARCH_ANSWER_WITH_KEYWORD,
            payload: []
        })
    })
};

export const getAnswerDefaultWithTemplateId = templateId => (dispatch) => {
    if (isNaN(templateId)) {
        return;
    }
    let taskDataCurrent = [];
    get(`${apiUrl}/Controls/GetControlsWithTemplateId/${templateId}`).then(resTaskData => {
        taskDataCurrent = resTaskData.data.map(itemX => {
            return {
                ...itemX.taskData,
                ...itemX,
                taskData: undefined
            };
        });
        get(`${apiUrl}/Answers/GetAnswerDefault/${templateId}`).then(resAnswerDefault => {
            dispatch({
                type: GET_ANSWER_NOT_DEFAULT_WITH_TEMPLATE_ID,
                payload: {
                    taskDataCurrent,
                    answerDataCurrent : resAnswerDefault.data?.answerData,
                    templateIdCurrent : templateId
                }
            });
        });


        // get(`${apiUrl}/Answers/GetAnswerNotDefault/${templateId}`).then(resAnswerNotDefault => {
        //     dispatch({
        //         type: GET_ANSWER_NOT_DEFAULT_WITH_TEMPLATE_ID,
        //         payload: {
        //             taskDataCurrent,
        //             answerDataCurrent : resAnswerNotDefault.data
        //         }
        //     });
        // }).catch(err => {
        //     console.log("getAnswerNotDefaultWithTemplateId", err.message);
        //     get(`${apiUrl}/Answers/GetAnswerDefault/${templateId}`).then(resAnswerDefault => {
        //         dispatch({
        //             type: GET_ANSWER_NOT_DEFAULT_WITH_TEMPLATE_ID,
        //             payload: {
        //                 taskDataCurrent,
        //                 answerDataCurrent : resAnswerDefault.data
        //             }
        //         });
        //     })
        // })
    }).catch(err => {
        console.log("getAnswerDefaultWithTemplateId", err.message);
        dispatch({
            type: GET_ANSWER_NOT_DEFAULT_WITH_TEMPLATE_ID,
            payload: {
                taskDataCurrent : [],
                answerDataCurrent : [],
                templateIdCurrent : null
            }
        })
    })
}

export const addAnswerNotDefaultWithTemplateId = (templateId, data) => (dispatch) => {
    if(isNaN(templateId)) {
        alert("Template not saved yet");
        return;
    }
    post(`${apiUrl}/Answers/AddAnswerNotDefaultWithTemplateId/${templateId}`, data).then(res => {
        if (window.confirm("Save success")) {
            // window.location.href = "/";
        } else {
            // window.location.href = "/";
        }
        dispatch({
            type : SET_ANSWER_DATA_CURRENT,
            payload : res.data?.answerData
        });
    }).catch(err => {
        console.log("addAnswerNotDefaultWithTemplateId", err.message);
    })
}

export const getAnswerWithId = Id => (dispatch) => {
    if (isNaN(Id)) {
        return;
    }

    let taskDataCurrent = [];
    get(`${apiUrl}/Answers/${Id}`).then(resAnswer => {
        get(`${apiUrl}/Controls/GetControlsWithTemplateId/${resAnswer.data?.templateId}`).then(resTaskData => {
            taskDataCurrent = resTaskData.data.map(itemX => {
                return {
                    ...itemX.taskData,
                    ...itemX,
                    taskData: undefined
                };
            });
            dispatch({
                type: GET_ANSWER_WITH_ID,
                payload: {
                    taskDataCurrent,
                    answerDataCurrent : resAnswer.data?.answerData,
                    templateIdCurrent : resAnswer.data?.templateId
                }
            });
        }).catch(err => {
            console.log("getAnswerWithId", err.message);
            dispatch({
                type: GET_ANSWER_WITH_ID,
                payload: {
                    taskDataCurrent : [],
                    answerDataCurrent : [],
                    templateIdCurrent : null
                }
            });
        });
    }).catch(err => {
        console.log("getAnswerWithId", err.message);
        dispatch({
            type: GET_ANSWER_WITH_ID,
            payload: {
                taskDataCurrent : [],
                answerDataCurrent : [],
                templateIdCurrent : null
            }
        });
    });
}

export const updateAnswerNotDefaultWithId = (Id, answer) => (dispatch) => {
    post(`${apiUrl}/Answers/UpdateAnswerNotDefaultWithId/${Id}`, answer).then(res => {
        if (window.confirm("Save success")) {
            // window.location.href = "/";
        } else {
            // window.location.href = "/";
        }
        dispatch({
            type : SET_ANSWER_DATA_CURRENT,
            payload : res.data?.answerData
        });
    }).catch(err => {
        console.log("UpdateAnswerNotDefaultWithId", err.message);
        alert("Save fail.")
    })
}

// reducer
export default function reducer(state = {
    data: [],
    taskDataCurrent: [],
    answerDataCurrent : [],
    templateIdCurrent : null,
}, action) {
    switch (action.type) {
        case GET_ANSWER_LIST_WITH_USERNAME:
            return {
                ...state,
                data: action.payload
            };
        case SEARCH_ANSWER_WITH_KEYWORD:
            return {
                ...state,
                data: action.payload
            };
        case GET_ANSWER_NOT_DEFAULT_WITH_TEMPLATE_ID:
            return {
                ...state,
                taskDataCurrent: action.payload.taskDataCurrent,
                answerDataCurrent: action.payload.answerDataCurrent,
                templateIdCurrent : action.payload.templateIdCurrent
            };
        case SET_ANSWER_DATA_CURRENT:
            return {
                ...state,
                answerDataCurrent: action.payload
            };
        case GET_ANSWER_WITH_ID:
            return {
                ...state,
                taskDataCurrent: action.payload.taskDataCurrent,
                answerDataCurrent: action.payload.answerDataCurrent,
                templateIdCurrent : action.payload.templateIdCurrent
            };
        default:
            break;
    }
    return state;
}