import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/memberCard';

function Members() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getMembers(user.uid).then(setMembers);
  }, [user.uid]);

  return (
    <div className="team">
      <h1>The Team!</h1>
      <div className="add-member">
        <Link href="/members/new" passHref>
          <Button variant="info" type="button">
            Add Member
          </Button>
        </Link>
      </div>
      <div className="card-container" data-testid="members-container" id="members-container">
        {members.map((member) => (
          <MemberCard
            key={member.firebaseKey}
            memberObj={member}
            onUpdate={() => getMembers(user.uid).then(setMembers)}
          />
        ))}
      </div>
    </div>
  );
}

export default Members;
