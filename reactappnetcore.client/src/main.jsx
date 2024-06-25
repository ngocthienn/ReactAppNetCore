import "./polyfills";
import React from "react";
import { createRoot } from 'react-dom/client';

import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./DemoPages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";

const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => (
  <Provider store={store}>
    <HashRouter>
      <Component />
    </HashRouter>
  </Provider>
);

const root = createRoot(rootElement).render(renderApp(Main));

if (import.meta.hot) {
  import.meta.hot.accept("./DemoPages/Main", () => {
    const NextApp = require("./DemoPages/Main").default;
    root.render(renderApp(NextApp));
  });
}
serviceWorker.unregister();



// import React from 'react'
// import App from './FormBuilderComponent/App.jsx'
// import { BrowserRouter as Router } from 'react-router-dom';
// import AppLocale from './FormBuilderComponent/language-provider/index.jsx';
// import { IntlProvider } from 'react-intl';
// import { createRoot } from 'react-dom/client';
// const locale = import.meta.env.VITE_DEFAULT_LOCALE;
// const language = locale ? locale : 'en';
// const currentAppLocale = AppLocale[language];


// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <IntlProvider
//         locale={currentAppLocale.locale}
//         messages={currentAppLocale.messages}
//       >
//         <App />
//       </IntlProvider>
//     </Router>
//   </React.StrictMode>
// );


