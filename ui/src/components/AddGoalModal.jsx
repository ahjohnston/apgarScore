import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export function AddGoalModal() {
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState({});
    const [category, setCategory] = useState({});
    const [freqUnit, setFreqUnit] = useState({});
    const [freqCadence, setFreqCadence] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/goals/view',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(function (response) {
            console.log('response', response);
        }).catch(function (error) {
            console.log('error', error);
        });
        setShow(true)};
    const handleSubmit = () => {
        const data = {
            goalName: description,
            frequency: freqCadence,
            min_progress_events: freqUnit,
            category: category,
            active: true
        }
        console.log('sending post request', data)
        axios({
            method: 'post',
            url: `http://localhost:8080/goals/add?goalName=${description}&frequency=${freqCadence}&min_progress_events=${freqUnit}&category=${category}&active=${true}`,
            // data: data,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(function (response) {
            console.log('response', response);
            handleClose()
        }).catch(function (error) {
            console.log('error', error);
        });
    }

    return (
        <>
            <Button variant="primary"
                onClick={handleShow}>
                Add Goal
            </Button>

            <Modal show={show}
                onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGoalDescription">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description"
                                onChange={
                                    (e) => setDescription(e.target.value)
                                }/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGoalDescription">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category"
                                onChange={
                                    (e) => setCategory(e.target.value)
                                }/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGoalFrequency">
                            <Form.Label>I want to complete this goal</Form.Label>
                            <Form.Control type="number"
                                onChange={
                                    (e) => setFreqUnit(e.target.value)
                                }/>
                            <Form.Label>times every</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGoalFrequency">
                            <div key="inline-radio" className="mb-3">
                                <Form.Check inline label="Day" name="group1" type="radio" id="inline-radio-day"
                                    onClick={
                                        () => setFreqCadence('daily')
                                    }/>
                                <Form.Check inline label="Week" name="group1" type="radio" id="inline-radio-week"
                                    onClick={
                                        () => setFreqCadence('weekly')
                                    }/>
                                <Form.Check inline label="Month" name="group1" type="radio" id="inline-radio-month"
                                    onClick={
                                        () => setFreqCadence('monthly')
                                    }/>
                            </div>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit"
                        onClick={handleSubmit}>
                        Save Goal
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
