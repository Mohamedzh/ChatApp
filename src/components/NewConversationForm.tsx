import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Card, Modal, Form, Button, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getUsers, newConversation } from '../api';
import { clearChatUsers, getChatUsers, getUserNames } from '../redux/features/chatUsersSlice';
import { useAppSelector } from '../redux/hooks';
import * as Yup from 'yup';
import { getAllUsers } from '../redux/features/allUsersSlice';


type Props = {
  show: boolean
  handleShow: () => void
  handleClose: () => void
};

function ConversationForm({ show, handleClose, handleShow }: Props) {

  const users = useAppSelector(state => state.allUsers)
  const userIds = useAppSelector(state => state.chatUsers.new)
  const id = useAppSelector(state => state.user.id)
  const userNames = useAppSelector(state => state.chatUsers.userNames)

  const dispatch = useDispatch()
  useEffect(() => {
    getUsers(dispatch, id)
  }, [])

  //  useEffect(() => { 
  //   setUsers(users)
  //  }, [users])

  // const [currentUsers, setUsers] = useState<User[]>([])
  const formik = useFormik({
    initialValues: {
      title: ''
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        userIds,
        title: values.title,
        id
      }
      const currentUserToken = localStorage.getItem('token') || '';

      newConversation(currentUserToken, data)
      dispatch(clearChatUsers())
      getUsers(dispatch, id)
      formik.resetForm();
      handleClose();
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Please enter a title'),
    }),
  });


  const addUser = (id: number, name: string) => {
    dispatch(getChatUsers(id))
    console.log(userIds)
    dispatch(getUserNames(name))
    let newUsers = users.filter(user => user.id !== id)
    dispatch(getAllUsers(newUsers))
  }

  const closeModal = () => {
    dispatch(clearChatUsers());
    getUsers(dispatch, id)
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={() => handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userNames.map((name, idx) =>
            <Badge key={idx} pill bg="primary">
              {name}
            </Badge>)}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                name="title"
                placeholder="Family, friends..etc"
                autoFocus
              />
              {formik.touched.title && formik.errors.title ? (
                <span className="errorText">{formik.errors.title}</span>
              ) : null}
            </Form.Group>
            {users.map(user =>
              // <Card key={idx}>
              //   <Card.Body>{user.firstName}</Card.Body>
              // </Card>
              <div key={user.id} className="d-grid gap-2 m-2">
                <Button variant="outline-primary" size="lg" active={true} onClick={() => addUser(user.id!, user.firstName)}>
                  {user.firstName}
                </Button>
              </div>

            )}

            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => formik.handleSubmit()}>
            Create
          </Button>
          <Button variant="outline-secondary" onClick={() => closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConversationForm