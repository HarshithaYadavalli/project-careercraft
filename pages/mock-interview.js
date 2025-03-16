import { useState } from 'react';
import Header from '../components/Intro-Header';
import Footer from '../components/Footer';

const difficultyLevels = [
  { level: 'Easy', duration: '30 min', topics: ['Basics', 'Fundamentals'], status: 'Unattempted' },
  { level: 'Intermediate', duration: '45 min', topics: ['Data Structures', 'Algorithms'], status: 'Unattempted' },
  { level: 'Hard', duration: '60 min', topics: ['System Design', 'Advanced Algorithms'], status: 'Unattempted' }
];

export default function MockInterview() {
  const [showFieldModal, setShowFieldModal] = useState(true);
  const [selectedField, setSelectedField] = useState(null);
  const [tests, setTests] = useState(difficultyLevels);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setShowFieldModal(false);
  };

  const handleAttempt = (index) => {
    const updatedTests = [...tests];
    updatedTests[index].status = 'Attempted';
    setTests(updatedTests);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#DAFFFF' }}>
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-black py-12">
        {showFieldModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Select Field</h2>
              <button className="px-6 py-3 text-white rounded-lg mr-4 hover:opacity-90" style={{ backgroundColor: '#012130' }} onClick={() => handleFieldSelect('Software Engineering')}>
                Software Engineering
              </button>
              <button className="px-6 py-3 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: '#012130' }} onClick={() => handleFieldSelect('Data Science')}>
                Data Science
              </button>
            </div>
          </div>
        )}
        {!showFieldModal && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {tests.map((test, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg relative">
                <span className={`absolute top-2 right-2 px-3 py-1 text-white text-sm font-semibold rounded-full ${test.status === 'Unattempted' ? 'bg-[#D97706]' : 'bg-[#6EE7B7]'}`}> {test.status} </span>
                <h2 className="text-2xl font-bold text-center mb-4">{test.level}</h2>
                <p className="text-gray-700 text-center">Duration: {test.duration}</p>
                <p className="text-gray-700 text-center mt-2">Topics: {test.topics.join(', ')}</p>
                <button className="mt-4 px-6 py-3 w-full text-white rounded-lg hover:opacity-90" style={{ backgroundColor: '#012130' }} onClick={() => handleAttempt(index)}>
                  Attempt Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}