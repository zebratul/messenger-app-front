import React, { useState } from 'react';
import Login from './Login';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userName, setUserName] = useState('');

  return (
    <div className="container mt-4">
      <h1 className="mb-5 text-center">Message App</h1>
      {userName && (
        <h3 className="mb-5 text-center">
            Welcome, {userName}. Write or view your messages.{' '}
            <a href="#" onClick={() => setUserName('')}>
            Log out
            </a>
        </h3>

      )}
      {!userName ? (
        <Login setUserName={setUserName} />
      ) : (
        <>
          <MessageForm userName={userName} />
          <MessageList userName={userName} />
        </>
      )}
    </div>
  );
}

export default App;
