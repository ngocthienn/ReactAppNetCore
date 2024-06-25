import React, { useEffect, useState } from 'react';
import { ReactFormGenerator } from '..';
import store from "../stores/store";
import { useLocation } from 'react-router-dom';

const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';

const DemoBarComponent = (props) => {
    // eslint-disable-next-line react/prop-types
    const { variables } = props;
    const [templateId, setTemplateId] = useState(null);
    const [taskData, setTaskData] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [shortPreviewVisible, setShortPreviewVisible] = useState(false);
    const [roPreviewVisible, setRoPreviewVisible] = useState(false);
    const [answer, setAnswer] = useState([]);
    const [saveControlStatus, setSaveControlStatus] = useState(false);
    const [navTemplateId, setNavTemplateId] = useState(null);

    const location = useLocation();

    useEffect(() => {
        store.subscribe(state => onUpdateByStore(state));
    }, []);

    useEffect(() => {
        if (!isNaN(parseInt(templateId))) {
            store.dispatch('getAnswerDefault', templateId);
        }
    }, [templateId]);

    useEffect(() => {
        if (!isNaN(parseInt(navTemplateId))) {
            const parts = location.pathname.split('/');
            window.location.href = `/${parts[1]}/${navTemplateId}`;
        }
    }, [navTemplateId]);

    const onUpdateByStore = (state) => {
        setTemplateId(state.templateId);
        setNavTemplateId(state.navTemplateId);
        setAnswer(state.answer);
        setTaskData(state.data);
        setSaveControlStatus(state.saveControlStatus);
    }

    const showPreview = () => {
        setPreviewVisible(true);
    };

    const showShortPreview = () => {
        // saveFormData();
        setShortPreviewVisible(true);
    };

    const showRoPreview = () => {
        // saveFormData();
        setRoPreviewVisible(true);
    };

    const closePreview = () => {
        setPreviewVisible(false);
        setShortPreviewVisible(false);
        setRoPreviewVisible(false);
    };

    const _onSubmit = (data) => {
        if(!saveControlStatus) {
            alert("Form has not been saved");
            return;
        }
        for (let element of data) {
            if(typeof element.custom_name !== 'undefined' && element.custom_name.toLowerCase().includes("multiselect") && typeof element.value !== 'undefined') {
                try {
                    let jsonObject = JSON.parse(element.value);
                    element.value = jsonObject;
                } catch {}
            }
        }
        // console.log(data);
        store.dispatch('saveAnswersTemplate', {
            templateId : templateId,
            answerData : data
        })
        // if (FormBuilderReducer.saveControlStatus !== true) {
        //     alert("Form has not been saved");
        // } else {
        //     const post = async() => dispatch(saveAnswersTemplate(FormBuilderReducer.templateId, data));
        //     post();
        //     alert("Update success");
        // }
        // console.log(data);
    };

    const saveFormData = () => {
        store.dispatch('saveControlsTemplate', { templateId, taskData });
    }

    let modalClass = 'modal';
    if (previewVisible) {
        modalClass += ' show d-block';
    }

    let shortModalClass = 'modal short-modal';
    if (shortPreviewVisible) {
        shortModalClass += ' show d-block';
    }

    let roModalClass = 'modal ro-modal';
    if (roPreviewVisible) {
        roModalClass += ' show d-block';
    }

    const onChange = (data) => {
        // console.log(data);
        // console.log(taskData);
        // dispatch(setAnswersIntoStore(data));
    }

    return (
        <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
            <h4 className="float-left">Preview</h4>
            <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={showPreview}>Preview Form</button>
            <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={showShortPreview}>Alternate/Short Form</button>
            <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={showRoPreview}>Read Only Form</button>
            <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={saveFormData}>Save Form</button>

            {previewVisible &&
                <div className={modalClass} role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <ReactFormGenerator
                                download_path=""
                                // back_action="/"
                                // back_name="Back"
                                answer_data={answer}
                                action_name="Save"
                                form_method="POST"
                                onSubmit={_onSubmit}
                                variables={variables}
                                data={taskData}
                                onChange={onChange}
                                locale={language} />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {roPreviewVisible &&
                <div className={roModalClass}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <ReactFormGenerator
                                download_path=""
                                // back_action="/"
                                // back_name="Back"
                                answer_data={answer}
                                action_name="Save"
                                form_action="/"
                                form_method="POST"
                                read_only={true}
                                variables={variables}
                                hide_actions={true}
                                data={taskData}
                                onChange={onChange}
                                locale={language} />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {shortPreviewVisible &&
                <div className={shortModalClass}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content border border-light p-3 mb-4">
                            <ReactFormGenerator
                                download_path=""
                                // back_action=""
                                answer_data={answer}
                                form_action="/"
                                form_method="POST"
                                data={taskData}
                                display_short={true}
                                variables={variables}
                                hide_actions={false}
                                onChange={onChange}
                                locale={language} />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default DemoBarComponent;