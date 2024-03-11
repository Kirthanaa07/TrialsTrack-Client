'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LocationForm from '../../../../components/forms/locationForm';
import { getSingleLocation } from '../../../../utils/data/locationData';

const UpdateLocation = () => {
  const { locationId } = useParams();
  const [editLocation, setEditLocation] = useState({});

  useEffect(() => {
    getSingleLocation(locationId).then(setEditLocation);
  }, [locationId]);

  return (
    <div>
      <h2>Update Location</h2>
      <LocationForm existingLocation={editLocation} />
    </div>
  );
};

export default UpdateLocation;
