/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberCard from '../../components/memberCard';
import { viewTeamDetails } from '../../api/mergedData';
import Members from '../members';

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
    first_name, last_name, email, books,
  } = teamData;

  return (
    <div>
      <h1>Team Details</h1>
      <h2>{first_name} {last_name}</h2>
      <p>{email}</p>
      <h3>Members on {first_name}:</h3>
      {Array.isArray(Members) && Members.length > 0 ? (
        books.map((book) => (
          <MemberCard key={book.firebaseKey} bookObj={book} />
        ))
      ) : (
        <p>No members found for this team.</p>
      )}
    </div>
  );
}
