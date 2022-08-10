import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

type Props = {};

const Header = (props: Props) => {
  return (
    <Navbar
      style={{ backgroundColor: '#f8f5f5', color: '#595959' }}
      expand="lg"
    >
      <Container>
        <Navbar>
          <p className="text-black-50 fs-3 ">Chat</p>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
