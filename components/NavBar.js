'use client';

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Button, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const router = useRouter();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarBrand className="m-3"><Image src="/logo.png" className="logo" /></NavbarBrand>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden"
      />
      <NavbarContent justify="center">
        <NavbarItem>
          <Button value="Trials" onClick={() => router.push('/')}>
            Trials
          </Button>
        </NavbarItem>
        {user.role === 'Admin' ? (
          <>
            <NavbarItem>
              <Button onClick={() => router.push('/locations')}>
                Locations
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button onClick={() => router.push('/users')}>
                Users
              </Button>
            </NavbarItem>
          </>
        ) : <></>}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>{user.fbUser.displayName}</NavbarItem>
        <Button color="danger" variant="bordered" onClick={signOut}>
          Sign Out
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
