import { useRouter } from 'next/router'; // Import the useRouter hook
import Header from '../components/Intro-Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component

export default function Bookings() {
  const router = useRouter(); // Initialize the router

  // Function to handle "Book a Session Now" button click
  const handleBookSession = () => {
    router.push('/sessions'); // Redirect to the sessions page
  };

  // Function to handle "Attempt Now" button click
  const handleMockInterview = () => {
    router.push('/mock-interview'); // Redirect to the mock-interview page
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#DAFFFF' }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-black py-12">
        {/* Section 1: Book a Session */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Not sure if this is the right job for you?
          </h2>
          <p className="text-lg mb-6">
            Talk to an industry individual before deciding!
          </p>
          <button
            className="px-8 py-4 rounded-lg text-xl font-semibold border-4 border-[#012130] text-[#012130] hover:bg-[#012130] hover:text-white transition-all duration-300"
            onClick={handleBookSession} // Add onClick handler
          >
            <span className="underline">Book a Session Now</span>
          </button>
        </div>

        {/* Section 2: Mock Interview */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            All prepared for the interview?
          </h2>
          <p className="text-lg mb-6">
            Boost your confidence with a mock interview!
          </p>
          <button
            className="px-8 py-4 rounded-lg text-xl font-semibold border-4 border-[#012130] text-[#012130] hover:bg-[#012130] hover:text-white transition-all duration-300"
            onClick={handleMockInterview} // Add onClick handler
          >
            <span className="underline">Attempt Now</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}