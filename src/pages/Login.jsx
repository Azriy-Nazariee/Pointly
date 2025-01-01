import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login successful');
  
        // Redirect based on the role
        if (role === 'user') {
          navigate('/home'); // Redirect to user home
        } else if (role === 'vendor') {
          navigate('/vendor-home'); // Redirect to vendor home
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again later.');
    }
  };  

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-purple">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center mt-10 mb-8">
        <img src="./PointlyLogoWhite.png" alt="Company Logo" className="w-[200px] h-auto mb-4" />
        <h1 className="text-4xl font-bold text-white">Welcome to Pointly</h1>
        <p className="mt-2 text-xl font-bold text-white italic">"Points Simplified"</p>
      </header>

      {/* Login Form */}
      <div className="p-6 bg-white shadow-md rounded-lg max-w-xl w-full mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Role Selection - Dropdown */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-gold-dark text-white font-semibold rounded-lg hover:bg-purple-dark transition-colors"
          >
            Log In
          </button>

          {/* Link to Sign-Up Page */}
          <p className="mt-4 text-center font-cabin font-cabin">
            Don't have an account?{" "}
            <a href="/" className="text-purple">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
