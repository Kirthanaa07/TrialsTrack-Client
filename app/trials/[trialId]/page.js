'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Chip, Divider } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { deleteTrial, getSingleTrial } from '../../../utils/data/trialsData';
import { deleteTrialLocation } from '../../../utils/data/trialLocationData';
import { statusColorMap } from '../../../utils/data/lookupData';
import DeleteWithConfirm from '../../../components/ConfirmDeleteModal';
import TrialForm from '../../../components/forms/trialForm';
import TrialLocationForm from '../../../components/forms/trialLocationForm';
import { useAuth } from '../../../utils/context/authContext';

function SingleTrial() {
  const [trial, setTrialDetails] = useState({
    locations: {},
  });

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const { trialId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  let mapCenter = useMemo(
    () => ({ lat: 0, lng: 0 }),
    [],
  );
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    [],
  );

  const getTrial = () => {
    getSingleTrial(trialId).then(setTrialDetails);
  };

  const deleteThisTrial = () => {
    deleteTrial(trialId);
    router.push('/');
  };

  const deleteThisLocation = (trialLocationId) => {
    deleteTrialLocation(trialLocationId).then(() => getTrial());
  };

  useEffect(() => {
    getTrial();
  }, [coordinates]);

  const changeGoogleMapCoordinates = (location) => {
    mapCenter = {
      lat: +location.geo_lat,
      lng: +location.geo_lon,
    };
    setCoordinates(mapCenter);
  };

  return (
    <div className="flex flex-col grow p-6 gap-4">
      <div className="flex flex-row justify-between mb-8">
        <div className="text-3xl font-bold">{trial.nct_id}</div>
        <div className="flex gap-2 items-center">
          <div>OVERALL STATUS</div>
          <Chip className="text-lg capitalize" color={statusColorMap[trial.overall_status] ? statusColorMap[trial.overall_status] : 'warning'} size="sm" variant="flat">
            {trial.overall_status}
          </Chip>
          {trial.id && user.role === 'Admin' ? <div className="ml-8"><TrialForm trialObj={trial} onSave={getTrial} /></div> : <></>}
          {user.role === 'Admin' ? <DeleteWithConfirm onConfirm={deleteThisTrial} /> : <></>}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between grow items-center mb-4">
          <div className="text-md font-bold">LOCATIONS WITH STATUS</div>
          {user.role === 'Admin' ? <TrialLocationForm onSave={getTrial} /> : <></>}
        </div>
        <Divider />
        {/* https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps */}
        <div className="flex flex-row gap-4 mb-8">
          <div className="flex flex-col grow h-96 overflow-auto">
            {trial.locations && trial.locations.length > 0 ? trial.locations.map((trialLocation) => (
              <div key={trialLocation.id}>
                <div className="flex flex-row gap-6 p-4 text-lg items-center">
                  <div className="flex flex-1 gap-3">
                    <div className="flex flex-col">
                      <span>{trialLocation.location.name}</span>
                      <span className="italic text-sm">{trialLocation.location.address} {trialLocation.location.state} {trialLocation.location.zip}</span>
                      <div className="italic text-sm">{trialLocation.contact_name}</div>
                      {trialLocation.contact_phone ? <div className="italic text-sm flex gap-2"><span className="material-symbols-outlined text-sm">phone</span>{trialLocation.contact_phone}</div> : <></>}
                      {trialLocation.contact_email ? <div className="italic text-sm flex gap-2"><span className="material-symbols-outlined text-sm">email</span>{trialLocation.contact_email}</div> : <></>}
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mr-3">
                    <span className="mr-4">{trialLocation.status ? (
                      <Chip className="text-lg capitalize" color={statusColorMap[trialLocation.status] ? statusColorMap[trialLocation.status] : 'warning'} size="sm" variant="flat">
                        {trialLocation.status}
                      </Chip>
                    ) : <></>}
                    </span>
                    {user.role === 'Admin' || (user.location_id && user.location_id === trialLocation.location.id) ? <Button color="primary" onClick={() => router.push(`/trial-locations/${trialLocation.id}/patients`)} endContent={<span className="material-symbols-outlined">visibility</span>}>Patients</Button> : <></>}
                    <Button
                      isIconOnly
                      color="secondary"
                      variant="faded"
                      onClick={() => changeGoogleMapCoordinates(trialLocation.location)}
                    >
                      <span className="material-symbols-outlined">pin_drop</span>
                    </Button>
                    {user.role === 'Admin' || (user.location_id && user.location_id === trialLocation.location.id) ? <TrialLocationForm existingTrialLocation={trialLocation} onSave={getTrial} /> : <></>}
                    {user.role === 'Admin' ? <DeleteWithConfirm onConfirm={() => deleteThisLocation(trialLocation.id)} /> : <></>}
                  </div>
                </div>

                <Divider />
              </div>
            )) : <></>}
          </div>
          <div className="flex justify-end">
            <GoogleMap
              options={mapOptions}
              zoom={14}
              center={coordinates}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '40rem', height: '24rem' }}
            >
              <MarkerF position={coordinates} />
            </GoogleMap>
          </div>
        </div>
      </div>
      <div>
        <div className="text-md font-bold">TITLE</div>
        <div>{trial.title}</div>
      </div>
      <div>
        <div className="text-md font-bold">STUDY TYPE</div>
        <div>{trial.study_type}</div>
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
