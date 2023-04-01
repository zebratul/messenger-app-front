import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Login({ setUserName }) {
    const [name, setName] = useState('');

    const handleNameSubmit = (event) => {
        event.preventDefault();
        setUserName(name);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleNameSubmit(event);
        }
    };

    return (
        <Form>
            <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyDown}
                    className="form-control-lg mb-3"
                />
            </Form.Group>
            <Button variant="primary" onClick={handleNameSubmit} className="btn-lg">
                Submit
            </Button>
        </Form>
    );
}

export default Login;
