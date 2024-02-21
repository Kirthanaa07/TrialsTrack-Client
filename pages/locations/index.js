import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getLocations } from '../../utils/data/locationData';
import LocationCard from '../../components/LocationCard';

function Home() {
  const [locations, setLocations] = useState([]);

  const router = useRouter();
  const getAllLocations = () => {
    getLocations().then(setLocations);
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
