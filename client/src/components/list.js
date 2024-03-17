import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './../index.css';

const UserList = ({ users }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users.map((user) => (
        <li key={user.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-md font-semibold leading-6 text-gray-900">{user.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <Link to={`/users/${user.id}`} className="text-sm leading-6 text-gray-900 border-gray-700 border-solid border-2 rounded-xl px-4 py-2">
              Edit User
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
