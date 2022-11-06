import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks';
import Cards from './cards';
import { AppProps } from '../types';


const ConversationListPage = ({ socket }: AppProps) => {
  const user = useAppSelector(state => state.user);
  useEffect(() => {
    socket?.emit('join', user.id);
  }, [])

  return (
    <>
      <div id="hero">
        <Container className="pt-5 pb-5 ">
          <Cards socket={socket!} />
        </Container>
      </div>
    </>
  );
};

export default ConversationListPage;
