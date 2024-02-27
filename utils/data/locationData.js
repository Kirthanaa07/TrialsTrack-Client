import { clientCredentials } from '../client';

const getLocations = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations?user_id=${userId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleLocation = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteLocation = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createLocation = (location) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(location),
  })
    .then(resolve)
    .catch(reject);
});

const updateLocation = (location) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations/${location.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(location),
  })
    .then(resolve)
    .catch(reject);
});

export {
  createLocation, updateLocation, deleteLocation, getLocations, getSingleLocation,
};
