import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import StudentHeader from '../components/StudentHeader';
import Footer from '../components/Footer';

export default function DesiredJobCustomisation() {
  const [jobDescription, setJobDescription] = useState('');
  const [jobDescriptionType, setJobDescriptionType] = useState('link'); // 'link', 'doc', 'role'
  const [userType, setUserType] = useState(''); // 'student' or 'professional'
  const [currRole, setCurrentRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate required fields
    if (!jobDescription) {
      setError('Job Description is required.');
      return;
    }

    if (userType === 'professional' && (!currRole || !yearsOfExperience)) {
      setError('Current Role and Years of Experience are required for professionals.');
      return;
    }

    try {
      // Handle file upload if jobDescriptionType is 'doc'
      let jobDescriptionValue = jobDescription;
      if (jobDescriptionType === 'doc') {
        const fileInput = e.target.querySelector('input[type="file"]');
        const file = fileInput?.files[0];

        if (!file) {
          setError('Please select a file to upload.');
          return;
        }

        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('job-documents') // Your bucket name
          .upload(`documents/${file.name}`, file);

        if (uploadError) {
          console.error('File Upload Error:', uploadError);
          setError('Failed to upload document.');
          return;
        }

        // Get the file URL
        const { data: urlData } = supabase
          .storage
          .from('job-documents')
          .getPublicUrl(uploadData.path);

        jobDescriptionValue = urlData.publicUrl;
      }

      // Save data to Supabase
      const { error: insertError } = await supabase
        .from('job_customisation') // Table name
        .insert([{
          job_description: jobDescriptionValue, // Job description (link, doc URL, or role name)
          job_description_type: jobDescriptionType, // 'link', 'doc', or 'role'
          user_type: userType, // 'student' or 'professional'
          curr_role: currRole, // Only for professionals
          years_of_experience: yearsOfExperience, // Only for professionals
        }]);

      if (insertError) {
        console.error('Insert Error:', insertError);
        setError('Failed to save preferences. Please try again.');
        return;
      }

      setMessage('Your preferences have been saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#c2d6d6]">
      {/* Header */}
      <StudentHeader />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-[#76a2a2] text-center">
            Desired Job Customisation
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Job Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[#76a2a2]">
                Job Description
              </label>
              <div className="flex items-center mb-2">
                <button
                  type="button"
                  onClick={() => setJobDescriptionType('link')}
                  className={`mr-2 px-4 py-2 rounded ${
                    jobDescriptionType === 'link'
                      ? 'bg-[#76a2a2] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Link
                </button>
                <button
                  type="button"
                  onClick={() => setJobDescriptionType('doc')}
                  className={`mr-2 px-4 py-2 rounded ${
                    jobDescriptionType === 'doc'
                      ? 'bg-[#76a2a2] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Upload Doc
                </button>
                <button
                  type="button"
                  onClick={() => setJobDescriptionType('role')}
                  className={`px-4 py-2 rounded ${
                    jobDescriptionType === 'role'
                      ? 'bg-[#76a2a2] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Specify Role
                </button>
              </div>
              {jobDescriptionType === 'link' && (
                <input
                  type="url"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter job description link"
                  className="w-full p-2 border rounded"
                  required
                />
              )}
              {jobDescriptionType === 'doc' && (
                <input
                  type="file"
                  onChange={(e) => setJobDescription(e.target.files[0]?.name || '')}
                  className="w-full p-2 border rounded"
                  required
                />
              )}
              {jobDescriptionType === 'role' && (
                <input
                  type="text"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter role name"
                  className="w-full p-2 border rounded"
                  required
                />
              )}
            </div>

            {/* User Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[#76a2a2]">
                Are you a student or professional?
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`mr-2 px-4 py-2 rounded ${
                    userType === 'student'
                      ? 'bg-[#76a2a2] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('professional')}
                  className={`px-4 py-2 rounded ${
                    userType === 'professional'
                      ? 'bg-[#76a2a2] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Professional
                </button>
              </div>
            </div>

            {/* Professional Details */}
            {userType === 'professional' && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-[#76a2a2]">
                  Current Role
                </label>
                <input
                  type="text"
                  value={currRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="Enter your current role"
                  className="w-full p-2 border rounded"
                  required
                />
                <label className="block text-sm font-medium mb-2 mt-4 text-[#76a2a2]">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  placeholder="Enter years of experience"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            {/* Error and Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-500 mb-4">{message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#76a2a2] text-white p-2 rounded hover:bg-[#5c8a8a] transition-all"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}