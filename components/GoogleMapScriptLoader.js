import { useMemo } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const GoogleMapScriptLoader = () => {
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <div className="absolute text-bold">Loading Google Maps Script</div>;
  }

  return <div className="absolute transition-opacity delay-1000 opacity-0 text-bold">Google Map Script Loaded</div>;
};

export default GoogleMapScriptLoader;
