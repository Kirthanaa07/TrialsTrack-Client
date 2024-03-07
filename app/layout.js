'use client';

import { NextUIProvider } from '@nextui-org/react';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import { AuthProvider } from '../utils/context/authContext';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark flex">
      <head>
        <meta charSet="UTF-8" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex grow">
        <NextUIProvider className="flex flex-col grow">
          <AuthProvider>
            <ViewDirectorBasedOnUserAuthStatus>
              {children}
            </ViewDirectorBasedOnUserAuthStatus>
          </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
