import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import FormBuilder from "../react-form-builder2";
import * as variables from "../variables";
import { useLocation } from 'react-router';
import DemobarComponent from "./demobar-component";

// Add our stylesheets for the demo.
import "../scss/application.scss";
import store from "../stores/store";

const apiUrl = import.meta.env.VITE_API_URL;
// const url = `${apiUrl}/Template/GetControls`;
// const saveUrl = "/api/formdata";

const FormBuilderComponent = () => {
  const [url, setUrl] = useState('');
  const [saveUrl, setSaveUrl] = useState(`${apiUrl}/Template/UpdateControlWithTemplateId/`);
  const [answerUrl, setAnswerUrl] = useState('');
  const location = useLocation();
  const [storeForm, setStoreForm] = useState(store);

  const key = url;

  useEffect(() => {
    let Id = parseInt(location.pathname.replace("/FormBuilder/", ""));
    if (!isNaN(Id)) {
      setUrl(`${apiUrl}/Template/GetControl/${Id}`);
      setSaveUrl(`${apiUrl}/Template/UpdateControlWithTemplateId/${Id}`);
      setAnswerUrl(`${apiUrl}/Answer/GetAnswerDefault/${Id}`);
      store.dispatch('loadAnswer', { loadUrl: `${apiUrl}/Answer/GetAnswerDefault/${Id}` });
      setStoreForm(store);
    }
  }, [location])

  return (
    <>
      <DemobarComponent variables={variables} answerUrl={answerUrl} storeForm={storeForm}/>
      <FormBuilder.ReactFormBuilder
        key={key}
        variables={variables}
        url={url}
        saveUrl={saveUrl}
        locale="en"
        saveAlways={false}
      // toolbarItems={items}
      />
    </>

  );
};

export default FormBuilderComponent;
