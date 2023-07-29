import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  image: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(formInput).then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
        <Form.Control type="text" placeholder="Team Name" name="team_name" value={formInput.team_name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Author Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    team_name: PropTypes.string,
    image: PropTypes.string,
    member_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
