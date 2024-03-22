'use client';

import React from 'react';
import {
  Button, Card, CardBody, CardHeader, Image,
} from '@nextui-org/react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <div
        className="flex flex-col content-center justify-center text-center"
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
        <Card className="self-stretch min-w-xl">
          <CardHeader className="flex-col items-start px-4 pt-2 pb-0" />
          <CardBody className="py-2 overflow-visible">
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
    </>
  );
}

export default Signin;
