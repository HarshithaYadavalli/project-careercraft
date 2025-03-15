import { useEffect, useState } from 'react';
import Header from '../components/Intro-Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mt-auto">
      <Footer />
      </div>
    </div>
  );
}