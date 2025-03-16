import { useState } from 'react';
import Header from '../components/Intro-Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component
import Slider from 'react-slick'; // Import the carousel library
import 'slick-carousel/slick/slick.css'; // Carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Carousel theme styles

// Custom Arrow Components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

export default function Sessions() {
  const [showFieldModal, setShowFieldModal] = useState(true); // State for field selection modal
  const [selectedField, setSelectedField] = useState(null); // State for selected field
  const [professionals, setProfessionals] = useState([]); // State for professionals data

  // Dummy data for professionals (replace with API call)
  const professionalsData = {
    'Software Engineering': [
      {
        id: 1,
        name: 'John Doe',
        occupation: 'Senior Software Engineer',
        company: 'Tech Corp',
        description: 'Expert in full-stack development and cloud computing.',
        rating: 4.5,
        image: '/images/john-doe.jpg', // Replace with actual image path
        timeSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
      },
      {
        id: 2,
        name: 'Jane Smith',
        occupation: 'Frontend Developer',
        company: 'Web Solutions',
        description: 'Specializes in React and UI/UX design.',
        rating: 4.8,
        image: '/images/jane-smith.jpg', // Replace with actual image path
        timeSlots: ['11:00 AM', '3:00 PM'],
      },
    ],
    'Data Science': [
      {
        id: 3,
        name: 'Alice Johnson',
        occupation: 'Data Scientist',
        company: 'Data Insights',
        description: 'Expert in machine learning and data visualization.',
        rating: 4.7,
        image: '/images/alice-johnson.jpg', // Replace with actual image path
        timeSlots: ['9:00 AM', '1:00 PM'],
      },
      {
        id: 4,
        name: 'John Doe',
        occupation: 'Data Science',
        company: 'Tech Corp',
        description: 'Expert in full-stack development and cloud computing.',
        rating: 4.5,
        image: '/images/john-doe.jpg', // Replace with actual image path
        timeSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
      },
    ],
  };

  // Handle field selection
  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setProfessionals(professionalsData[field] || []);
    setShowFieldModal(false);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (professionalId, timeSlot) => {
    alert(`Request sent to professional ${professionalId} for ${timeSlot}`);
    // Add logic to send request to the backend
  };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom previous arrow
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#DAFFFF' }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-black py-12">
        {/* Field Selection Modal */}
        {showFieldModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Select Field</h2>
              <button
                className="px-6 py-3 text-white rounded-lg mr-4 hover:opacity-90"
                style={{ backgroundColor: '#012130' }} // Header background color
                onClick={() => handleFieldSelect('Software Engineering')}
              >
                Software Engineering
              </button>
              <button
                className="px-6 py-3 text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: '#012130' }} // Header background color
                onClick={() => handleFieldSelect('Data Science')}
              >
                Data Science
              </button>
            </div>
          </div>
        )}

        {/* Professionals Carousel */}
        {!showFieldModal && (
          <div className="w-full max-w-3xl relative">
            <h1 className="text-3xl font-bold mb-8 text-center">Available Professionals</h1>
            <Slider {...carouselSettings}>
              {professionals.map((professional) => (
                <div key={professional.id} className="p-4">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* Rating */}
                    <div className="text-right">
                      <span className="bg-[#b8860b] text-white px-3 py-1 rounded-full">
                        {professional.rating} ★
                      </span>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center">
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className="w-32 h-32 object-cover border-4"
                        style={{ borderColor: '#012130' }} // Header background color for border
                      />
                    </div>

                    {/* Name */}
                    <h2 className="text-2xl font-bold mt-4 text-center">
                      {professional.name}
                    </h2>

                    {/* Occupation and Company */}
                    <p className="text-lg text-gray-700 text-center">
                      {professional.occupation} at {professional.company}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 mt-4 text-center">
                      {professional.description}
                    </p>

                    {/* Time Slots */}
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-2">Available Time Slots</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {professional.timeSlots.map((timeSlot, index) => (
                          <button
                            key={index}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#012130' }} // Header background color
                            onClick={() => handleTimeSlotSelect(professional.id, timeSlot)}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
