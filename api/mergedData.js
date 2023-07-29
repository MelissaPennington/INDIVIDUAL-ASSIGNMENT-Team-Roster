import { getTeamMembers, getSingleTeam, deleteSingleTeam } from './teamData';
import { getSingleMember, deleteSingleMember } from './memberData';

const viewMemberDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(bookFirebaseKey)
    .then((memberObject) => {
      getSingleTeam(memberObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(authorFirebaseKey), getTeamMembers(authorFirebaseKey)])
    .then(([teamObject, teamMembersArray]) => {
      resolve({ ...teamObject, member: teamMembersArray });
    }).catch((error) => reject(error));
});

const deleteTeamMember = (teamId) => new Promise((resolve, reject) => {
  getTeamMembers(teamId).then((memberArray) => {
    console.warn(memberArray, 'Team Member');
    const deleteMemberPromises = memberArray.map((member) => deleteSingleMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewMemberDetails, viewTeamDetails, deleteTeamMember };
