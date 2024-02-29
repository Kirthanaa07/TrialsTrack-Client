'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSingleTrial } from '../../../../utils/data/trialsData';
import AddLocationForm from '../../../../components/forms/addLocationForm';

const AddLocation = () => {
  const { trialId } = useParams();
  const [trial, setTrial] = useState({});

  useEffect(() => {
    getSingleTrial(trialId).then(setTrial);
  }, [trialId]);

  return (
    <div className="p-3">
      <AddLocationForm trailId={trial.id} />
    </div>
  );
};

export default AddLocation;
