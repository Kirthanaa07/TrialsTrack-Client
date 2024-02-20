import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTrial, getStudyTypes, updateTrial } from '../../utils/data/trialsData';

const initialState = {
  nct_id: '',
  title: '',
  brief_title: '',
  study_type: 0,
  overall_Status: '',
  brief_summary: '',
  detail_description: '',
  phase: '',
  eligibility: '',
  study_first_submit_date: '',
  last_update_submit_date: '',
};

const TrialForm = ({ trialObj }) => {
  const [studyTypes, setStudyTypes] = useState([]);
  const [formTrialData, setFormTrialData] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getStudyTypes().then(setStudyTypes);
    if (trialObj.id) {
      setFormTrialData({
        id: trialObj.id,
        nct_id: trialObj.nct_id,
        title: trialObj.title,
        brief_title: trialObj.brief_title,
        study_type: trialObj.study_type?.id,
        overall_Status: trialObj.overall_Status,
        brief_summary: trialObj.brief_summary,
        detail_description: trialObj.detail_description,
        phase: trialObj.phase,
        eligibility: trialObj.eligibility,
        study_first_submit_date: trialObj.study_first_submit_date,
        last_update_submit_date: trialObj.last_update_submit_date,
        userId: user.uid,
      });
    }
  }, [trialObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormTrialData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (trialObj.id) {
      const update = {
        id: trialObj.id,
        nct_id: Number(formTrialData.nct_id),
        title: formTrialData.title,
        brief_title: formTrialData.brief_title,
        study_type: Number(formTrialData.study_type),
        overall_Status: formTrialData.overall_Status,
        brief_summary: formTrialData.brief_summary,
        detail_description: formTrialData.detail_description,
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
        userId: user.uid,
      };
      updateTrial(update, user.uid).then(() => router.push('/trials'));
    } else {
      const trial = {
        nct_id: Number(formTrialData.nct_id),
        title: formTrialData.title,
        brief_title: formTrialData.brief_title,
        study_type: Number(formTrialData.study_type),
        overall_Status: formTrialData.overall_Status,
        brief_summary: formTrialData.brief_summary,
        detail_description: formTrialData.detail_description,
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
        userId: user.uid,
      };
      createTrial(trial, user.uid).then(() => router.push('/trials'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>NCT</Form.Label>
          <Form.Control name="nct_id" required value={formTrialData.nct_id} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={formTrialData.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brief Title</Form.Label>
          <Form.Control name="brief_title" required value={formTrialData.brief_title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control name="overall_Status" required value={formTrialData.overall_Status} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brief Summary</Form.Label>
          <Form.Control name="brief_summary" required value={formTrialData.brief_summary} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Detail Description</Form.Label>
          <Form.Control name="detail_description" required value={formTrialData.detail_description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phase</Form.Label>
          <Form.Control name="phase" required value={formTrialData.phase} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Eligibility</Form.Label>
          <Form.Control name="eligibility" required value={formTrialData.eligibility} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Study first submit date</Form.Label>
          <Form.Control name="study_first_submit_date" required value={formTrialData.study_first_submit_date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last update submit date</Form.Label>
          <Form.Control name="last_update_submit_date" required value={formTrialData.last_update_submit_date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Study Type</Form.Label>
          <Form.Select
            name="study_type"
            required
            value={formTrialData.study_type}
            onChange={handleChange}
          >
            <option value="">Select a study type</option>
            {studyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"> {trialObj.id ? 'Update' : 'Create'} Trial </Button>
      </Form>
    </>
  );
};

TrialForm.propTypes = {
  trialObj: PropTypes.shape({
    id: PropTypes.number,
    nct_id: PropTypes.number,
    title: PropTypes.string,
    brief_title: PropTypes.string,
    overall_Status: PropTypes.string,
    brief_summary: PropTypes.string,
    detail_description: PropTypes.string,
    phase: PropTypes.string,
    eligibility: PropTypes.string,
    study_first_submit_date: PropTypes.string,
    last_update_submit_date: PropTypes.string,
    study_type: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

TrialForm.defaultProps = {
  trialObj: initialState,
};

export default TrialForm;
