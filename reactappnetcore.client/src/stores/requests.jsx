import fetch from 'isomorphic-fetch';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  OPTIONS: '',
};

export function post(url, data) {
  console.log("data", data);
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then(response => response);
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

