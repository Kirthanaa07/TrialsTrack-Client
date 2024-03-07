'use client';

import { Spinner } from '@nextui-org/react';
import React from 'react';

export default function Loading() {
  return (
    <div className="text-center mt-5 flex grow items-center justify-center">
      <Spinner
        color="#00BF67"
      />
    </div>
  );
}
