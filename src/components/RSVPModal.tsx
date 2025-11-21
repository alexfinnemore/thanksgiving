'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DishCarousel from './DishCarousel';
import DishGrid from './DishGrid';
import { DISHES, Dish } from '@/data/dishes';
import { X, Grid, LayoutTemplate } from 'lucide-react';

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
    takenCounts: Record<string, number>;
    onSubmit: (data: any) => void;
}

export default function RSVPModal({ isOpen, onClose, takenCounts, onSubmit }: RSVPModalProps) {
    const [name, setName] = useState('');
    const [plusOne, setPlusOne] = useState(false);
    const [comeEarly, setComeEarly] = useState(false);
    const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
    const [customDish, setCustomDish] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

    const [error, setError] = useState('');

    if (!isOpen) return null;

    const toggleDish = (dish: Dish) => {
        if (error) setError('');
        setSelectedDishes((prev) => {
            const exists = prev.find((d) => d.id === dish.id);
            if (exists) {
                return prev.filter((d) => d.id !== dish.id);
            } else {
                return [...prev, dish];
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Please enter your name!');
            return;
        }
        if (selectedDishes.length === 0 && !customDish) {
            setError('Please select at least one dish or enter a custom one!');
            return;
        }

        const dishNames = isCustom ? customDish : selectedDishes.map(d => d.name).join(', ');
        const dishIds = isCustom ? 'custom' : selectedDishes.map(d => d.id).join(',');

        onSubmit({
            name,
            plusOne,
            comeEarly,
            dish: dishNames,
            dishId: dishIds,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#2a2a2a] border-4 border-gray-600 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
                <div className="bg-gray-800 p-4 flex justify-between items-center border-b-4 border-gray-600 sticky top-0 z-20">
                    <h2 className="text-xl text-yellow-500 font-bold">RSVP Card</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-900/50 border-2 border-red-500 text-red-200 p-3 rounded text-sm font-bold animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="block text-sm text-green-400 uppercase tracking-wider">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (error) setError('');
                            }}
                            className="w-full bg-black border-2 border-gray-600 p-3 text-white focus:border-green-500 focus:outline-none font-pixel"
                            placeholder="Enter name..."
                        />
                    </div>

                    {/* Dish Selection */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm text-green-400 uppercase tracking-wider">What are you bringing?</label>
                            {!isCustom && (
                                <button
                                    type="button"
                                    onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
                                    className="text-xs flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded border border-gray-500 transition-colors"
                                >
                                    {viewMode === 'carousel' ? <Grid size={14} /> : <LayoutTemplate size={14} />}
                                    {viewMode === 'carousel' ? 'Grid View' : 'Carousel View'}
                                </button>
                            )}
                        </div>

                        {!isCustom ? (
                            <>
                                {viewMode === 'carousel' ? (
                                    <DishCarousel
                                        dishes={DISHES}
                                        takenCounts={takenCounts}
                                        onToggle={toggleDish}
                                        selectedDishIds={selectedDishes.map(d => d.id)}
                                    />
                                ) : (
                                    <DishGrid
                                        dishes={DISHES}
                                        takenCounts={takenCounts}
                                        onToggle={toggleDish}
                                        selectedDishIds={selectedDishes.map(d => d.id)}
                                    />
                                )}

                                <div className="text-center mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsCustom(true)}
                                        className="text-xs text-gray-400 underline hover:text-white"
                                    >
                                        I can't find my dish / I want to bring something else
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="bg-black/30 p-4 rounded border border-gray-600">
                                <label className="block text-xs text-gray-400 mb-1">Custom Dish Name</label>
                                <input
                                    type="text"
                                    value={customDish}
                                    onChange={(e) => setCustomDish(e.target.value)}
                                    className="w-full bg-black border-2 border-gray-600 p-2 text-white focus:border-green-500 focus:outline-none"
                                    placeholder="e.g. My Famous Lasagna"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsCustom(false)}
                                    className="text-xs text-gray-400 underline mt-2 hover:text-white block"
                                >
                                    Back to list
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Options */}
                    <div className="space-y-4 bg-black/20 p-4 rounded border border-gray-700">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className={`w-6 h-6 border-2 border-gray-500 flex items-center justify-center ${plusOne ? 'bg-green-600 border-green-600' : 'bg-black'}`}>
                                {plusOne && <span className="text-white text-xs">X</span>}
                            </div>
                            <input type="checkbox" checked={plusOne} onChange={(e) => setPlusOne(e.target.checked)} className="hidden" />
                            <span className="text-sm text-gray-300 group-hover:text-white">Bringing a +1?</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className={`w-6 h-6 border-2 border-gray-500 flex items-center justify-center ${comeEarly ? 'bg-green-600 border-green-600' : 'bg-black'}`}>
                                {comeEarly && <span className="text-white text-xs">X</span>}
                            </div>
                            <input type="checkbox" checked={comeEarly} onChange={(e) => setComeEarly(e.target.checked)} className="hidden" />
                            <span className="text-sm text-gray-300 group-hover:text-white">Come early to cook (13:00)?</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-4 border-b-4 border-green-900 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-lg shadow-lg"
                    >
                        Submit RSVP
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
