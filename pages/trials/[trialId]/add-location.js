import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTrial } from '../../../utils/data/trialsData';
import AddLocationForm from '../../../components/forms/addLocationForm';

const AddLocation = () => {
  const router = useRouter();
  const { trialId } = router.query;
  const [addLocation, setAddLocation] = useState({});

  useEffect(() => {
    getSingleTrial(trialId).then(setAddLocation);
  }, [trialId]);

  return (
    <div className="p-3">
      <AddLocationForm locationObj={addLocation} />
    </div>
  );
};

export default AddLocation;
