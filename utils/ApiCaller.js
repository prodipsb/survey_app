import axios from 'axios';
import Config from 'react-native-config';
import {getData} from './asyncStorage';

const appUrl = Config?.APP_ENDPOINT;

export const get = async (endpoint, params) => {
  const url = `${appUrl}/${endpoint}`;

  const authData = await getData();

  const headers = {};

  const options = {
    method: 'GET',
    url: `${url}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authData?.access_token}`,
      ...headers,
    },
    params,
  };

  return await axios(options)?.then(res => res);
};

export const post = async (endpoint, body) => {
  const url = `${appUrl}/${endpoint}`;
  const authData = await getData();

  const headers = {};

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authData?.access_token}`,
      ...headers,
    },
    url: url,
    data: body,
  };

  return await axios(options)
    ?.then(res => res)
    .catch(error => {
      console.log('api response err', error);
    });
};

export const login = async (endpoint, body) => {
  const url = `${appUrl}/${endpoint}`;

  const headers = {};

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    url: url,
    data: body,
  };

  return await axios(options)?.then(res => res);
};

export const postForm = async (endpoint, body) => {
  const url = `${appUrl}/api/v1/${endpoint}`;
  const authData = await getData();

  const headers = {};

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authData?.access_token}`,
      ...headers,
    },
    url: url,
    data: body,
  };

  return await axios(options)
    ?.then(res => res)
    .catch(error => {
      console.log('api postForm err22', error);
    });
};
