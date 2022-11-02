import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from './features/UsersSlice';
import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const arr = ['s', 'd'];
  console.log(typeof arr);
  const dispatch = useDispatch();
  //selector goes to the store and access the reducer
  const userList = useSelector((state) => state.users.value);

  useEffect(() => {
    dispatch(fetchUsers());
    setIsLoading(false);
  }, [dispatch]);

  const handleNewUser = () => {
    const newUser = {
      id: userList[userList.length - 1].id + 1,
      name,
      username,
    };
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };
  const handleUpdateUser = (id) => {
    dispatch(updateUser({ id, username: newUsername }));
    // setNewUsername('');
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <div className="addUser">
        <input
          type="text"
          placeholder="name.."
          onChange={(ev) => {
            setName(ev.target.value);
          }}
        />
        <input
          type="text"
          placeholder="username.."
          onChange={(ev) => {
            setUsername(ev.target.value);
          }}
        />
        <button onClick={handleNewUser}>add</button>
      </div>

      <div className="displayUser">
        {userList.map((u) => (
          <div key={u.id}>
            <h3>{u.name}</h3>
            <p>
              username: <strong>{u.username}</strong>
            </p>
            <input
              type="text"
              placeholder="new username.."
              onChange={(ev) => {
                setNewUsername(ev.target.value);
              }}
            />
            <button onClick={() => handleDeleteUser(u.id)}>delete</button>
            <button onClick={() => handleUpdateUser(u.id)}>update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
