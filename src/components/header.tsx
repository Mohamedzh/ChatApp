import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../lib/functions';
import ConversationForm from './newConversationForm';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket
}

const Header = ({ socket }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Nav className="ms-auto">
              <Nav.Link as="p"><Link to="/chat">Main Chat</Link></Nav.Link>
              <Nav.Link as="p"><Link to="/conversations">Group Chats</Link></Nav.Link>
              <NavDropdown title="Actions" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => handleShow()}>New conversation</NavDropdown.Item>

                <ConversationForm show={show} handleClose={handleClose} handleShow={handleShow} />

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => signOut(navigate)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
