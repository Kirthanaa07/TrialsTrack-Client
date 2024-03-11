import { clientCredentials } from '../client';

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createUser = (user) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(resolve)
    .catch(reject);
});

const updateUser = (user) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(resolve)
    .catch(reject);
});

const checkUser = (uid, name, email) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/check`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      name,
      email,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

export {
  createUser, updateUser, deleteUser, getUsers, getSingleUser, checkUser,
};
