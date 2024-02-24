import React, { useEffect, useState } from 'react';
// import { useAuth } from '../utils/context/authContext';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getTrials } from '../utils/data/trialsData';
import TrialCard from '../components/TrialCard';

function Home() {
  const [trials, setTrials] = useState([]);
  const router = useRouter();
  // const { user } = useAuth();

  const getAllTrials = () => {
    getTrials().then(setTrials);
  };

  useEffect(() => {
    getAllTrials();
  }, []);

  return (
    <article className="orders p-3">
      <Button
        onClick={() => {
          router.push('/trials/new');
        }}
      >
        Create New Trial
      </Button>
      <h1>Trials</h1>
      <div className="d-flex flex-row justify-content-start gap-2 flex-wrap">
        {trials.map((trial) => (
          <TrialCard key={`trial--${trial.id}`} trialObj={trial} onUpdate={getAllTrials} />
        ))}
      </div>
    </article>
  );
}

export default Home;
