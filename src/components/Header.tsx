import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

type Props = {};

const Header = (props: Props) => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/login' && (
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
      )}
    </>
  );
};

export default Header;
