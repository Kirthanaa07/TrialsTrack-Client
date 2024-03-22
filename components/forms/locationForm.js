'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure,
} from '@nextui-org/react';
import { createLocation, updateLocation } from '../../utils/data/locationData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  geo_lat: '',
  geo_lon: '',
};

const LocationForm = ({ existingLocation = initialState, onSave }) => {
  const [formLocationData, setFormLocationData] = useState(initialState);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth();

  useEffect(() => {
    // getLocations().then(setFormLocationData);
    if (existingLocation.id) {
      setFormLocationData({
        id: existingLocation.id,
        name: existingLocation.name,
        address: existingLocation.address,
        city: existingLocation.city,
        state: existingLocation.state,
        zip: existingLocation.zip,
        country: existingLocation.country,
        geo_lat: existingLocation.geo_lat,
        geo_lon: existingLocation.geo_lon,
      });
    }
  }, [existingLocation, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLocationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingLocation.id) {
      const update = {
        id: formLocationData.id,
        name: formLocationData.name,
        address: formLocationData.address,
        city: formLocationData.city,
        state: formLocationData.state,
        zip: formLocationData.zip,
        country: formLocationData.country,
        geo_lat: formLocationData.geo_lat,
        geo_lon: formLocationData.geo_lon,
      };
      updateLocation(update).then(() => {
        if (onSave) onSave();
      });
    } else {
      const location = {
        name: formLocationData.name,
        address: formLocationData.address,
        city: formLocationData.city,
        state: formLocationData.state,
        zip: formLocationData.zip,
        country: formLocationData.country,
        geo_lat: formLocationData.geo_lat,
        geo_lon: formLocationData.geo_lon,
      };
      createLocation(location).then(() => {
        if (onSave) onSave();
      });
    }
  };

  return (
    <>
      {existingLocation.id ? (
        <Button isIconOnly color="success" variant="faded" onPress={onOpen} endContent={<span className="material-symbols-outlined">edit</span>} />
      ) : (
        <Button color="primary" onPress={onOpen} endContent={<span className="material-symbols-outlined">add</span>}>
          Add Location
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{existingLocation.id ? 'Update Location' : 'Add Location'}</ModalHeader>
              <ModalBody>
                <form id="location-form" onSubmit={handleSubmit} className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 grow">
                    <Input label="Name" name="name" required value={formLocationData.name} onChange={handleChange} />
                    <Input label="Address" name="address" required value={formLocationData.address} onChange={handleChange} />
                    <Input label="City" name="city" required value={formLocationData.city} onChange={handleChange} />
                    <Input label="State" name="state" required value={formLocationData.state} onChange={handleChange} />
                  </div>
                  <div className="flex flex-col gap-4 grow">
                    <Input label="Zip" name="zip" required value={formLocationData.zip} onChange={handleChange} />
                    <Input label="Country" name="country" required value={formLocationData.country} onChange={handleChange} />
                    <Input label="Latitude" name="geo_lat" required value={formLocationData.geo_lat} onChange={handleChange} />
                    <Input label="Longitude" name="geo_lon" required value={formLocationData.geo_lon} onChange={handleChange} />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  form="location-form"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

LocationForm.propTypes = {
  existingLocation: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    country: PropTypes.string,
    geo_lat: PropTypes.string,
    geo_lon: PropTypes.string,
  }),
};
LocationForm.defaultProps = {
  existingLocation: initialState,
};
export default LocationForm;
