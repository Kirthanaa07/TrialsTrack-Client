import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LocationForm from '../../../components/forms/locationForm';
import { getSingleLocation } from '../../../utils/data/locationData';

const UpdateLocation = () => {
  const router = useRouter();
  const { locationId } = router.query;
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
