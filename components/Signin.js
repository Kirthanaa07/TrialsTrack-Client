'use client';

import React from 'react';
import {
  Button, Card, CardBody, CardHeader, Image,
} from '@nextui-org/react';
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
      <Card className="min-w-xl self-stretch">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="BackEnd capstone"
            className="object-cover rounded-xl"
            src="/TRIALS_TRACK.png"
            width={500}
          />
        </CardBody>
      </Card>
      <Button type="button" size="lg" className="bg-[#5190b4]" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
