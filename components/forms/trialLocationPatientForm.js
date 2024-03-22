'use client';

import { useParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import {
  Button, Modal, ModalBody, ModalContent, ModalFooter,
  ModalHeader, Select, SelectItem, useDisclosure,
} from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { patientStatusOptions } from '../../utils/data/lookupData';
import {
  createTrialLocationPatient, getPatients,
  getTrialLocationPatients, updateTrialLocationPatient,
} from '../../utils/data/trialLocationPatientData';
import { getSingleTrialLocation } from '../../utils/data/trialLocationData';

const TrialLocationPatientForm = ({ existingTrialLocationPatient = {}, onSave }) => {
  const [patientId, setPatientId] = useState(new Set([]));
  const [researcherId, setResearcherId] = useState(new Set([]));
  const [status, setStatus] = useState(new Set([]));

  const [patients, setPatients] = useState();
  const [researchers, setResearchers] = useState();
  const { user } = useAuth();
  const { trialLocationId } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useMemo(() => {
    getSingleTrialLocation(trialLocationId).then((trialLocation) => {
      setResearchers(trialLocation.location.location_researchers);
    });
    getPatients().then((dbPatients) => {
      getTrialLocationPatients(trialLocationId).then((existingPatients) => {
        const existingPatientIds = existingPatients.map((p) => p.patient.id);
        const result = dbPatients.filter((p) => !existingPatientIds || !existingPatientIds.includes(p.id));
        setPatients(result);
      });
    });

    if (existingTrialLocationPatient.id) {
      if (existingTrialLocationPatient.patient) setPatientId(new Set([`${existingTrialLocationPatient.patient.id}`]));
      if (existingTrialLocationPatient.researcher) setResearcherId(new Set([`${existingTrialLocationPatient.researcher.id}`]));
      setStatus(new Set([`${existingTrialLocationPatient.status}`]));
    } else {
      setPatientId(new Set([]));
      setResearcherId(new Set([]));
      setStatus(new Set([]));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingTrialLocationPatient.id) {
      const update = {
        id: existingTrialLocationPatient.id,
        trial_location_id: +trialLocationId,
        patient_id: patientId && patientId.size > 0 ? +[...patientId][0] : null,
        researcher_id: researcherId && researcherId.size > 0 ? +[...researcherId][0] : null,
        status: status && status.size > 0 ? [...status][0] : null,
      };
      updateTrialLocationPatient(update).then(() => {
        if (onSave) onSave(user.id);
      });
    } else {
      const trialLocationPatient = {
        trial_location_id: +trialLocationId,
        patient_id: patientId && patientId.size > 0 ? +[...patientId][0] : null,
        researcher_id: researcherId && researcherId.size > 0 ? +[...researcherId][0] : null,
        status: status && status.size > 0 ? [...status][0] : null,
      };
      createTrialLocationPatient(trialLocationPatient).then(() => {
        if (onSave) onSave(user.id);
      });
    }
  };

  return (
    <>
      {existingTrialLocationPatient.id ? (
        <Button isIconOnly color="success" variant="faded" onPress={onOpen} endContent={<span className="material-symbols-outlined">edit</span>} />
      ) : (
        <Button color="primary" onPress={onOpen} endContent={<span className="material-symbols-outlined">add</span>}>
          Add Patient
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{existingTrialLocationPatient.id ? 'Edit Patient Trial Location' : 'Add Patient to Trial Location'}</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} id="trial-form" className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 grow">
                    {existingTrialLocationPatient.id ? <></> : (
                      <Select label="Patient" name="patient" required selectedKeys={patientId} onSelectionChange={setPatientId}>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.user.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    {existingTrialLocationPatient.id ? <></> : (
                      <Select label="Researcher" name="researcher" required selectedKeys={researcherId} onSelectionChange={setResearcherId}>
                        {researchers.map((researcher) => (
                          <SelectItem key={researcher.id} value={researcher.id}>
                            {researcher.user.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    <Select label="Status" name="status" required selectedKeys={status} onSelectionChange={setStatus}>
                      {patientStatusOptions.map((patientStatus) => (
                        <SelectItem key={patientStatus.name} value={patientStatus.name}>
                          {patientStatus.name}
                        </SelectItem>
                      ))}
                    </Select>
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
                  form="trial-form"
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

TrialLocationPatientForm.propTypes = {
  existingTrialLocationPatient: PropTypes.shape({
    id: PropTypes.number,
    trial_location: PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    patient: PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    researcher: PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  }),
};

TrialLocationPatientForm.defaultProps = {
  existingTrialLocationPatient: {},
};

export default TrialLocationPatientForm;
