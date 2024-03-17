import React, { useState } from 'react';
import './../index.css';
import { Link } from 'react-router-dom';

const CreateUser = () => {
  const [values, setValues] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Math.floor(Math.random() * 1000); // Generate a random integer between 0 and 999
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, ...values }), // Include generated ID in the request body
      });
      if (response.ok) {
        alert('User created successfully!');
        window.location.href='/users';
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the user.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="justify-end self-end">
            <Link to="/home" className="text-sm font-semibold leading-6 text-gray-900">
              Home <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a User
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div>
              <div className="flex items-center justify-between">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                  </label>
                </div>
                
                <div className="mt-2">
                  <input
                    id="name"
                    type="text" 
                    name="name" 
                    value={values.name || ''} 
                    onChange={handleChange} 
                    placeholder="Name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email Address
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email" 
                    name="email" 
                    value={values.email || ''} 
                    onChange={handleChange} 
                    placeholder="Email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create User
                </button>
              </div>
            </form>

          </div>
        </div>
  );
};

export default CreateUser;

  
