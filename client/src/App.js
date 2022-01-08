import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import UsersTable from './components/UsersTable';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/getUsers').then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post('http://localhost:3001/createUser', {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  const deleteUser = (id) => {
    const updatedUser = [...listOfUsers].filter((user) => user._id != id);
    console.log('DELETE USER');
  };

  const editUser = (id) => {
    const editedUser = [...listOfUsers].filter((user) => user._id != id);
    console.log('EDIT USER');
  };

  return (
    <div className='App'>
      {/* <UsersTable></UsersTable> */}
      <div className='usersDisplay'>
        {listOfUsers.map((user) => {
          return (
            <div key={user._id}>
              <h1>
                Name: {user.name}, Age: {user.age}, Username: {user.username}
                <button onClick={() => editUser(user._id)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </h1>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type='text'
          placeholder='Name...'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type='number'
          placeholder='Age...'
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Username...'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

export default App;
