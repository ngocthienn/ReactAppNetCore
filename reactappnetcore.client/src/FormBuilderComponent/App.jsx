import React from 'react';

// Add our stylesheets for the demo.
import "../../scss/application.scss";
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/home-page';
import FormBuilderPage from './pages/form-builder-page';
import UserPage from './pages/user-page';
import DemoBarComponent from './components/demobar-component';
import * as variables from "../../variables";
import { ReactFormBuilder } from '.';

function App() {
  return (
    <div>
      <DemoBarComponent variables={variables} />
      <ReactFormBuilder
        variables={variables}
        // url={url}
        // saveUrl={saveUrl}
        locale='en'
        saveAlways={false}
      // toolbarItems={items}
      />
      
    </div>
  );

  // return (
  //   <Routes>
  //     <Route path="/" exact element={<Navigate to="/home" />} />
  //     <Route path="/home" element={<HomePage />} />
  //     <Route path="/users" element={<UserPage />} />
  //       <Route path='/form-builder' element={<FormBuilderPage />} />
  //       <Route path='/form-builder/:Id' element={<FormBuilderPage />} />
  //       {/* <Route path="/answer/:Id" element={<AnswerPage />} /> */}
  //   </Routes>
  // );

}

export default App;
