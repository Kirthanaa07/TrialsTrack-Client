'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { createTrial, updateTrial } from '../../utils/data/trialsData';
import { statusOptions } from '../../utils/data/lookupData';

const initialState = {
  nct_id: '',
  title: '',
  study_type: '',
  overall_status: '',
  brief_summary: '',
  phase: '',
  eligibility: '',
  study_first_submit_date: '',
  last_update_submit_date: '',
};

const TrialForm = ({ trialObj = initialState }) => {
  const [formTrialData, setFormTrialData] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (trialObj.id) {
      setFormTrialData({
        id: trialObj.id,
        nct_id: trialObj.nct_id,
        title: trialObj.title,
        study_type: trialObj.study_type?.id,
        overall_status: trialObj.overall_status,
        phase: trialObj.phase,
        eligibility: trialObj.eligibility,
        study_first_submit_date: trialObj.study_first_submit_date,
        last_update_submit_date: trialObj.last_update_submit_date,
        user_id: user.id,
      });
    }
  }, [trialObj, user]);

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
        study_type: Number(formTrialData.study_type),
        overall_status: formTrialData.overall_status,
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
        user_id: user.id,
      };
      updateTrial(update).then(() => router.push('/'));
    } else {
      const trial = {
        nct_id: formTrialData.nct_id,
        title: formTrialData.title,
        study_type: Number(formTrialData.study_type),
        overall_status: formTrialData.overall_status,
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
        user_id: user.id,
      };
      createTrial(trial).then(() => router.push('/'));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="NCT" name="nct_id" required value={formTrialData.nct_id} onChange={handleChange} />
        <Input label="Title" name="title" required value={formTrialData.title} onChange={handleChange} />
        <Select label="Overall Status" name="overall_status" required value={formTrialData.overall_status} onChange={handleChange}>
          {statusOptions.map((status) => (
            <SelectItem key={status.uid} value={status.name}>
              {status.name}
            </SelectItem>
          ))}
        </Select>

        <Input label="Phase" name="phase" required value={formTrialData.phase} onChange={handleChange} />
        <Input label="Eligibility" name="eligibility" required value={formTrialData.eligibility} onChange={handleChange} />

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

        <Input
          label="Study Type"
          name="study_type"
          required
          value={formTrialData.study_type}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

TrialForm.propTypes = {
  trialObj: PropTypes.shape({
    id: PropTypes.number,
    nct_id: PropTypes.string,
    title: PropTypes.string,
    overall_status: PropTypes.string,
    phase: PropTypes.string,
    eligibility: PropTypes.string,
    study_first_submit_date: PropTypes.string,
    last_update_submit_date: PropTypes.string,
    study_type: PropTypes.string,
  }),
};

export default TrialForm;
