import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function AddGoalModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Goal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formGoalDescription">
        <Form.Label>Short Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGoalDescription">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter Category" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGoalFrequency">
        <Form.Label>I want to complete this goal</Form.Label>
        <Form.Control type="number" />
        <Form.Label>times every</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGoalFrequency">
      <div key="inline-radio" className="mb-3">
          <Form.Check
            inline
            label="Day"
            name="group1"
            type="radio"
            id="inline-radio-day"
          />
          <Form.Check
            inline
            label="Week"
            name="group1"
            type="radio"
            id="inline-radio-week"
          />
          <Form.Check
            inline
            label="Month"
            name="group1"
            type="radio"
            id="inline-radio-month"
          />
        </div>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Goal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}