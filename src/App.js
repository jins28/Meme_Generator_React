import React from 'react'
import Header from './Header'
import Form from './Form'
import './styles.css'

function App() {
  return (
    <div className="header">
      <Header />
      <div className="main-container">
        <Form />
      </div>
    </div>
  );
}

export default App;
