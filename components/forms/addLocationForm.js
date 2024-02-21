import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { updateTrial } from '../../utils/data/trialsData';

const initialState = {
  name: '',
  status: '',
  // user_id: 0,
};

const AddLocationForm = ({ locationObj }) => {
  const [addLocationFormData, setAddLocationFormData] = useState(initialState);
  const router = useRouter();
  const { trialId } = useRouter();

  const handleSave = (e) => {
    e.preventDefault();

    if (locationObj.id) {
      const update = {
        id: locationObj.id,
        name: addLocationFormData.name,
        status: addLocationFormData.status,
      };
      updateTrial(update).then(() => router.push(`/trials/${trialId}`));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddLocationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSave}>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Select
          name="name"
          required
          value={addLocationFormData.name}
          onChange={handleChange}
        >
          <option value="">Select a Location</option>
          <option value="Golden Gate Bridge">Golden Gate Bridge</option>
          <option value="Eiffel Tower">Eiffel Tower</option>
          <option value="Sydney Opera House">Sydney Opera House</option>
          <option value="Taj Mahal">Taj Mahal</option>
          <option value="Great Wall of China">Great Wall of China</option>
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
  locationObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.string,
  }),
};

AddLocationForm.defaultProps = {
  locationObj: initialState,
};

export default AddLocationForm;
