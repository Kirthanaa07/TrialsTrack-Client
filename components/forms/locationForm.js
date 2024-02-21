import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createLocation, getLocations, updateLocation } from '../../utils/data/locationData';

const initialState = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: 0,
  country: '',
};

const LocationForm = ({ existingLocation }) => {
  const [formLocationData, setFormLocationData] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getLocations().then(setFormLocationData);
    if (existingLocation.id) {
      setFormLocationData({
        id: existingLocation.id,
        name: existingLocation.name,
        address: existingLocation.address,
        city: existingLocation.city,
        state: existingLocation.state,
        zip: Number(existingLocation.zip),
        country: existingLocation.country,
        user_id: user.id,
      });
    }
  }, [existingLocation, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLocationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingLocation.id) {
      const update = {
        id: formLocationData.id,
        name: formLocationData.name,
        address: formLocationData.address,
        city: formLocationData.city,
        state: formLocationData.state,
        zip: Number(formLocationData.zip),
        country: formLocationData.country,
        user_id: user.id,
      };
      updateLocation(update).then(() => router.push('/locations'));
    } else {
      const location = {
        name: formLocationData.name,
        address: formLocationData.address,
        city: formLocationData.city,
        state: formLocationData.state,
        zip: Number(formLocationData.zip),
        country: formLocationData.country,
        user_id: user.id,
      };
      createLocation(location).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required value={formLocationData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control name="address" required value={formLocationData.address} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control name="city" required value={formLocationData.city} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control name="state" required value={formLocationData.state} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="integer"
            name="zip"
            required
            value={formLocationData.zip}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control name="country" required value={formLocationData.country} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit"> {existingLocation.id ? 'Update' : 'Create'} Location </Button>
      </Form>
    </>
  );
};

LocationForm.propTypes = {
  existingLocation: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.number,
    country: PropTypes.string,
  }),
};

LocationForm.defaultProps = {
  existingLocation: initialState,
};
export default LocationForm;
