'use client';

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import { Button } from '@nextui-org/react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Trials Track</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex flex-grow-1 flex-row justify-content-between">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <div className="d-flex flex-row gap-2">
              <Link passHref href="/">
                <Nav.Link>Trials</Nav.Link>
              </Link>
              <Link passHref href="/locations">
                <Nav.Link>Locations</Nav.Link>
              </Link>
              <Link passHref href="/trials/new">
                <Nav.Link>Create a Trial</Nav.Link>
              </Link>
              <Link passHref href="/locations/new">
                <Nav.Link>Create a Location</Nav.Link>
              </Link>
            </div>
            <div className="d-flex flex-row gap-2">
              <Navbar.Text>{user.fbUser.displayName}</Navbar.Text>
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
