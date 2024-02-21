import { clientCredentials } from '../client';

const getSingleStudyType = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/study_types/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createStudyType = (studyType) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/study_types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studyType),
  })
    .then(resolve)
    .catch(reject);
});

export {
  getSingleStudyType, createStudyType,
};
