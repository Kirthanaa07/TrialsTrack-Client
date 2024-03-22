'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import {
  ThemeProvider as NextThemesProvider,
} from 'next-themes';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import { AuthProvider } from '../utils/context/authContext';
import '../styles/globals.css';
import GoogleMapScriptLoader from '../components/GoogleMapScriptLoader';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="flex">
      <head>
        <meta charSet="UTF-8" />
        {/* material icons */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-row grow">
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <AuthProvider>
              <GoogleMapScriptLoader />
              <ViewDirectorBasedOnUserAuthStatus className="flex grow">
                {children}
              </ViewDirectorBasedOnUserAuthStatus>
            </AuthProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
RootLayout.propTypes = {
  children: React.ReactNode,
};
RootLayout.defaultProps = {
  children: {},
};
