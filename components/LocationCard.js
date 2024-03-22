'use client';

import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button, Card, CardHeader,
  CardBody, CardFooter,
} from '@nextui-org/react';
import { deleteLocation } from '../utils/data/locationData';

export default function LocationCard({ locationObj, onUpdate }) {
  const router = useRouter();
  const deleteThisLocation = () => {
    if (window.confirm('Delete this Location?')) {
      deleteLocation(locationObj.id).then(() => onUpdate());
    }
  };

  function editLocation(id) {
    router.push(`locations/edit/${id}`);
  }

  return (
    <Card style={{ width: '18rem' }} className="card-color">
      <CardHeader>
        <div className="d-flex justify-content-between">
          <span>{locationObj.name}</span>
          <span>{locationObj.address}</span>
          <span>{locationObj.city}</span>
        </div>
      </CardHeader>
      <CardBody>
        <div>{locationObj.state}</div>
        <div>{locationObj.zip}</div>
        <div>{locationObj.country}</div>
      </CardBody>
      <CardFooter className="text-muted d-flex flex-row justify-content-between">
        <Button variant="success" type="edit" onClick={() => editLocation(locationObj.id)}>
          Edit
        </Button>
        <Button variant="danger" type="delete" onClick={deleteThisLocation}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

LocationCard.propTypes = {
  locationObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
