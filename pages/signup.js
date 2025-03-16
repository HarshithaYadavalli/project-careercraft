import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhoneNo] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Sign up with Supabase
      const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        console.error('Signup Error:', signupError);
        setError(signupError.message || 'User creation failed.');
        return;
      }

      if (!user) {
        console.error('No user returned from signup.');
        setError('User creation failed. No user returned.');
        return;
      }

      console.log('User created:', user);

      // Insert user profile into profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: user.id, // Use the user's ID as the primary key
          name: name,
          role: role,
          username: email, 
          phone,
        }]);

      if (profileError) {
        console.error('Profile Insert Error:', profileError);
        setError(profileError.message || 'Failed to create profile.');
        return;
      }

      setMessage('Registration successful! Redirecting to Desired Job Customisation Page...');
      router.push('/desired-job-customisation');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('/intro-bgi.jpg')` }}></div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

          <form onSubmit={handleSignup}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Role Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)} 
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Password Inputs */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-500 mb-4">{message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-3"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}