import React, { useState, useEffect } from 'react';
import './../index.css';
import UserList from './list';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="flex flex-col w-full px-8 py-16">
      <div className="self-end">
            <Link to="/home" className="text-sm font-semibold leading-6 text-gray-900">
              <span aria-hidden="true">&larr;</span> Home 
            </Link>
        </div>
        <p>Users</p>
        <UserList users={users} />
    </div>
  );
};

export default Users;
