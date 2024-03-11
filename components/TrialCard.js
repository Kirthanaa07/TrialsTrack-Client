'use client';

import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button, CardHeader, Card, CardBody, CardFooter,
} from '@nextui-org/react';
// import Link from 'next/link';
import { deleteTrial } from '../utils/data/trialsData';

export default function TrialCard({ trialObj, onUpdate }) {
  const router = useRouter();
  const deleteThisTrial = () => {
    if (window.confirm('Delete this Trial?')) {
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

    <Card className="max-w-[400px]">
      <CardHeader className="flex justify-between">
        <span>{trialObj.title}</span>
        <span>{trialObj.nct_id}</span>
      </CardHeader>
      <CardBody>
        <div>{trialObj.phase}</div>
        <div>{trialObj.eligibility}</div>
        <div>{trialObj.overall_status}</div>
        <div>{trialObj.study_type}</div>
        <div>{trialObj.study_first_submit_date}</div>
        <div>{trialObj.last_update_submit_date}</div>
      </CardBody>
      <CardFooter>
        <Button variant="primary" onClick={() => trialDetail(trialObj.id)} type="info">
          Details
        </Button>
        <Button variant="success" type="edit" onClick={() => editTrial(trialObj.id)}>
          Edit
        </Button>
        <Button variant="danger" type="delete" onClick={deleteThisTrial}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

TrialCard.propTypes = {
  trialObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    nct_id: PropTypes.string.isRequired,
    overall_status: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
    eligibility: PropTypes.string.isRequired,
    study_first_submit_date: PropTypes.string.isRequired,
    last_update_submit_date: PropTypes.string.isRequired,
    study_type: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
