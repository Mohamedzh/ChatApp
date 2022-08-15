import { Container } from 'react-bootstrap';
import Chatbox from './Chatbox';

type Props = {};
const Chatpage = (props: Props) => {
  // const loggedIn = useAppSelector(state => state.loggedIn)

  return (

    <div>

      <>
        <div id="hero">
          <Container className="p-3">
            <Chatbox />
          </Container>
        </div>
      </>
    </div>
  );
};

export default Chatpage;
