import { Container } from 'react-bootstrap'
import { useAppSelector } from '../redux/hooks'
import Cards from './Cards'

type Props = {}

const Conversationlistpage = (props: Props) => {
  const loggedIn = useAppSelector(state => state.loggedIn)

  return (
    <>
    <div id="hero">
      <Container className="pt-5 pb-5 ">
        <Cards />
        
      </Container>
    </div>
  </>
  )
}

export default Conversationlistpage
