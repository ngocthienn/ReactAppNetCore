import fetch from 'isomorphic-fetch';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  OPTIONS: '',
};

export function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then(response => response.json())
    .then(res => {
      if (window.confirm("Update thành công")) {
        const currentUrl = window.location.href;
        const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        if (!isNaN(lastSegment)) {
          window.location.reload();
        } else {
          let currentUrl = window.location.href;
          if (currentUrl.lastIndexOf('/FormBuilder/') !== -1) {
            window.location.href = currentUrl + res.templateId;
            // eslint-disable-next-line no-dupe-else-if
          } else if (currentUrl.lastIndexOf('/FormBuilder') !== -1) {
            window.location.href = currentUrl + "/" + res.templateId;
          }
        }
      } else {
        const currentUrl = window.location.href;
        const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        if (!isNaN(lastSegment)) {
          window.location.reload();
        } else {
          let currentUrl = window.location.href;
          if (currentUrl.lastIndexOf('/FormBuilder/') !== -1) {
            window.location.href = currentUrl + res.templateId;
            // eslint-disable-next-line no-dupe-else-if
          } else if (currentUrl.lastIndexOf('/FormBuilder') !== -1) {
            window.location.href = currentUrl + "/" + res.templateId;
          }
        }
      }
    });
}

// export function post(url, data) {
//   return fetch(url, {
//     method: 'POST',
//     headers,
//     body: data,
//   }).then(response => {
//     if (!response.ok) {
//       console.log("responseError", response);
//       throw new Error('Network response was not ok');
//     }
//     return response;
//   })
//   .catch(error => {
//     console.log("error", error);
//     throw error;
//   });
// }

// export function get(url) {
//   return fetch(url, {
//     method: 'GET',
//     headers,
//   }).then(response => {
//     console.log("response: ", response);
//     console.log("response: ", response.json());
//     return response.json();
//   });
// }

export function get(url) {
  return fetch(url, {
    method: 'GET',
    headers,
  }).then(response => response.json());
}

