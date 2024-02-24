import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleTrial } from '../../../utils/data/trialsData';

function SingleTrial() {
  const [trialDetails, setTrialDetails] = useState({
    locations: {},
  });
  const router = useRouter();

  const { trialId } = router.query;

  useEffect(() => {
    getSingleTrial(trialId).then((data) => {
      setTrialDetails(data);
    });
  }, [trialId]);

  const addLocation = () => {
    router.push(`/trials/${trialId}/add-location`);
  };

  return (
    <article className="items p-3">
      <h1> Trials Details </h1>
      <div>{trialDetails.detail_description}</div>
      <h1> Location and Status</h1>
      {trialDetails.locations && trialDetails.locations.length > 0 ? trialDetails.locations.map((trialLocation) => (
        <div key={trialLocation.id}>{trialLocation.location.name} - {trialLocation.status}</div>
      )) : <></>}
      <Button variant="success" type="payment" onClick={addLocation}>
        Add Location
      </Button>
    </article>
  );
}

export default SingleTrial;
