'use client';

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Button, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <Navbar maxWidth="full" position="sticky" className="p-4">
      <NavbarBrand className="m-3"><Image src={theme === 'dark' ? '/logo_dark_theme.png' : '/logo_light_theme.png'} className="logo" /></NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Button onClick={() => router.push('/')}>
            Trials
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button onClick={() => router.push('/users')}>
            Users (Researchers + Patients)
          </Button>
        </NavbarItem>
        {user.role === 'Admin' ? (
          <NavbarItem>
            <Button onClick={() => router.push('/locations')}>
              Locations
            </Button>
          </NavbarItem>
        ) : <></>}
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="flex gap-2 mr-8">
          <Button isIconOnly color="warning" variant="faded" className="material-symbols-outlined" onClick={() => setTheme('light')}>light_mode</Button>
          <Button isIconOnly color="secondary" variant="faded" className="material-symbols-outlined" onClick={() => setTheme('dark')}>dark_mode</Button>
        </div>
        <NavbarItem>
          <div className="flex flex-col">
            <span className="font-bold">{user.fbUser.displayName}</span>
            <span className="italic">{user.role}</span>
          </div>
        </NavbarItem>
        <Button
          color="danger"
          variant="bordered"
          className="font-bold"
          onClick={() => {
            router.push('/');
            signOut();
          }}
        >
          Sign Out
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
