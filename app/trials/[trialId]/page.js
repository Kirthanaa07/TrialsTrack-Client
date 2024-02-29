'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { getSingleTrial } from '../../../utils/data/trialsData';
import { deleteTrialLocation } from '../../../utils/data/trialLocationData';

function SingleTrial() {
  const [trialDetails, setTrialDetails] = useState({
    locations: {},
  });
  const { trialId } = useParams();

  const getTrial = () => {
    getSingleTrial(trialId).then((data) => {
      setTrialDetails(data);
    });
  };

  const deleteThisLocation = (trialLocationId) => {
    if (window.confirm('Delete this Location?')) {
      deleteTrialLocation(trialLocationId);
      getTrial();
    }
  };

  useEffect(() => {
    getTrial();
  }, [getTrial]);

  const addLocation = () => {
    router.push(`/trials/${trialId}/add-location`);
  };

  return (
    <article className="items p-3">
      <h1> Trials Details </h1>
      <div>{trialDetails.detail_description}</div>
      <h1> Location and Status</h1>
      <div className="d-flex flex-column gap-2">
        {trialDetails.locations && trialDetails.locations.length > 0 ? trialDetails.locations.map((trialLocation) => (
          <div className="d-flex flex-row gap-3" key={trialLocation.id}>{trialLocation.location.name} - {trialLocation.status}
            <Button variant="danger" type="delete" onClick={() => deleteThisLocation(trialLocation.id)}>
              Delete
            </Button>
          </div>
        )) : <></>}
      </div>
      <Button variant="success" type="payment" onClick={addLocation}>
        Add Location
      </Button>
    </article>
  );
}

export default SingleTrial;
