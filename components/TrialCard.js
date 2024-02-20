import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { deleteTrial } from '../utils/data/trialsData';

export default function TrialCard({ trialObj, onUpdate }) {
  const router = useRouter();
  const deleteThisOrder = () => {
    if (window.confirm('Delete this order?')) {
      deleteTrial(trialObj.id).then(() => onUpdate());
    }
  };

  function trialDetail(id) {
    router.push(`/trials/${id}`);
  }

  function editTrial(id) {
    router.push(`trials/edit/${id}`);
  }

  return (
    <Card style={{ width: '18rem' }} className="card-color">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <span>{trialObj.title}</span>
          <span>{trialObj.nct_id}</span>
          <span>{trialObj.overall_status}</span>
        </div>
      </Card.Header>
      <Card.Body><Card.Text>{trialObj.study_type.name}</Card.Text>
        <Card.Text>{trialObj.brief_summary}</Card.Text>
        <Card.Text>{trialObj.detail_description}</Card.Text>
        <Card.Text>{trialObj.phase}</Card.Text>
        <Card.Text>{trialObj.eligibility}</Card.Text>
        <Card.Text>{trialObj.study_first_submit_date}</Card.Text>
        <Card.Text>{trialObj.last_update_submit_date}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex flex-row justify-content-between">
        <Button variant="primary" onClick={() => trialDetail(trialObj.id)} type="info">
          Details
        </Button>
        <Button variant="success" type="edit" onClick={() => editTrial(trialObj.id)}>
          Edit
        </Button>
        <Button variant="danger" type="delete" onClick={deleteThisOrder}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

TrialCard.propTypes = {
  trialObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    nct_id: PropTypes.number.isRequired,
    overall_status: PropTypes.string.isRequired,
    brief_summary: PropTypes.string.isRequired,
    detail_description: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
    eligibility: PropTypes.string.isRequired,
    study_first_submit_date: PropTypes.string.isRequired,
    last_update_submit_date: PropTypes.string.isRequired,
    study_type: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
