import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from './functions';
import ConversationForm from './NewConversationForm';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../redux/hooks';

type Props = {
  socket:Socket
}

const Header = ({socket}:Props) => {
  const user = useAppSelector(state => state.user);
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
              <Nav.Link><Link to="/chat">Main Chat</Link></Nav.Link>
              <Nav.Link><Link to="/conversations">Group Chats</Link></Nav.Link>
              <NavDropdown title="Actions" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => handleShow()}>New conversation</NavDropdown.Item>

                <ConversationForm show={show} handleClose={handleClose} handleShow={handleShow}  />

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
