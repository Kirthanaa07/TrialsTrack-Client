import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { getLocations } from '../../utils/data/locationData';
import { createTrialLocation } from '../../utils/data/trialLocationData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  location_id: '',
  status: '',
};

const AddLocationForm = () => {
  const [addLocationFormData, setAddLocationFormData] = useState(initialState);
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  const { trialId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getLocations(user.id).then((data) => setLocations(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddLocationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const trialLocation = {
      location_id: addLocationFormData.location_id,
      clinical_trial_id: trialId,
      status: addLocationFormData.status,
    };
    createTrialLocation(trialLocation).then(() => router.push(`/trials/${trialId}`));
  };

  return (
    <Form onSubmit={handleSave}>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Select
          name="location_id"
          required
          value={addLocationFormData.location_id}
          onChange={handleChange}
        >
          <option value="">Select a Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          required
          value={addLocationFormData.status}
          onChange={handleChange}
        >
          <option value="">Select a Status</option>
          <option value="Active">Active</option>
          <option value="Not-Recruiting">Not-Recruiting</option>
          <option value="Active">Active</option>
          <option value="Non - Active">Non - Active</option>
          <option value="Recruiting">Recruiting</option>
        </Form.Select>
      </Form.Group>
      <br />
      <Button className="mt-5 mb-5" variant="primary" type="submit"> Save </Button>
    </Form>
  );
};

export default AddLocationForm;
