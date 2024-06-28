import React, { useCallback, useEffect, useState } from 'react';
// import store from '../stores/store';
import { ReactFormGenerator } from '../../../../FormBuilderComponent';
import * as variables from "../../../../../variables";
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    OPTIONS: '',
};

const apiUrl = import.meta.env.VITE_API_URL;
const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';

const CreateAnswerForm = ({ match }) => {
    const [data, setData] = useState([]);
    const [answerData, setAnswerData] = useState();
    const userLogin = useSelector(state => state.UserCurrent.userLogin);
    
    useEffect(() => {
        const parts = (match.url !== null && match.url !== undefined) ? match.url.split('/') : "";
        let Id = parseInt(parts[parts.length-1]);
        const fetchData = async () => {
            if (!isNaN(Id)) {
                await fetch(`${apiUrl}/Controls/GetControlsWithTemplateId/${Id}`, {
                    method: 'GET',
                    headers,
                }).then(response => response.json())
                    .then(x => {
                        x = x.map(itemX => {
                            return {
                                ...itemX.taskData,
                                ...itemX,
                                taskData: undefined
                            };
                        });
                        setData(x);
                    });
                
                await fetch(`${apiUrl}/Answers/GetAnswerNotDefault/${Id}`, {
                    method: 'GET',
                    headers,
                }).then(response => response.json())
                .then(c => {
                    setAnswerData(c.answerData);
                }).catch(err => {
                    fetch(`${apiUrl}/Answers/GetAnswerDefault/${Id}`, {
                        method: 'GET',
                        headers,
                    }).then(response => response.json())
                    .then(c => {
                        setAnswerData(c.answerData);
                    });
                });
                // await fetch(`${apiUrl}/Answers/GetAnswerDefault/${Id}`, {
                //     method: 'GET',
                //     headers,
                // }).then(response => response.json())
                // .then(c => {
                //     setAnswerData(c.answerData);
                //     // setAnswer(c);
                //     console.log(2)
                // });
            }
        }
        fetchData();
    }, [])

    const onSubmit = (data) => {
        const currentUrl = window.location.href;
        const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        
        if (!isNaN(lastSegment)) {
            fetch(`${apiUrl}/Answers/AddAnswerNotDefaultWithId/${lastSegment}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    templateId: parseInt(lastSegment),
                    username : userLogin.username,
                    answerData: data,
                }),
            }).then(response => {
                if (window.confirm("Save success")) {
                    // window.location.href = "/";
                } else {
                    // window.location.href = "/";
                }

            });
        } else {
            alert("Chưa save Template");
        }
    }

    return (
        <>
            {answerData ? (
                <ReactFormGenerator
                    key={nanoid()}
                    download_path=""
                    answer_data={answerData}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    // skip_validations={true}
                    onSubmit={onSubmit}
                    variables={variables}
                    data={data}
                    locale={language}
                />
            ) : <ReactFormGenerator
                    key={nanoid()}
                    download_path=""
                    answer_data={[]}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    // skip_validations={true}
                    onSubmit={onSubmit}
                    variables={variables}
                    data={data}
                    locale={language}
                />
            }
        </>
    )


}

export default CreateAnswerForm;