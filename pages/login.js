import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Sign in with Supabase
    const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError('Invalid email or password');
    } else {
      // Fetch user profile from profiles table using the user's ID
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, role')
        .eq('id', user.id) // Use 'id' instead of 'user_id'
        .maybeSingle();

      if (profileError) {
        setError('Error fetching user profile');
      } else {
        // Redirect based on the user's role
        if (profile.role === 'student') {
          router.push('/student-dashboard');
        } else {
          router.push('/mentor-dashboard');
        }
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        throw error;
      }

      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
      setError('Failed to log in with Google. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('/intro-bgi.jpg')` }}></div>

      {/* Right Side: Login Box */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 pl-10 border rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">📧</span>
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 pl-10 border rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">🔒</span>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all"
            >
              Log In
            </button>
          </form>

          {/* Google Login Button */}
          {/* <center><p className='mb-5'>Or</p></center>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-white border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition-all w-full"
          >
            <Image
              src="/google.png"
              alt="Google"
              width={100}
              height={20}
              className="w-5 h-5"
            />
            <span className="ml-2 text-sm">Sign in with Google</span>
          </button> */}

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}