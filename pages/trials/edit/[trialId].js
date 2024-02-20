import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTrial } from '../../../utils/data/trialsData';
import TrialForm from '../../../components/forms/trialForm';

const UpdateTrial = () => {
  const router = useRouter();
  const { trialId } = router.query;
  const [editTrial, setEditTrial] = useState({});

  useEffect(() => {
    getSingleTrial(trialId).then(setEditTrial);
  }, [trialId]);

  return (
    <div>
      <h2>Update Trial</h2>
      <TrialForm trialObj={editTrial} />
    </div>
  );
};

export default UpdateTrial;
