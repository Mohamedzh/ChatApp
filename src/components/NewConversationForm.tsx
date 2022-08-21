import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Card, Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getUsers, newConversation } from '../api';
import { clearChatUsers, getChatUsers } from '../redux/features/chatUsersSlice';
import { useAppSelector } from '../redux/hooks';
import * as Yup from 'yup';


type Props = {
  show: boolean
  handleShow: () => void
  handleClose: () => void
};

function ConversationForm({ show, handleClose, handleShow }: Props) {

  const users = useAppSelector(state => state.allUsers)
  const userIds = useAppSelector(state => state.chatUsers.new)
  const id = useAppSelector(state => state.user.id)

  const dispatch = useDispatch()
  useEffect(() => { getUsers(dispatch) }, [])

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
      formik.resetForm();
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Please enter a title'),
    }),
  });


  const addUser = (id: number) => {
    dispatch(getChatUsers(id))
    console.log(userIds)
  }

  const closeModal = () => {
    dispatch(clearChatUsers());
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={() => handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <Button variant="outline-primary" size="lg" active={true} onClick={() => addUser(user.id!)}>
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