import React, { useState, useEffect } from 'react';
import App from '../App';

const UsersTable = () => {
  const [user, setUser] = React.useState('');
  const [users, setUsers] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id: new Date().getTime(),
      text: user,
      completed: false,
    };
    setUsers([...users].concat(newUser));
    setUser('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={(e) => {
          setUser(e.target.value);
        }}
        value={user}
      ></input>
      <button type='submit'>Add User</button>
      <button>Edit</button>
      <button>Delete</button>
    </form>
  );
};

export default UsersTable;
