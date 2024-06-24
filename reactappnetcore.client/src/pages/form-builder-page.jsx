/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { useLocation } from 'react-router';
import * as variables from "../../variables";
import { nanoid } from "nanoid";
import { ReactFormBuilder } from "..";
import DemoBarComponent from "../components/demobar-component";
import store from "../stores/store";
import NavBar from "../components/nav-bar-component";

const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';

const FormBuilderPage = React.memo(() => {
    const location = useLocation();
    const myRef = useRef(null);

    const formBuilderRef = useRef(null);

    useEffect(() => {
        let Id = parseInt(location.pathname.replace("/form-builder/", ""));
        if (!isNaN(Id)) {
            store.dispatch('setTemplateId', Id);
            store.dispatch('getControlWithTemplateId', Id);
        } else {
            store.dispatch('setTemplateId', '');
        }
    }, [location])

    return (
        
        <div ref={myRef}>
            <NavBar />
            <DemoBarComponent variables={variables} />
            <ReactFormBuilder
                key={nanoid()}
                variables={variables}
                locale={language}
                saveAlways={true}
                ref={formBuilderRef}
            />
        </div>

    );
});

export default FormBuilderPage;