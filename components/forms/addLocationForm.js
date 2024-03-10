'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouter } from 'next/navigation';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { getLocations } from '../../utils/data/locationData';
import { createTrialLocation } from '../../utils/data/trialLocationData';
import { useAuth } from '../../utils/context/authContext';
import { statusOptions } from '../../utils/data/lookupData';

const initialState = {
  location_id: '',
  status: '',
};

const AddLocationForm = ({ excludeLocationIds, onSave }) => {
  const [addLocationFormData, setAddLocationFormData] = useState(initialState);
  const [locations, setLocations] = useState([]);
  const { trialId } = useParams();
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    getLocations().then((data) => {
      const result = data.filter((loc) => !excludeLocationIds.includes(loc.id)).sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setLocations(result);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddLocationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const trialLocation = {
      location_id: addLocationFormData.location_id,
      trial_id: trialId,
      status: addLocationFormData.status,
    };
    createTrialLocation(trialLocation).then(() => {
      if (onSave) onSave();
    });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen} endContent={<span className="material-symbols-outlined">add</span>}>
        Add Location
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Location</ModalHeader>
              <ModalBody>
                <form id="add-location-form" onSubmit={handleSave} className="flex flex-col gap-4">
                  <Select
                    label="Location"
                    name="location_id"
                    required
                    value={addLocationFormData.location_id}
                    onChange={handleChange}
                  >
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Status"
                    name="status"
                    required
                    value={addLocationFormData.status}
                    onChange={handleChange}
                  >
                    {statusOptions.map((status) => (
                      <SelectItem key={status.name} value={status.name}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </Select>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  form="add-location-form"
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

AddLocationForm.propTypes = {
  excludeLocationIds: PropTypes.array
};

export default AddLocationForm;
