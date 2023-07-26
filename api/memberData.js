import { clientCredentials } from '../utils/client';
import { getTeams } from './teamData';

const endpoint = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMemberByTeam = async (memberFirebaseKey) => new Promise((resolve, reject) => {
  let memberTeam = ''; getTeams()
    .then((teams) => {
      teams.forEach((team) => {
        if ([team.roster].includes(memberFirebaseKey)) {
          memberTeam = team.firebaseKey;
        }
      });
      resolve(memberTeam);
    })
    .catch((error) => {
      reject(error);
    });
});

// const getMemberByTeam = async (playerFirebaseKey) => {
//   let memberTeam = '';
//   await getTeams()
//     .then((teams) => {
//       teams.forEach((team) => {
//         if ([team.roster].includes(playerFirebaseKey)) {
//           memberTeam = team.firebaseKey;
//         }
//       });
//     });
//   return memberTeam;
// };

export {
  getMembers,
  createMember,
  deleteSingleMember,
  getSingleMember,
  updateMember,
  getMemberByTeam,
};
