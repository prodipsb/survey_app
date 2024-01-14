import axios from 'axios';
import Config from 'react-native-config';
import {getData} from './asyncStorage';

const appUrl = Config?.APP_ENDPOINT;

export const get = async (endpoint, params) => {
  const url = `${appUrl}/${endpoint}`;

  const authData = await getData();
  const options = {
    method: 'GET',
    url: `${url}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authData?.access_token}`,
    },
    params,
  };
  return await axios(options)?.then(res => res?.data);
};

export const post = async (endpoint, body) => {
  const url = `${appUrl}/${endpoint}`;
  const authData = await getData();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authData?.access_token}`,
    },
    url: url,
    data: body,
  };

  try {
    return await axios(options)?.then(res => res);
  } catch (error) {
    console.error("Error:", error);
   // throw error; 
  }

  
};

export const login = async (endpoint, body) => {
  const url = `${appUrl}/${endpoint}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    url: url,
    data: body,
  };

  return await axios(options)?.then(res => res);
};

export const postForm = async (endpoint, body) => {
  const url = `${appUrl}/api/v1/${endpoint}`;
  const authData = await getData();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authData?.access_token}`,
    },
    url: url,
    data: body,
  };

  return await axios(options)?.then(res => res);
};
