import React, { useState, useEffect } from 'react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      fetchUserProfile(token);
      setIsLoggedIn(true);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setUserProfile(data);
    } catch (err) {
      setError('Error fetching profile');
    }
  };

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
      fetchUserProfile(data.jwt); 
      setIsLoggedIn(true);
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
      fetchUserProfile(data.jwt);
      setIsLoggedIn(true); 
      alert('Login Successful!');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg mt-10 border border-gray-500">
        <img src="/images/logo3.webp" className="w-30 h-20 mr-10 ml-4" />


        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {isLoggedIn ? (
          <div>
            <h2 className="text-center text-xl font-bold">Bonjour, {userProfile?.username}</h2>
            <p className="text-center"> {userProfile?.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-2 bg-black text-white rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (


          <div>
            {isRegister ? (
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-black rounded-md mb-4"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-black rounded-md mb-4"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-black rounded-md mb-4"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-black text-white rounded-md"
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
                  className="w-full px-4 py-2 border border-black rounded-md mb-4"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-black rounded-md mb-4"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-black text-white rounded-md"
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
        )}
      </div>
    </div>
  );
};

export default Login;
