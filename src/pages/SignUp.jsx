import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple validation to check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true); // Start loading
  
    try {
      // Use Axios to call the backend API for sign-up
      const response = await axios.post('/api/signup', {  // Use the relative path here
        email,
        password,
        role,
      });

      if (response.status === 201) {
        alert(`Signed up as ${role}`);

        // Save the JWT token in localStorage
        localStorage.setItem('token', response.data.token);

        navigate('/login'); // Redirect to login page
      } else {
        alert(response.data.message || 'Error during sign-up');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-purple">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center mt-10 mb-8">
        <img src="./PointlyLogoWhite.png" alt="Company Logo" className="w-[200px] h-auto mb-4" />
        <h1 className="text-4xl font-bold text-white font-cabin">Welcome to Pointly</h1>
        <p className="mt-2 text-xl font-cabin text-white italic font-cabin">"Points Simplified"</p>
      </header>

      {/* Sign-Up Form */}
      <div className="p-6 bg-white shadow-md rounded-lg max-w-xl w-full mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center font-cabin">Sign Up</h2>
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
          <div className="w-full mb-4">
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

          {/* Confirm Password Input */}
          <div className="w-full mb-6">
            <label className="block text-lg text-gray-700 text-center font-cabin" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center"
              placeholder="Confirm your password"
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
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Signing Up...' : 'Sign Up'} {/* Display loading text */}
          </button>

          {/* Loading Spinner (Optional) */}
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          )}

          {/* Link to Login Page */}
          <p className="mt-4 text-center font-cabin">
            Already have an account?{' '}
            <a href="/login" className="text-purple">Log in here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;