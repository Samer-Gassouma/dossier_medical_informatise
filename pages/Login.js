import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from "js-cookie";

function Login() {
    
    const [Cin, setCin] = useState('');
    const [msg, setMsg] = useState('');

    const handleCinChange = (event) => setCin(event.target.value);
    const handleSubmit = (event) => {
        event.preventDefault();
        setMsg('Loading...');
        axios.post('/api/login', { Cin })   
        .then((res) => {
            if (res.data.length > 0) {
                setMsg('Login Success');
            } else {
                setMsg('Login Failed');
            }
            if(res.status === 200){
                setMsg('Login Success');
                window.location.href = "/";
                sessionStorage.setItem("user", JSON.stringify(res.data));
                Cookies.set("token", JSON.stringify(res.data), { expires: 0.5 });
                Cookies.set("Cin",Cin);
                
            }else{
                setMsg('Login Failed');
            }
        })
  };
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center sm:py-12 sm:px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="text-4xl font-extrabold text-white text-center">Hey again,Login</h2>
    <p className="mt-2 text-lg text-gray-400 text-center">
      Or{' '}
      <Link href="/Register">
        <span className="text-blue-400">Create an account</span>
      </Link>
    </p>
  </div>
  <div className='text-center text-red-500'>{msg}</div>
  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-400">
            CIN
          </label>
          <div className="mt-1">
            <input
              id="Cin"
              name="Cin"
              type="text"
              autoComplete="Cin"
              placeholder='Your CIN'
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:placeholder-gray-500 sm:text-sm"
              value={Cin}
              onChange={handleCinChange}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:text-sm"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}

export default Login;
