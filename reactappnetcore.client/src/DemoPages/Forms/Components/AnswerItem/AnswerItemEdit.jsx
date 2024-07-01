import { ReactFormGenerator } from "../../../../FormBuilderComponent";
import * as variables from "../../../../../variables";
import { useDispatch, useSelector } from "react-redux";
import { getAnswerWithId, updateAnswerNotDefaultWithId } from "../../../../reducers/AnswerList";
import { nanoid } from 'nanoid';
import { useEffect } from "react";

const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';

const AnswerItemEdit = (props) => {
    const userLogin = useSelector(state => state.UserCurrent.userLogin);
    const data = useSelector(state => state.AnswerList.taskDataCurrent);
    const answerData = useSelector(state => state.AnswerList.answerDataCurrent);
    const templateId = useSelector(state => state.AnswerList.templateIdCurrent);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        const parts = (match.url !== null && match.url !== undefined) ? match.url.split('/') : "";
        let Id = parseInt(parts[parts.length-1]);
        dispatch(getAnswerWithId(Id));
    }, [dispatch])

    const onSubmit = (data) => {
        const { match } = props;
        const parts = (match.url !== null && match.url !== undefined) ? match.url.split('/') : "";
        let Id = parseInt(parts[parts.length-1]);

        const answer = {
            id : Id,
            username : userLogin.username,
            templateId : templateId,
            answerData : data
        };
        dispatch(updateAnswerNotDefaultWithId(Id, answer));
        // console.log(data);
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

export default AnswerItemEdit;