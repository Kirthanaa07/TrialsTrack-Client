import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { getLocations } from '../../utils/data/locationData';
import { createTrialLocation, updateTrialLocation } from '../../utils/data/trialLocationData';

const initialState = {
  location_id: '',
  clinical_trial_id: '',
  status: '',
};

const AddLocationForm = ({ clinicalLocationObj }) => {
  const [addLocationFormData, setAddLocationFormData] = useState(initialState);
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  const { trialId } = useRouter();

  useEffect(() => {
    getLocations().then((data) => setLocations(data));
    if (clinicalLocationObj.id) {
      setAddLocationFormData({
        id: clinicalLocationObj.id,
        location_id: clinicalLocationObj.location.id,
        clinical_trial_id: clinicalLocationObj.clinical_trial.id,
        status: clinicalLocationObj.status,
      });
    }
  }, [clinicalLocationObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddLocationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (clinicalLocationObj.id) {
      const update = {
        id: clinicalLocationObj.id,
        location_id: addLocationFormData.location_id,
        clinical_trial_id: addLocationFormData.clinical_trial_id,
        status: addLocationFormData.status,
      };
      updateTrialLocation(update).then(() => router.push(`/trials/${trialId}`));
    } else {
      const trialLocation = {
        location_id: addLocationFormData.location_id,
        clinical_trial_id: addLocationFormData.clinical_trial_id,
        status: addLocationFormData.status,
      };
      createTrialLocation(trialLocation).then(() => router.push(`/trials/${trialId}`));
    }
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
          <option value="Golden Gate Bridge">Golden Gate Bridge</option>
          <option value="Eiffel Tower">Eiffel Tower</option>
          <option value="Sydney Opera House">Sydney Opera House</option>
          <option value="Taj Mahal">Taj Mahal</option>
          <option value="Great Wall of China">Great Wall of China</option>
        </Form.Select>
      </Form.Group>
      <br />
      <Button className="mt-5 mb-5" variant="primary" type="submit"> Save </Button>
    </Form>
  );
};

AddLocationForm.propTypes = {
  clinicalLocationObj: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    location: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    clinical_trial: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

AddLocationForm.defaultProps = {
  clinicalLocationObj: initialState,
};

export default AddLocationForm;
