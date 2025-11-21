'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import RSVPModal from '@/components/RSVPModal';
import { motion } from 'framer-motion';

export default function Home() {
  const [showSadCat, setShowSadCat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [customDishes, setCustomDishes] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/rsvp')
      .then((res) => res.json())
      .then((data) => setRsvps(data.rsvps));

    fetch('/api/custom-dishes')
      .then((res) => res.json())
      .then((data) => setCustomDishes(data.dishes || []));
  }, []);

  const takenCounts = rsvps.reduce((acc, rsvp) => {
    const dishId = rsvp.dish_id || rsvp.dishId; // Support both formats for compatibility

    if (dishId === 'custom') {
      // For custom dishes, find the matching custom dish by name
      const customDish = customDishes.find(cd => cd.name.toLowerCase() === rsvp.dish.toLowerCase());
      if (customDish) {
        const customKey = `custom-${customDish.id}`;
        acc[customKey] = (acc[customKey] || 0) + 1;
      }
    } else if (dishId) {
      const ids = dishId.split(',');
      ids.forEach((id: string) => {
        const trimmedId = id.trim();
        if (trimmedId) {
          acc[trimmedId] = (acc[trimmedId] || 0) + 1;
        }
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const handleRSVP = async (data: any) => {
    // If it's a custom dish, save it to the custom dishes table
    if (data.dishId === 'custom' && data.dish) {
      await fetch('/api/custom-dishes', {
        method: 'POST',
        body: JSON.stringify({ name: data.dish }),
      });

      // Refresh custom dishes list
      fetch('/api/custom-dishes')
        .then((res) => res.json())
        .then((data) => setCustomDishes(data.dishes || []));
    }

    await fetch('/api/rsvp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setSubmitted(true);
    setShowModal(false);
    // Refresh list
    fetch('/api/rsvp')
      .then((res) => res.json())
      .then((data) => setRsvps(data.rsvps));
  };

  if (showSadCat) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl md:text-4xl text-red-500 mb-8 font-pixel leading-relaxed">We will miss you!</h1>
        <div className="relative w-64 h-64 animate-bounce">
          <Image src="/sad_cat.png" alt="Sad Cat" fill className="object-contain pixelated" />
        </div>
        <button
          onClick={() => setShowSadCat(false)}
          className="mt-12 text-gray-500 hover:text-white underline text-sm font-pixel"
        >
          Wait, I changed my mind!
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="/background.jpg" alt="Background" fill className="object-cover pixelated" />
        </div>
        <div className="z-10 bg-black/80 p-8 rounded-lg border-4 border-green-600 shadow-[0_0_50px_rgba(34,197,94,0.5)] max-w-md w-full">
          <h1 className="text-2xl md:text-4xl text-green-500 mb-6 font-pixel leading-relaxed">See you there!</h1>
          <p className="text-white mb-8 font-pixel text-sm leading-loose">Your RSVP has been sent.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-gray-400 hover:text-white underline text-xs font-pixel"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Dining Room"
          fill
          className="object-cover pixelated opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center max-w-2xl w-full">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black/70 p-6 md:p-10 rounded-xl border-4 border-yellow-600 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm mb-10 w-full"
        >
          <h1 className="text-3xl md:text-5xl text-yellow-500 mb-8 text-shadow-retro leading-tight font-pixel">
            Friendsgiving
          </h1>

          <div className="space-y-4 text-sm md:text-base text-gray-200 font-pixel tracking-wide leading-loose">
            <p className="text-lg md:text-xl text-white font-bold mb-4">27 November</p>
            <div className="h-1 bg-yellow-600/50 w-1/2 mx-auto my-4" />
            <p>Join to help cook: <span className="text-green-400">13:00</span></p>
            <p>Lunch: <span className="text-green-400">16:00</span></p>
            <p className="text-yellow-200 mt-4">Waldemarstraße 107</p>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-4 px-6 rounded border-b-4 border-green-900 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm md:text-base shadow-lg font-pixel"
          >
            RSVP
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSadCat(true)}
            className="flex-1 bg-red-800 hover:bg-red-700 text-white font-bold py-4 px-6 rounded border-b-4 border-red-950 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm md:text-base shadow-lg font-pixel"
          >
            I can't make it
          </motion.button>
        </div>
      </div>

      <RSVPModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        takenCounts={takenCounts}
        onSubmit={handleRSVP}
        customDishes={customDishes}
      />

      {/* Footer/Credits */}
      <div className="absolute bottom-4 text-[10px] text-gray-500 font-pixel opacity-50">
        LucasArts Tribute • 2025
      </div>
    </main>
  );
}
