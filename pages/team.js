import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/teamCard';
import { getTeams } from '../api/teamData';

function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTheTeams = useCallback(() => {
    getTeams(user.uid).then(setTeams);
  }, [user.uid]);

  useEffect(() => {
    getAllTheTeams();
  }, [getAllTheTeams]);
  // this is a comment
  return (
    <div className="text-center my-4">
      <Link passHref href="/team/new">
        <Button>Add A Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard
            key={team.firebaseKey}
            authorObj={team}
            onUpdate={getAllTheTeams}
          />
        ))}
      </div>
    </div>
  );
}

export default Teams;
