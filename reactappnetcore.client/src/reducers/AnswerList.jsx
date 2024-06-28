import { get } from "./requests";

const apiUrl = import.meta.env.VITE_API_URL;

export const GET_ANSWER_LIST_WITH_USERNAME = 'GET_ANSWER_LIST_WITH_USERNAME';

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

// reducer
export default function reducer(state = {
    data: [],
}, action) {
    switch (action.type) {
        case GET_ANSWER_LIST_WITH_USERNAME:
            return {
                ...state,
                data: action.payload
            };

        default:
            break;
    }
    return state;
}