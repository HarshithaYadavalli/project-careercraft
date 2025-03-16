import React from 'react';
import Header from '../components/StudentHeader';
import Footer from '../components/Footer';

export default function StudentDashboard() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8">
        {/* Box 1 */}
        <div className="mx-auto max-w-4xl mb-6">
          <a href="/mandatory">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-black">Mandatory Courses</h2>
              <p className="text-gray-700 mt-2">Checkout what progress you made for Mandatory Courses.</p>
            </div>
          </a>
        </div>

        {/* Box 2 */}
        <div className="mx-auto max-w-4xl mb-6">
          <a href="#">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-black">Add-On Courses</h2>
              <p className="text-gray-700 mt-2">Checkout what progress you made for Add-On Courses.</p>
            </div>
          </a>
        </div>

        {/* Box 3 */}
        <div className="mx-auto max-w-4xl mb-6">
          <a href="#">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-black">Mock Interviews</h2>
              <p className="text-gray-700 mt-2">Checkout your past and upcoming Mock Interview Schedules</p>
            </div>
          </a>
        </div>

        {/* Box 4 */}
        <div className="mx-auto max-w-4xl mb-6">
          <a href="#">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-black">Know Your Progress</h2>
              <p className="text-gray-700 mt-2">Checkout you how far you are from your dream Job.</p>
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}