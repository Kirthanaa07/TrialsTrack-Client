import { clientCredentials } from '../client';

const getTrials = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trials`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTrial = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trials/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteTrial = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trials/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createTrial = (trial) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trial),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateTrial = (trial) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trials/${trial.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trial),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getStudyTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/study_types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getTrials, getSingleTrial, deleteTrial, updateTrial, createTrial, getStudyTypes,
};
