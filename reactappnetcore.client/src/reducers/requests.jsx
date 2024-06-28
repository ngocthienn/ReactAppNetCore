import axios from "axios";

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  OPTIONS: '',
};

export function post(url, data) {
  return axios.post(
    url,
    data,
    {
      header: headers,
      withCredentials: true,
      credentials: 'include'
    }
  );
}

export function get(url) {
  return axios.get(
    url,
    {
      header: headers,
      withCredentials: true,
      credentials: 'include'
    }
  );
}
