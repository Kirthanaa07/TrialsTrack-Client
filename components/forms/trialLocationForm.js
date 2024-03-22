'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'next/navigation';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { getLocations } from '../../utils/data/locationData';
import { createTrialLocation, updateTrialLocation } from '../../utils/data/trialLocationData';
import { statusOptions } from '../../utils/data/lookupData';
import { getSingleTrial } from '../../utils/data/trialsData';

const initialState = {
  location_id: 0,
  status: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  pi_name: '',
};

const TrialLocationForm = ({ existingTrialLocation = initialState, onSave }) => {
  const [trialLocationFormData, setTrialLocationFormData] = useState(initialState);
  const [locations, setLocations] = useState([]);
  const { trialId } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    getSingleTrial(trialId).then((data) => {
      const locIds = data.locations?.map((loc) => loc.location.id);
      getLocations().then((locs) => {
        const filteredLocs = locs.filter((loc) => !locIds.includes(loc.id));
        setLocations(filteredLocs);
      });
    });
    if (existingTrialLocation.id) {
      setTrialLocationFormData({
        id: existingTrialLocation.id,
        trial_id: existingTrialLocation.trial_id,
        location_id: existingTrialLocation.location.id,
        status: existingTrialLocation.status,
        contact_name: existingTrialLocation.contact_name,
        contact_phone: existingTrialLocation.contact_phone,
        contact_email: existingTrialLocation.contact_email,
        pi_name: existingTrialLocation.pi_name,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrialLocationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (existingTrialLocation.id) {
      const trialLocation = {
        id: existingTrialLocation.id,
        location_id: trialLocationFormData.location_id,
        trial_id: trialId,
        status: trialLocationFormData.status,
        contact_name: trialLocationFormData.contact_name,
        contact_phone: trialLocationFormData.contact_phone,
        contact_email: trialLocationFormData.contact_email,
        pi_name: trialLocationFormData.pi_name,
      };
      updateTrialLocation(trialLocation).then(() => {
        if (onSave) onSave();
      });
    } else {
      const trialLocation = {
        location_id: trialLocationFormData.location_id,
        trial_id: trialId,
        status: trialLocationFormData.status,
        contact_name: trialLocationFormData.contact_name,
        contact_phone: trialLocationFormData.contact_phone,
        contact_email: trialLocationFormData.contact_email,
        pi_name: trialLocationFormData.pi_name,
      };
      createTrialLocation(trialLocation).then(() => {
        if (onSave) onSave();
      });
    }
  };

  return (
    <>
      {existingTrialLocation.id ? (
        <Button isIconOnly color="success" variant="faded" onPress={onOpen} endContent={<span className="material-symbols-outlined">edit</span>} />
      ) : (
        <Button color="primary" onPress={onOpen} endContent={<span className="material-symbols-outlined">add</span>}>
          Add Trial Location
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{existingTrialLocation.id ? 'Update Trial Location' : 'Add Trial Location'}</ModalHeader>
              <ModalBody>
                <form id="add-location-form" onSubmit={handleSave} className="flex flex-col gap-4">
                  {existingTrialLocation.id ? <div>{existingTrialLocation.location.name}</div> : (
                    <Select
                      label="Location"
                      name="location_id"
                      required
                      disabled={existingTrialLocation.id}
                      selectedKeys={[trialLocationFormData.location_id]}
                      onChange={handleChange}
                    >
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                      ))}
                    </Select>
                  )}
                  <Select
                    label="Status"
                    name="status"
                    required
                    selectedKeys={[trialLocationFormData.status]}
                    onChange={handleChange}
                  >
                    {statusOptions.map((status) => (
                      <SelectItem key={status.name} value={status.name}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input label="Contact Name" name="contact_name" required value={trialLocationFormData.contact_name} onChange={handleChange} />
                  <Input label="Contact Phone" name="contact_phone" required value={trialLocationFormData.contact_phone} onChange={handleChange} />
                  <Input label="Contact Email" name="contact_email" required value={trialLocationFormData.contact_email} onChange={handleChange} />
                  <Input label="PI Name" name="pi_name" required value={trialLocationFormData.pi_name} onChange={handleChange} />
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

TrialLocationForm.propTypes = {
  existingTrialLocation: PropTypes.shape({
    id: PropTypes.number,
    location: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    status: PropTypes.string,
  })
};
TrialLocationForm.defaultProps = {
  existingTrialLocation: initialState,
};

export default TrialLocationForm;
