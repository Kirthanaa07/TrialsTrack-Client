'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button, Input, Modal, ModalBody, ModalContent,
  ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure,
} from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { createTrial, updateTrial } from '../../utils/data/trialsData';
import { statusOptions, studyTypeOptions } from '../../utils/data/lookupData';

const initialState = {
  nct_id: '',
  title: '',
  brief_title: '',
  detail_description: '',
  lead_sponsor_name: '',
  study_type: '',
  overall_status: '',
  brief_summary: '',
  phase: '',
  eligibility: '',
  study_first_submit_date: '',
  last_update_submit_date: '',
  imported_date: '',
};

const TrialForm = ({ trialObj = initialState, onSave }) => {
  const [formTrialData, setFormTrialData] = useState(initialState);
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (trialObj.id) {
      setFormTrialData({
        id: trialObj.id,
        nct_id: trialObj.nct_id,
        title: trialObj.title,
        brief_title: trialObj.brief_title,
        detail_description: trialObj.detail_description,
        brief_summary: trialObj.brief_summary,
        lead_sponsor_name: trialObj.lead_sponsor_name,
        study_type: trialObj.study_type.toUpperCase(),
        overall_status: trialObj.overall_status.toUpperCase(),
        phase: trialObj.phase,
        eligibility: trialObj.eligibility,
        study_first_submit_date: trialObj.study_first_submit_date,
        last_update_submit_date: trialObj.last_update_submit_date,
        user_id: user.id,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormTrialData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (trialObj.id) {
      const update = {
        id: trialObj.id,
        nct_id: formTrialData.nct_id,
        title: formTrialData.title,
        brief_title: formTrialData.brief_title,
        detail_description: formTrialData.detail_description,
        brief_summary: formTrialData.brief_summary,
        lead_sponsor_name: formTrialData.lead_sponsor_name,
        study_type: formTrialData.study_type.toUpperCase(),
        overall_status: formTrialData.overall_status.toUpperCase(),
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
      };
      updateTrial(update).then(() => {
        if (onSave) onSave(user.id);
      });
    } else {
      const trial = {
        nct_id: formTrialData.nct_id,
        title: formTrialData.title,
        brief_title: formTrialData.brief_title,
        detail_description: formTrialData.detail_description,
        brief_summary: formTrialData.brief_summary,
        lead_sponsor_name: formTrialData.lead_sponsor_name,
        study_type: formTrialData.study_type.toUpperCase(),
        overall_status: formTrialData.overall_status.toUpperCase(),
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
        imported_date: new Date(),
      };
      createTrial(trial).then(() => {
        if (onSave) onSave(user.id);
      });
    }
  };

  return (
    <>
      {trialObj.id ? (
        <Button isIconOnly color="success" variant="faded" onPress={onOpen} endContent={<span className="material-symbols-outlined">edit</span>} />
      ) : (
        <Button color="primary" onPress={onOpen} endContent={<span className="material-symbols-outlined">add</span>}>
          Add New
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{trialObj.id ? 'Edit Trial' : 'Create Trial'}</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} id="trial-form" className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 grow">
                    <Input label="NCT" name="nct_id" required value={formTrialData.nct_id} onChange={handleChange} />
                    <Input label="Title" name="title" required value={formTrialData.title} onChange={handleChange} />
                    <Select label="Overall Status" name="overall_status" required selectedKeys={[formTrialData.overall_status]} onChange={handleChange}>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.name} value={status.name}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Textarea label="Brief Title" name="brief_title" required value={formTrialData.brief_title} onChange={handleChange} />
                    <Textarea label="Brief Summary" name="brief_summary" required value={formTrialData.brief_summary} onChange={handleChange} />

                    <Input label="Lead Sponsor Name" name="lead_sponsor_name" required value={formTrialData.lead_sponsor_name} onChange={handleChange} />
                  </div>

                  <div className="flex flex-col gap-4 grow">
                    <Textarea label="Detail Description" name="detail_description" required value={formTrialData.detail_description} onChange={handleChange} />
                    <Input label="Phase" name="phase" required value={formTrialData.phase} onChange={handleChange} />
                    <Textarea label="Eligibility" name="eligibility" required value={formTrialData.eligibility} onChange={handleChange} />
                    <Input
                      type="date"
                      label="Study First Submit Date"
                      name="study_first_submit_date"
                      required
                      value={formTrialData.study_first_submit_date}
                      onChange={handleChange}
                    />
                    <Input
                      type="date"
                      label="Last Update Submit Date"
                      name="last_update_submit_date"
                      required
                      value={formTrialData.last_update_submit_date}
                      onChange={handleChange}
                    />
                    <Select label="Study Type" name="study_type" required selectedKeys={[formTrialData.study_type]} onChange={handleChange}>
                      {studyTypeOptions.map((studyType) => (
                        <SelectItem key={studyType.name} value={studyType.name}>
                          {studyType.name}
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

TrialForm.propTypes = {
  trialObj: PropTypes.shape({
    id: PropTypes.number,
    nct_id: PropTypes.string,
    title: PropTypes.string,
    brief_title: PropTypes.string,
    detail_description: PropTypes.string,
    brief_summary: PropTypes.string,
    lead_sponsor_name: PropTypes.string,
    overall_status: PropTypes.string,
    phase: PropTypes.string,
    eligibility: PropTypes.string,
    study_first_submit_date: PropTypes.string,
    last_update_submit_date: PropTypes.string,
    study_type: PropTypes.string,
    imported_date: PropTypes.string,
  }),
  onSave: PropTypes.func,
};

TrialForm.defaultProps = {
  trialObj: initialState,
  onSave: () => { },
};
export default TrialForm;
