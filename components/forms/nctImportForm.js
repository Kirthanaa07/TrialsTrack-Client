'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { importTrials } from '../../utils/data/trialsData';

const initialState = {
  nctIds: '',
};

const NCTImportForm = ({ onSave }) => {
  const [formNctData, setFormNctData] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormNctData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formNctData.nctIds) {
      const nctIds = formNctData.nctIds.split(';').flatMap(((nct) => nct.trim().split(','))).map((nct) => nct.trim());
      importTrials(nctIds).then(() => {
        if (onSave) onSave(user.id);
      });
    }
  };

  return (
    <>
      <div className="italic">Enter NCT numbers to import from clinicaltrials.gov separated by semicolon ( ; ) or comma ( , )</div>
      <form onSubmit={handleSubmit} id="trial-form" className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 grow">
          <Input label="NCT" name="nctIds" value={formNctData.nctIds} required onChange={handleChange} />
        </div>
      </form>
    </>
  );
};

export default NCTImportForm;
