import { clientCredentials } from '../client';

const getPatients = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/patients`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getTrialLocationPatients = (trialLocationId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/patient_trial_locations${trialLocationId ? `?trial_location_id=${trialLocationId}` : ''}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createTrialLocationPatient = (patientTrialLocation) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/patient_trial_locations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientTrialLocation),
  })
    .then(resolve)
    .catch(reject);
});

const updateTrialLocationPatient = (patientTrialLocation) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/patient_trial_locations/${patientTrialLocation.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientTrialLocation),
  })
    .then(resolve)
    .catch(reject);
});

const deleteTrialLocationPatient = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/patient_trial_locations/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getPatients,
  getTrialLocationPatients, deleteTrialLocationPatient,
  createTrialLocationPatient, updateTrialLocationPatient,
};
