import React from 'react';
import { ReactFormGenerator } from '../react-form-builder2';

const Abcd = ({ data, answerData, variables }) => {
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
          // onSubmit={this._onSubmit}
          variables={variables}
          data={data}
          locale="en"
        />
      ) : null}
    </>
  );
}

export default Abcd;
