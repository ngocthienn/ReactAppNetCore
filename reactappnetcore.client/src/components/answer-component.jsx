import React, { useCallback, useEffect, useState } from 'react';
import store from '../stores/store';
import { ReactFormGenerator } from '../react-form-builder2';
import { useLocation } from 'react-router';
import * as variables from "../variables";
import AnswerForm from './AnswerForm';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    OPTIONS: '',
};

const apiUrl = import.meta.env.VITE_API_URL;

const Answer = () => {
    const [data, setData] = useState([]);
    const [answerData, setAnswerData] = useState();
    const [answer, setAnswer] = useState([]);
    const [id, setId] = useState('');

    const location = useLocation();



    useEffect(() => {
        let Id = parseInt(location.pathname.replace("/Answer/", ""));
        const fetchData = async () => {
            if (!isNaN(Id)) {
                await fetch(`${apiUrl}/Template/GetControl/${Id}`, {
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
                        // if (data && data.length > 0 && x.length === 0) {
                        //     data.forEach(y => x.push(y));
                        // };

                    });

                await fetch(`${apiUrl}/Answer/GetAnswerDefault/${Id}`, {
                    method: 'GET',
                    headers,
                }).then(response => response.json())
                    .then(c => {
                        setAnswerData(c.answerData);
                        // setAnswer(c);
                        console.log(2)
                    });
            }

            console.log(1)
        }
        fetchData();
    }, [location])

    const onSubmit = (data) => {
        const currentUrl = window.location.href;
        const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

        if (!isNaN(lastSegment)) {
            fetch(`${apiUrl}/Answer/AddAnswerNotDefaultWithId/${lastSegment}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    templateId: parseInt(lastSegment),
                    answerData: data,
                }),
            }).then(response => {
                if (window.confirm("Update thành công")) {
                    window.location.href = "/";
                } else {
                    window.location.href = "/";
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
                    download_path=""
                    back_action="/"
                    back_name="Back"
                    answer_data={answerData}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    // skip_validations={true}
                    onSubmit={onSubmit}
                    variables={variables}
                    data={data}
                    locale="en"
                />
            ) : <AnswerForm answerData={[]} variables={variables} data={data} onSubmit={onSubmit}/>}
        </>
    )


}

export default Answer;