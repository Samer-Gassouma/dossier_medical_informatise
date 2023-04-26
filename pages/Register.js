import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [cin, setCin] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Msg, setMsg] = useState('');
  const handleCinChange = (event) => {
    setCin(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      cin,
      FirstName,
      LastName,
      Phone,
    }
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401) {
          setMsg('User already exists');
        }
        if (res.status == 500) {
          setMsg('Creating a user failed!');
        }
        if (res.status === 200) {
          setMsg("User created successfully");
          res.json()
          setCin('');
          setFirstName('');
          setLastName('');
          setPhone('');
        }
        
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });


  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-4xl font-extrabold text-white text-center">Create an account</h2>
        <p className="mt-2 text-lg text-gray-400 text-center">
          Or{' '}
          <Link href="/Login">
            <span className="text-blue-400">sign in to your account</span>
          </Link>
        </p>
      </div>
      <div className='text-center text-red-500'>{Msg}</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-400">
                CIN
              </label>
              <div className="mt-1">
                <input
                  id="cin"
                  name="cin"
                  type="text"
                  autoComplete="cin"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:placeholder-gray-500 sm:text-sm"
                  value={cin}
                  onChange={handleCinChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="FirstName" className="block text-lg font-medium text-gray-400">
                FirstName
              </label>
              <div className="mt-1">
                <input
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  autoComplete="current-FirstName"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:placeholder-gray-500 sm:text-sm"
                  value={FirstName}
                  onChange={handleFirstNameChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="LastName" className="block text-lg font-medium text-gray-400">
                LastName
              </label>
              <div className="mt-1">
                <input
                  id="LastName"
                  name="LastName"
                  type="text"
                  autoComplete="LastName"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:placeholder-gray-500 sm:text-sm"
                  value={LastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="Phone" className="block text-lg font-medium text-gray-400">
              Phone
              </label>
              <div className="mt-1">
                <input
                  id="Phone"
                  name="Phone"
                  type="tel"
                  autoComplete="Phone"
                  pattern="[0-9]{8}"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:placeholder-gray-500 sm:text-sm"
                  value={Phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
