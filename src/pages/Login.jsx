import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('/api/login', { email, password, role });

      if (response.status === 200) {
        console.log('Login successful');
        alert('Login successful');

        // Save JWT and user info to sessionStorage
        const { token, redirectPath, userId } = response.data;
        sessionStorage.setItem('authToken', token); // Store JWT in sessionStorage
        sessionStorage.setItem('userRole', role); // Store role in sessionStorage
        sessionStorage.setItem('userId', userId); // Store userId in sessionStorage

        // Redirect to the backend-specified path
        console.log('Redirecting to:', redirectPath);
        navigate(redirectPath);
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-purple font-cabin">
      <header className="flex flex-col items-center text-center mt-10 mb-8">
        <img src="./PointlyLogoWhite.png" alt="Company Logo" className="w-[200px] h-auto mb-4" />
        <h1 className="text-4xl font-bold text-white">Welcome to Pointly</h1>
        <p className="mt-2 text-xl font-bold text-white italic">"Points Simplified"</p>
      </header>

      <div className="p-6 bg-white shadow-md rounded-lg max-w-xl w-full mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
          <div className="w-full mb-4">
            <label className="block text-lg text-gray-700 text-center font-cabin" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="w-full mb-6">
            <label className="block text-lg text-gray-700 text-center font-cabin" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-lg text-gray-700 text-center font-cabin" htmlFor="role">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center font-cabin"
              required
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gold-dark text-white font-semibold rounded-lg hover:bg-purple-dark transition-colors"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {loading && (
            <div className="flex justify-center mt-4">
              <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          )}

          <p className="mt-4 text-center font-cabin">
            Don't have an account?{" "}
            <a href="/" className="text-purple">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
