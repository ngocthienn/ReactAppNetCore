/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import * as variables from "../../../../../variables";
import { ReactFormBuilder } from "../../../../FormBuilderComponent";
import DemoBar from "../../Elements/DemoBar";
import store from "../../../../FormBuilderComponent/stores/store";
import templateStore from "../../../../FormBuilderComponent/stores/templateStore";

const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';

const CreateOrUpdateTemplate = React.memo(({ match }) => {
    const [templateName, setTemplateName] = useState('');
    const myRef = useRef(null);

    const formBuilderRef = useRef(null);

    useEffect(() => {
        const parts = (match.url !== null && match.url !== undefined) ? match.url.split('/') : "";
        let Id = parseInt(parts[parts.length-1]);
        if (!isNaN(Id)) {
            store.dispatch('setTemplateId', Id);
            store.dispatch('getControlWithTemplateId', Id);
        } else {
            store.dispatch('setTemplateId', '');
            store.dispatch('getControlWithTemplateId', '');
        }
        store.subscribe(state => onUpdateByStore(state));
    }, [match.url])

    const onUpdateByStore = (state) => {
        if(state.templateCurrent && state.templateCurrent.name) {
            setTemplateName(state.templateCurrent.name);
        }
    }

    const handleInputTemplateNameChange = (event) => {
        setTemplateName(event.target.value);
    };

    return (
        
        <div ref={myRef}>
            <DemoBar variables={variables} match={match} templateName={templateName}/>
            <div className="col-md-3"><strong>Template Name: </strong></div>
            <input className="col-md-9 form-control" value={templateName} onChange={handleInputTemplateNameChange} type="text" style={{ width : '100%'}} placeholder="Type the template name"/>
            <br />
            <ReactFormBuilder
                variables={variables}
                // url={url}
                // saveUrl={saveUrl}
                locale={language}
                saveAlways={true}
                // data={taskData}
                ref={formBuilderRef}
            />
            {/* {
                taskData.length > 0 ?
                    (<ReactFormBuilder
                        key={nanoid()}
                        variables={variables}
                        // url={url}
                        // saveUrl={saveUrl}
                        locale={language}
                        saveAlways={true}
                        data={taskData}
                        ref={formBuilderRef}
                    />) : <ReactFormBuilder
                        key={nanoid()}
                        variables={variables}
                        // url={url}
                        // saveUrl={saveUrl}
                        locale={language}
                        saveAlways={true}
                        data={[]}
                        ref={formBuilderRef}
                    />
            } */}
        </div>

    );
});

export default CreateOrUpdateTemplate;