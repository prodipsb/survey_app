import moment from 'moment';

export const createFormData = (state: any) => {
  const formData = new FormData();

  for (const key in state) {
    if (key === 'shopPic' || key === 'binCertificate') {
      if (state[key] !== null) {
        formData.append(`${key}`, {
          uri: state[key].uri,
          type: state[key].type,
          name: state[key].fileName,
        });
      }
    } else if (key === 'itemList') {
      if (state[key].length !== 0) {
        state[key].forEach((image: any) => {
          formData.append(`${key}[]`, {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
        });
      }
    } else if (key === 'date' || key === 'businessStartDate') {
      formData.append(key, moment(state[key]).format('YYYY-MM-DD'));
    } else {
      if (state[key]) {
        formData.append(`${key}`, state[key]);
      }
    }
  }

  return formData;
};
