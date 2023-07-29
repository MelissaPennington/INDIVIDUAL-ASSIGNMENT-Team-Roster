import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { getSingleTeam, updateTeam } from '../api/teamData';
import Card from './teamListCard';

function EditTeamPage({ team }) {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedTeam = {
      teamName: formData.get('teamName'),
    };

    await updateTeam(team.firebaseKey, updatedTeam);
    router.push(`/team/${team.firebaseKey}`);
  };

  return (
    <div>
      <h2>Edit Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamName">Team Name</label>
          <input type="text" id="teamName" name="teamName" defaultValue={team.teamName} />
        </div>
        <Card />
        <Button type="submit">Update Team</Button>
      </form>
    </div>
  );
}

EditTeamPage.propTypes = {
  team: PropTypes.shape({
    teamName: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export async function getServerSideProps(context) {
  const { firebaseKey } = context.query;
  const team = await getSingleTeam(firebaseKey);

  return {
    props: {
      team,
    },
  };
}

export default EditTeamPage;
