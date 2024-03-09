'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
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

  const router = useRouter();
  const { user } = useAuth();

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
        study_type: trialObj.study_type,
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
        brief_title: formTrialData.brief_title,
        detail_description: formTrialData.detail_description,
        brief_summary: formTrialData.brief_summary,
        lead_sponsor_name: formTrialData.lead_sponsor_name,
        study_type: formTrialData.study_type,
        overall_status: formTrialData.overall_status,
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
      };
      updateTrial(update).then(() => router.push('/'));
    } else {
      const trial = {
        nct_id: formTrialData.nct_id,
        title: formTrialData.title,
        brief_title: formTrialData.brief_title,
        detail_description: formTrialData.detail_description,
        brief_summary: formTrialData.brief_summary,
        lead_sponsor_name: formTrialData.lead_sponsor_name,
        study_type: formTrialData.study_type,
        overall_status: formTrialData.overall_status,
        phase: formTrialData.phase,
        eligibility: formTrialData.eligibility,
        study_first_submit_date: formTrialData.study_first_submit_date,
        last_update_submit_date: formTrialData.last_update_submit_date,
        imported_date: new Date(),
      };
      createTrial(trial).then(() => router.push('/'));
    }
    if (onSave) onSave();
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="trial-form" className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 grow">
          <Input label="NCT" name="nct_id" required value={formTrialData.nct_id} onChange={handleChange} />
          <Input label="Title" name="title" required value={formTrialData.title} onChange={handleChange} />
          <Select label="Overall Status" name="overall_status" required value={formTrialData.overall_status} onChange={handleChange}>
            {statusOptions.map((status) => (
              <SelectItem key={status.uid} value={status.name}>
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
          <Select label="Study Type" name="study_type" required value={formTrialData.study_type} onChange={handleChange}>
            {studyTypeOptions.map((studyType) => (
              <SelectItem key={studyType.id} value={studyType.name}>
                {studyType.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </form>
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
};

export default TrialForm;
