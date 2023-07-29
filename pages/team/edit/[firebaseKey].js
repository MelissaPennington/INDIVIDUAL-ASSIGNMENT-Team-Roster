import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberCard from '../../../components/memberCard';
import { viewTeamDetails } from '../../../api/mergedData';

export default function TeamDetails() {
  const [teamData, setTeamData] = useState(null);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      viewTeamDetails(firebaseKey)
        .then((data) => setTeamData(data))
        .catch((error) => {
          console.error('Error fetching team details:', error);
          setTeamData(null);
        });
    }
  }, [firebaseKey]);

  if (!teamData) {
    return <p>Loading team details...</p>;
  }

  const {
    teamName, members, firstName,
  } = teamData;

  return (
    <div>
      <h1>Team Details</h1>
      <h2>{teamName}</h2>
      <h3>Members by {firstName}:</h3>
      {Array.isArray(members) && members.length > 0 ? (
        members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} />
        ))
      ) : (
        <p>No members found for this team.</p>
      )}
    </div>
  );
}
