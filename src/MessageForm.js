import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const serverUrl = 'https://backend-task5.osc-fr1.scalingo.io';

const MessageForm = ({ userName }) => {
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userName, recipient, title, body);
    try {
      await axios.post(`${serverUrl}/messages`, {
        sender_name: userName,
        recipient_name: recipient,
        title,
        body,
      });
      setRecipient('');
      setTitle('');
      setBody('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecipientChange = (event, { newValue }) => {
    setRecipient(newValue);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const getSuggestions = async (value) => {
    try {
        const response = await axios.get(`${serverUrl}/suggestions/${value}`);
      const uniqueSuggestions = [...new Set(response.data.data)];
        return uniqueSuggestions;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setRecipient(suggestionValue);
  };

  const renderSuggestion = (suggestion) => (
    <div className="autocomplete-option">{suggestion}</div>
  );
  

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mb-5">
        <Form.Group controlId="recipient">
          <Form.Label>Recipient</Form.Label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={renderSuggestion}
            inputProps={{
              value: recipient,
              onChange: handleRecipientChange,
              className: 'form-control-lg',
            }}
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            className="form-control-lg"
          />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter message"
            value={body}
            onChange={handleBodyChange}
            className="form-control-lg"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-lg mt-3">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default MessageForm;
