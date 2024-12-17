import React, { useState } from 'react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('jwt', data.jwt);
      alert('Registration Successful!');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('jwt', data.jwt);
      alert('Login Successful!');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg w-30 h-20 mt-10 border border-gray-500">

      <img src="/images/logo3.webp" className="w-30 h-20 mr-10 ml-4" />
  

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {isRegister ? (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-500"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegister(true)}
            disabled={isRegister}
            className={`px-4 py-2 mx-2 border border-gray-500 rounded-md ${
              isRegister ? 'bg-gray-500 text-white' : 'text-black'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setIsRegister(false)}
            disabled={!isRegister}
            className={`px-4 py-2 mx-2 border border-gray-500 rounded-md ${
              !isRegister ? 'bg-gray-500 text-white' : 'text-black'
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
