import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Logo and 3-liner Description */}
      <section
        className="snap-start h-screen flex flex-col items-center justify-center text-white"
        style={{ backgroundColor: '#012130' }} // Apply the background color here
      >
        {/* Logo Container */}
        <div className="text-center mb-20"> {/* Reduced margin-bottom (mb-8) to move the logo up */}
          <div className="flex justify-center mb-10"> {/* Adjusted margin-bottom (mb-4) */}
            <Image
              src="/logo-actual.png" // Replace with your logo path
              alt="CareerCraft Logo"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to CareerCraft</h1>
          <p className="text-lg">
            Your Roadmap to Career Success Starts Here!
          </p>
          <p className="text-lg">
            Upload your resume, find the right skills, and get tailored course suggestions to match your dream job.
          </p>
          <p className="text-lg">
            CareerCraft makes career growth effortless!
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section
        className="snap-start h-screen flex flex-col items-center justify-center text-black"
        style={{ backgroundColor: '#DAFFFF' }} // Apply the background color here
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            At CareerCraft, we help you bridge the gap between where you are and where you want to be in your career. Our platform provides personalized guidance, expert connections, and skill-building resources to ensure you're fully prepared for your dream job.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">📚 Personalized Course Recommendations</h3>
              <p className="text-gray-700">
                Upload your resume and job details, and we’ll suggest the right courses to enhance your skills and boost your job readiness.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">🤝 1-on-1 Mentorship Sessions</h3>
              <p className="text-gray-700">
                Connect with professionals already in your target field, gain real-world insights, and decide if the job truly aligns with your goals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">🎤 Mock Interviews</h3>
              <p className="text-gray-700">
                Ace your interviews with practice sessions, valuable feedback, and confidence-building techniques to help you stand out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="snap-start h-screen flex flex-col items-center justify-center text-black"
        style={{ backgroundColor: '#DAFFFF' }} // Apply the background color here
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            CareerCraft makes your job search smarter and more efficient. Follow these three simple steps to unlock your full potential and land your dream job.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1️⃣ Upload & Explore</h3>
              <p className="text-gray-700">
                Upload your resume and enter job details—either a job link, a document, or a description—to let our system analyze the requirements.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">2️⃣ Get Personalized Insights</h3>
              <p className="text-gray-700">
                Receive personalized course recommendations to enhance your skills, book expert mentorship sessions, and prepare with mock interviews.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">3️⃣ Apply with Confidence</h3>
              <p className="text-gray-700">
                Strengthen your profile, refine your interview skills, and step into job applications fully prepared to impress employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        className="snap-start h-screen flex flex-col items-center justify-center text-black"
        style={{ backgroundColor: '#DAFFFF' }} // Apply the background color here
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            🌟 Empowering Careers, One Step at a Time
          </p>
          <p className="text-gray-700">
            At CareerCraft, we believe that landing your dream job isn’t just about applying—it’s about being the right fit. Our platform bridges the gap between your skills and your aspirations by providing tailored course recommendations, expert mentorship, and real-world interview practice.
          </p>
          <p className="text-gray-700">
            Whether you're exploring new opportunities, upskilling for a competitive edge, or preparing for interviews, CareerCraft is here to guide you every step of the way. We’re committed to helping you make informed career choices and confidently step into your future.
          </p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            🚀 Your career journey starts here!
          </p>
        </div>
      </section>
    </div>
  );
}