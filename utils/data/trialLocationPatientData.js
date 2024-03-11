import { clientCredentials } from '../client';

const getTrialLocationPatients = (trialLocationId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/patient_trial_locations${trialLocationId ? `?trial_location_id=${trialLocationId}` : ''}`)
    .then((response) => response.json())
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

export { getTrialLocationPatients, deleteTrialLocationPatient };
