// import { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//     const [forecasts, setForecasts] = useState();

//     useEffect(() => {
//         populateWeatherData();
//     }, []);

//     const contents = forecasts === undefined
//         ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//         : <table className="table table-striped" aria-labelledby="tableLabel">
//             <thead>
//                 <tr>
//                     <th>Date</th>
//                     <th>Temp. (C)</th>
//                     <th>Temp. (F)</th>
//                     <th>Summary</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {forecasts.map(forecast =>
//                     <tr key={forecast.date}>
//                         <td>{forecast.date}</td>
//                         <td>{forecast.temperatureC}</td>
//                         <td>{forecast.temperatureF}</td>
//                         <td>{forecast.summary}</td>
//                     </tr>
//                 )}
//             </tbody>
//         </table>;

//     return (
//         <div>
//             <h1 id="tableLabel">Weather forecast</h1>
//             <p>This component demonstrates fetching data from the server.</p>
//             {contents}
//         </div>
//     );

//     async function populateWeatherData() {
//         const response = await fetch('weatherforecast');
//         const data = await response.json();
//         setForecasts(data);
//     }
// }

// export default App;

// import { Navigate, Route, Routes } from "react-router";
// import DemobarComponent from "./components/demobar-component";
// import FormBuilderComponent from "./components/form-builder-component";
// import * as variables from "../variables";
// import Layout from "./components/layout-component";
// import Home from "./components/home-component";
// import Answer from "./components/answer-component";

// function App() {
//   return (
//     <>
//       <DemobarComponent variables={variables}/>
//       <FormBuilderComponent />
//     </>
//     // <Routes>
//     //   <Route path="/" exact element={<Navigate to="/home" />} />
//     //   <Route element={<Layout />}>
//     //     <Route path="/home" element={<Home />} />
//     //     <Route path='/FormBuilder' element={<FormBuilderComponent />} />
//     //     <Route path='/FormBuilder/:Id' element={<FormBuilderComponent />} />
//     //     <Route path="/answer/:Id" element={<Answer />} />
//     //   </Route>
//     // </Routes>
//   );
// }

import React from 'react';
import DemoBar from './demobar';
// eslint-disable-next-line no-unused-vars
import FormBuilder from './index';
import * as variables from '../variables';

// Add our stylesheets for the demo.
import "../scss/application.scss";

const url = '/api/formdata';
const saveUrl = '/api/formdata';

function App() {
  return (
    <div>
      <DemoBar variables={variables} />
      <FormBuilder.ReactFormBuilder
        variables={variables}
        url={url}
        saveUrl={saveUrl}
        locale='vi'
        saveAlways={false}
      // toolbarItems={items}
      />
      
    </div>
  );
}

export default App;
