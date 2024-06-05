import React from "react";
// eslint-disable-next-line no-unused-vars
import FormBuilder, { Registry } from "../react-form-builder2";
import * as variables from "../variables";

// Add our stylesheets for the demo.
import "../scss/application.scss";

const url = "/api/formdata";
const saveUrl = "/api/formdata";

const TestComponent = () => <h2>Hello</h2>;

const FormBuilderComponent = () => (
  <FormBuilder.ReactFormBuilder
    variables={variables}
    url={url}
    saveUrl={saveUrl}
    locale="en"
    saveAlways={false}
    // toolbarItems={items}
  />
);

export default FormBuilderComponent;
