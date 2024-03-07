// https://codepen.io/hodakkm/pen/vJBBmv

const endpoint = 'https://clinicaltrials.gov/api/v2/studies/';

const getTrialByNctNumber = (nctNumber) => new Promise((resolve, reject) => {
  fetch(`${endpoint}${nctNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getTrialByNctNumber;
