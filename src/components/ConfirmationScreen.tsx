'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, UtensilsCrossed, X } from 'lucide-react';

interface ConfirmationScreenProps {
    name: string;
    dishes: string;
    comeEarly: boolean;
    plusOne: boolean;
    onClose: () => void;
}

export default function ConfirmationScreen({ name, dishes, comeEarly, plusOne, onClose }: ConfirmationScreenProps) {
    const eventDate = "Saturday, November 30th, 2025";
    const arrivalTime = comeEarly ? "1:00 PM CET" : "4:00 PM CET";
    const location = "Waldemarstraße 107, 10997 Berlin";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative bg-gradient-to-br from-green-900/90 to-yellow-900/90 border-4 border-yellow-500 rounded-lg w-full max-w-md p-8 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-yellow-300 hover:text-white z-50 bg-black/50 rounded-full p-1"
                >
                    <X className="w-5 h-5" />
                </button>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-center mb-6"
                >
                    <div className="text-6xl mb-4">🦃</div>
                    <h2 className="text-2xl font-bold text-yellow-300 font-pixel mb-2">
                        You're In!
                    </h2>
                    <p className="text-green-200 text-sm">
                        Thanks, {name}! We can't wait to see you{plusOne ? ' and your +1' : ''}!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4 bg-black/30 rounded-lg p-4 border-2 border-yellow-600/50"
                >
                    <div className="flex items-start gap-3">
                        <UtensilsCrossed className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-yellow-300 uppercase font-bold">You're Bringing:</p>
                            <p className="text-white text-sm font-pixel leading-relaxed">{dishes}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-yellow-300 uppercase font-bold">Date:</p>
                            <p className="text-white text-sm">{eventDate}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-yellow-300 uppercase font-bold">Arrival Time:</p>
                            <p className="text-white text-sm">{arrivalTime}</p>
                            {comeEarly && (
                                <p className="text-green-300 text-xs mt-1">🍳 Thanks for coming early to cook!</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-yellow-300 uppercase font-bold">Location:</p>
                            <p className="text-white text-sm">{location}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-center"
                >
                    <button
                        onClick={onClose}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg font-pixel text-sm transition-all hover:scale-105 shadow-lg"
                    >
                        Got It!
                    </button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-yellow-200/70 text-xs mt-4 font-pixel"
                >
                    See you there! 🎉
                </motion.p>
            </motion.div>
        </div>
    );
}
