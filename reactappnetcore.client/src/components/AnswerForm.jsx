import React from 'react';
import { ReactFormGenerator } from '../react-form-builder2';

const AnswerForm = ({ data, answerData, variables, onSubmit }) => {
  return (
    <ReactFormGenerator
      download_path=""
      back_action="/"
      back_name="Back"
      answer_data={[]}
      action_name="Save"
      form_action="/"
      form_method="POST"
      // skip_validations={true}
      onSubmit={onSubmit}
      variables={variables}
      data={data}
      locale="en"
    />
  );
}

export default AnswerForm;
