'use client';

import React, { useEffect, useState } from 'react';
import { Button, Chip, Divider } from '@nextui-org/react';
import { router, useParams } from 'next/navigation';
import { getSingleTrial } from '../../../utils/data/trialsData';
import { deleteTrialLocation } from '../../../utils/data/trialLocationData';
import { statusColorMap } from '../../../utils/data/lookupData';

function SingleTrial() {
  const [trial, setTrialDetails] = useState({
    locations: {},
  });
  const { trialId } = useParams();

  const getTrial = () => {
    getSingleTrial(trialId).then(setTrialDetails);
  };

  const deleteThisLocation = (trialLocationId) => {
    if (window.confirm('Delete this Location?')) {
      deleteTrialLocation(trialLocationId);
      getTrial();
    }
  };

  useEffect(() => {
    getTrial();
  }, []);

  const addLocation = () => {
    router.push(`/trials/${trialId}/add-location`);
  };

  return (
    <div className="flex flex-col grow p-6 gap-4">
      <div className="flex flex-row justify-between">
        <div className="text-3xl font-bold">{trial.nct_id}</div>
        <div className="flex gap-2 items-center">
          <div>OVERALL STATUS</div>
          <Chip className="text-xl capitalize" color={statusColorMap[trial.overall_status] ? statusColorMap[trial.overall_status] : 'warning'} size="sm" variant="flat">
            {trial.overall_status}
          </Chip>
          <Button color="primary" endContent={<span className="material-symbols-outlined">add</span>} type="payment" onClick={addLocation}>
            Add Location
          </Button>
        </div>
      </div>
      <div>
        <div className="text-md font-bold mb-3">LOCATIONS WITH STATUS</div>
        <Divider />
        <div className="flex flex-col gap-3 grow">
          {trial.locations && trial.locations.length > 0 ? trial.locations.map((trialLocation) => (
            <div key={trialLocation.id}>
              <div className="flex flex-row gap-6 text-lg items-center" >
                <div className="flex gap-3">{trialLocation.location.name}
                  <Chip className="text-lg capitalize" color={statusColorMap[trialLocation.status] ? statusColorMap[trialLocation.status] : 'warning'} size="sm" variant="flat">
                    {trialLocation.status}
                  </Chip>
                </div>
                <Button iconOnly color="danger" variant="flat" className="material-symbols-outlined m-3" type="delete" onClick={() => deleteThisLocation(trialLocation.id)}>
                  delete
                </Button>
              </div>
              <Divider />
            </div>
          )) : <></>}
        </div>
      </div>
      <div>
        <div className="text-md font-bold">TITLE</div>
        <div>{trial.title}</div>
      </div>
      <div>
        <div className="text-md font-bold">BRIEF TITLE</div>
        <div>Brief Title: {trial.brief_title}</div>
      </div>
      <div>
        <div className="text-md font-bold">BRIEF SUMMARY</div>
        <div>Brief Summary: {trial.brief_summary}</div>
      </div>
      <div>
        <div className="text-md font-bold">DETAIL DESCRIPTION</div>
        <div>Detail Description: {trial.detail_description}</div>
      </div>
      <Divider />
      <div>
        <div className="text-md font-bold">ELIGIBILITY</div>
        <div className="whitespace-pre-wrap">Eligibility: {trial.eligibility}</div>
      </div>
    </div>
  );
}

export default SingleTrial;
