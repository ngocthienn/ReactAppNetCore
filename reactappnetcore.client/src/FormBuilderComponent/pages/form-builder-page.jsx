/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
// import { useLocation } from 'react-router';
import * as variables from "../../../variables";
import { nanoid } from "nanoid";
import { ReactFormBuilder } from "..";
import DemoBarComponent from "../components/demobar-component";
import store from "../stores/store";
import NavBar from "../components/nav-bar-component";

const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';

const FormBuilderPage = React.memo(({ match }) => {
    // const location = useLocation();
    const myRef = useRef(null);
    const [taskData, setTaskData] = useState([]);

    const formBuilderRef = useRef(null);

    useEffect(() => {
        console.log(match.url);
        // let Id = parseInt(location.pathname.replace("/form-builder/", ""));
        // if (!isNaN(Id)) {
        //     store.dispatch('setTemplateId', Id);
        //     store.dispatch('getControlWithTemplateId', Id);
        // } else {
        //     store.dispatch('setTemplateId', '');
        // }
        // store.subscribe(state => onUpdateByStore(state));
    }, [match])

    return (
        
        <div ref={myRef}>
            <DemoBarComponent variables={variables} />
            <ReactFormBuilder
                key={nanoid()}
                variables={variables}
                // url={url}
                // saveUrl={saveUrl}
                locale={language}
                saveAlways={true}
                data={taskData}
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

export default FormBuilderPage;