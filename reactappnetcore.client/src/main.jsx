import React from 'react'
import ReactDOM from "react-dom";
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import AppLocale from './language-provider/index.jsx';
import { IntlProvider } from 'react-intl';
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>,
// )

const locale = import.meta.env.VITE_DEFAULT_LOCALE;
const language = locale ? locale : 'en';
const currentAppLocale = AppLocale[language];

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
        <App />
      </IntlProvider>
    </Router>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

