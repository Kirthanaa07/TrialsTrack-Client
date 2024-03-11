'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSingleTrial } from '../../../../utils/data/trialsData';
import TrialForm from '../../../../components/forms/trialForm';

const UpdateTrial = () => {
  const { trialId } = useParams();
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
