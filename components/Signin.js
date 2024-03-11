'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center flex flex-col justify-center content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '10%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
