'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dish } from '@/data/dishes';
import Image from 'next/image';

interface DishCarouselProps {
    dishes: Dish[];
    takenCounts: Record<string, number>;
    onToggle: (dish: Dish) => void;
    selectedDishIds: string[];
}

export default function DishCarousel({ dishes, takenCounts, onToggle, selectedDishIds }: DishCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % dishes.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);

    const currentDish = dishes[currentIndex];
    const takenCount = takenCounts[currentDish.id] || 0;
    const isFood = !['Drinks', 'Other'].includes(currentDish.category);
    const showTakenWarning = takenCount > 0 && isFood;
    const isSelected = selectedDishIds.includes(currentDish.id);
    const isDiapers = currentDish.id === 'diapers';
    const nameLines = currentDish.name.split('\n');

    return (
        <div className="relative w-full max-w-md mx-auto h-96 flex items-center justify-center bg-black/40 rounded-xl border-2 border-gray-700 p-4">
            <button type="button" onClick={prev} className="absolute left-2 z-10 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 border border-gray-500">
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center justify-center cursor-pointer w-full group"
                        onClick={() => onToggle(currentDish)}
                    >
                        <div className={`relative w-48 h-48 transition-all duration-200 ${isSelected ? 'scale-110 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'hover:scale-105'}`}>
                            <Image
                                src={currentDish.image}
                                alt={currentDish.name}
                                fill
                                className="object-contain pixelated filter drop-shadow-lg"
                                sizes="(max-width: 768px) 100vw, 300px"
                            />

                            {/* Standard Badge for all items */}
                            {takenCount > 0 && (
                                <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm border-2 border-white font-bold shadow-lg z-20">
                                    {takenCount}
                                </div>
                            )}

                            {isSelected ? (
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs border border-white whitespace-nowrap z-20 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                                    SELECTED
                                </div>
                            ) : (
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-[10px] border border-gray-500 whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    CLICK TO SELECT
                                </div>
                            )}
                        </div>

                        <h3 className={`mt-8 text-xl text-center font-bold tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,1)] px-4 py-1 rounded transition-colors ${isSelected
                                ? 'text-green-400 bg-black/70 border border-green-500'
                                : isDiapers
                                    ? 'text-blue-300 bg-blue-900/50 border border-blue-400'
                                    : 'text-yellow-400 bg-black/50'
                            }`}>
                            {nameLines.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < nameLines.length - 1 && <br />}
                                </span>
                            ))}
                        </h3>

                        {showTakenWarning && (
                            <div className="mt-2 bg-orange-900/80 border border-orange-500 text-orange-200 text-[10px] px-2 py-1 rounded max-w-[200px] text-center animate-pulse">
                                Someone is already bringing this!
                            </div>
                        )}

                        <p className="text-xs text-gray-300 mt-1 bg-black/30 px-2 rounded">{currentDish.category}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <button type="button" onClick={next} className="absolute right-2 z-10 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 border border-gray-500">
                <ChevronRight className="w-6 h-6 text-white" />
            </button>
        </div>
    );
}
