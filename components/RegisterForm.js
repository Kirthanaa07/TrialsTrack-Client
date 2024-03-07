'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <span>Enter Your Details</span>
      <Input as="textarea" name="name" required placeholder="Enter your Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      <Input as="textarea" name="role" required placeholder="Enter your Role" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
