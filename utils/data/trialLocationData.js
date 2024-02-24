import { clientCredentials } from '../client';

const getTrialsLocation = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/clinical_trial_locations`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTrialLocation = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/clinical_trial_locations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteTrialLocation = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/clinical_trial_locations/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createTrialLocation = (trialLocation) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/clinical_trial_locations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trialLocation),
  })
    .then(resolve)
    .catch(reject);
});

const updateTrialLocation = (trialLocation) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/clinical_trial_locations/${trialLocation.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trialLocation),
  })
    .then(resolve)
    .catch(reject);
});

export {
  getSingleTrialLocation, getTrialsLocation, createTrialLocation, deleteTrialLocation, updateTrialLocation,
};
