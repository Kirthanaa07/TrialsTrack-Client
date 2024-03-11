'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { getLocations } from '../../utils/data/locationData';
import LocationCard from '../../components/LocationCard';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [locations, setLocations] = useState([]);
  const { user } = useAuth();

  const router = useRouter();
  const getAllLocations = () => {
    getLocations(user.id).then(setLocations);
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <article className="orders p-3">
      <Button
        onClick={() => {
          router.push('/locations/new');
        }}
      >
        Create New Location
      </Button>
      <h1>Locations</h1>
      <div className="d-flex flex-row justify-content-start gap-2 flex-wrap">
        {locations.map((location) => (
          <LocationCard key={`location--${location.id}`} locationObj={location} onUpdate={getAllLocations} />
        ))}
      </div>
    </article>
  );
}

export default Home;
