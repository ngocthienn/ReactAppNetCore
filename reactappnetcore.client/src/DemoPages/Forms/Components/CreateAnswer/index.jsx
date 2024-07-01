import React, { useCallback, useEffect, useState } from 'react';
// import store from '../stores/store';
import { ReactFormGenerator } from '../../../../FormBuilderComponent';
import * as variables from "../../../../../variables";
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswerNotDefaultWithTemplateId, getAnswerDefaultWithTemplateId } from '../../../../reducers/AnswerList';

const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';

const CreateAnswerForm = ({ match }) => {
    const userLogin = useSelector(state => state.UserCurrent.userLogin);
    const data = useSelector(state => state.AnswerList.taskDataCurrent);
    const answerData = useSelector(state => state.AnswerList.answerDataCurrent);
    const dispatch = useDispatch();

    useEffect(() => {
        const parts = (match.url !== null && match.url !== undefined) ? match.url.split('/') : "";
        let Id = parseInt(parts[parts.length-1]);
        dispatch(getAnswerDefaultWithTemplateId(Id));
    }, [dispatch])

    const onSubmit = (data) => {
        const parts = (match.url !== null && match.url !== undefined) ? match.url.split('/') : "";
        let Id = parseInt(parts[parts.length-1]);
        const answer = {
            templateId: parseInt(Id),
            username : userLogin.username,
            answerData: data,
        };
        dispatch(addAnswerNotDefaultWithTemplateId(Id, answer));
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