import { useEffect } from 'react';
import Header from '../components/Intro-Header';
import Footer from '../components/Footer';
import HomePage from '../components/home-page';

export default function Home() {
  // Scroll to the top of the page on initial render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Component */}
      <Header />

      {/* HomePage Component */}
      <HomePage />

      {/* Footer Component */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}