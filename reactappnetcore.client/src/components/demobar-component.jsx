// import React from 'react';
// import store from '../stores/store';
// import { ReactFormGenerator } from '../react-form-builder2';

// const answers = [{"id": "4A15C8F3-1CF3-42DB-A64D-BC48AB12BA0F","name": "dropdown_536BC944-A7C8-484B-96C4-6F6DBC6A3E9F","custom_name": "dropdown_536BC944-A7C8-484B-96C4-6F6DBC6A3E9F","value": "place_holder_option_1"},{"id": "22AFB3CD-689A-4713-A7D5-69BC05233B04","name": "email_input_2B6670D9-6018-4EB1-AD10-1DDDD7501B86","custom_name": "email_input_2B6670D9-6018-4EB1-AD10-1DDDD7501B86","value": ""},{"id": "64104253-645F-46D6-83BE-FCC9332BEAB4","name": "radiobuttons_F3EA1866-1E73-43F9-8A86-8DB720232415","custom_name": "radiobuttons_F3EA1866-1E73-43F9-8A86-8DB720232415","value": ["radiobuttons_option_1D107B2E-18FF-4A3C-890E-C6865E634CB3"]}];
// // const answers = {
// //   'dropdown_38716F53-51AA-4A53-9A9B-367603D82548': 'd2',
// //   'checkboxes_8D6BDC45-76A3-4157-9D62-94B6B24BB833': [
// //     'checkboxes_option_8657F4A6-AA5A-41E2-A44A-3E4F43BFC4A6',
// //     'checkboxes_option_1D674F07-9E9F-4143-9D9C-D002B29BA9E4',
// //   ],
// //   'radio_buttons_F79ACC6B-7EBA-429E-870C-124F4F0DA90B': [
// //     'radiobuttons_option_553B2710-AD7C-46B4-9F47-B2BD5942E0C7',
// //   ],
// //   'rating_3B3491B3-71AC-4A68-AB8C-A2B5009346CB': 4,
// // };
// const apiUrl = import.meta.env.VITE_API_URL;
// const answerUrl = `${apiUrl}/Answer/GetAnswerDefault/`;

// const headers = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json; charset=utf-8',
//   OPTIONS: '',
// };

// export default class DemobarComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       previewVisible: false,
//       shortPreviewVisible: false,
//       roPreviewVisible: false,
//       answer: [],
//       answerId : '',
//     };
//   }

//   // componentDidMount() {
//   //   const currentUrl = window.location.href;
//   //   const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

//   //   if(!isNaN(lastSegment)) {
//   //     store.dispatch('loadAnswer', { loadUrl: answerUrl + lastSegment });
//   //   }
//   // }

//   componentWillMount() {
//     const update = this._onChange.bind(this);
//     this._onSubmit = this._onSubmit.bind(this);
//     store.subscribe(state => {update(state.data)});

//     const currentUrl = window.location.href;
//     const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

//     // if(!isNaN(lastSegment)) {
//     //   fetch(`${apiUrl}/Answer/GetAnswerDefault/${lastSegment}`, {
//     //     method: 'GET',
//     //     headers,
//     //   }).then(response => response.json())
//     //   .then(c => {
//     //     this.setState({
//     //       answer : c.answerData,
//     //       answerId : c.id,
//     //     });
//     //   });
//     // }
//   }

//   showPreview() {
//     // this.saveFormData();
//     this.setState({
//       previewVisible: true,
//     });
//   }

//   showShortPreview() {
//     this.saveFormData();
//     this.setState({
//       shortPreviewVisible: true,
//     });
//   }

//   showRoPreview() {
//     this.saveFormData();
//     this.setState({
//       roPreviewVisible: true,
//     });
//   }

//   closePreview() {
//     this.setState({
//       previewVisible: false,
//       shortPreviewVisible: false,
//       roPreviewVisible: false,
//     });
//   }

//   _onChange(data) {
//     this.setState({
//       data,
//     });
//   }

//   // eslint-disable-next-line no-unused-vars
//   _onSubmit(data) {
    
//     const currentUrl = window.location.href;
//     const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

//     if(!isNaN(lastSegment)) {
//       console.log(JSON.stringify({ 
//         id : parseInt(this.state.answerId), 
//         templateId: parseInt(lastSegment),
//         answerData : data,
//       }));
//       fetch(`${apiUrl}/Answer/UpdateAnswerDefaultWithTemplateId/${lastSegment}`, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ 
//           id : parseInt(this.state.answerId), 
//           templateId: parseInt(lastSegment),
//           answerData : data,
//         }),
//       }).then(response => {
//         if (window.confirm("Update thành công")) {
//           window.location.reload();
//         } else {
//           window.location.reload();
//         }
        
//       });
//     } else {
//       alert("Chưa save Template");
//     }
//   }

//   saveFormData() {
//     store.dispatch('post');
//   }

//   render() {
//     let modalClass = 'modal';
//     if (this.state.previewVisible) {
//       modalClass += ' show d-block';
//     }

//     let shortModalClass = 'modal short-modal';
//     if (this.state.shortPreviewVisible) {
//       shortModalClass += ' show d-block';
//     }

//     let roModalClass = 'modal ro-modal';
//     if (this.state.roPreviewVisible) {
//       roModalClass += ' show d-block';
//     }

//     return (
//       <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
//         <h4 className="float-left">Preview</h4>
//         <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={() => this.showPreview()}>Preview Form</button>
//         <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={() => this.showShortPreview()}>Alternate/Short Form</button>
//         <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={() => this.showRoPreview()}>Read Only Form</button>
//         <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={() => this.saveFormData()}>Save Form</button>

//         { this.state.previewVisible &&
//           <div className={modalClass} role="dialog">
//             <div className="modal-dialog modal-lg" role="document">
//               <div className="modal-content">
//                 <ReactFormGenerator
//                   download_path=""
//                   back_action="/"
//                   back_name="Back"
//                   answer_data={this.state.answer}
//                   action_name="Save"
//                   form_action={this.props.answerUrl}
//                   form_method="POST"
//                   // skip_validations={true}
//                   onSubmit={this._onSubmit}
//                   variables={this.props.variables}
//                   data={this.state.data}
//                   locale='en'/>

//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         }

//         { this.state.roPreviewVisible &&
//           <div className={roModalClass}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <ReactFormGenerator
//                   download_path=""
//                   back_action="/"
//                   back_name="Back"
//                   answer_data={answers}
//                   action_name="Save"
//                   form_action="/"
//                   form_method="POST"
//                   read_only={true}
//                   variables={this.props.variables}
//                   hide_actions={true}
//                   data={this.state.data}
//                   locale='en'/>

//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         }

//         { this.state.shortPreviewVisible &&
//           <div className={shortModalClass}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content border border-light p-3 mb-4">
//                 <ReactFormGenerator
//                   download_path=""
//                   back_action=""
//                   answer_data={answers}
//                   form_action="/"
//                   form_method="POST"
//                   data={this.state.data}
//                   display_short={true}
//                   variables={this.props.variables}
//                   hide_actions={false}
//                   locale='en'
//                   />

//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         }
//       </div>
//     );
//   }
// }
