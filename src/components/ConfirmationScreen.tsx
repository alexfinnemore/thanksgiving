'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, UtensilsCrossed, X, Download } from 'lucide-react';

interface ConfirmationScreenProps {
    name: string;
    dishes: string;
    comeEarly: boolean;
    plusOne: boolean;
    onClose: () => void;
}

export default function ConfirmationScreen({ name, dishes, comeEarly, plusOne, onClose }: ConfirmationScreenProps) {
    const eventDate = "Wednesday, November 27th, 2025";
    const arrivalTime = comeEarly ? "1:00 PM CET" : "4:00 PM CET";
    const location = "Waldemarstraße 107, 10997 Berlin";

    const downloadCalendar = () => {
        // Event details
        const startTime = comeEarly ? "20251127T130000" : "20251127T160000"; // 1pm or 4pm
        const endTime = "20251127T220000"; // 10pm

        // Create description with dishes
        const description = `Friendsgiving 2025!\\n\\nYou're bringing: ${dishes}\\n\\nJoin to start cooking at 1pm, lunch at 4pm.\\nAll times are in Berlin (CET).${plusOne ? '\\n\\nYou are bringing a +1.' : ''}`;

        // Generate iCalendar content
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Friendsgiving 2025//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART;TZID=Europe/Berlin:${startTime}
DTEND;TZID=Europe/Berlin:${endTime}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Friendsgiving 2025 🦃
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Friendsgiving tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

        // Create blob and download
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'friendsgiving-2025.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                    className="mt-6 text-center space-y-3"
                >
                    <button
                        onClick={downloadCalendar}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg font-pixel text-sm transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Add to Calendar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg font-pixel text-sm transition-all hover:scale-105 shadow-lg"
                    >
                        Got It!
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                    transition={{ delay: 0.7, duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="mt-4 text-center"
                >
                    <p className="text-yellow-300 text-xs font-pixel">
                        📸 Take a screenshot for your records!
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-yellow-200/70 text-xs mt-2 font-pixel"
                >
                    See you there! 🎉
                </motion.p>
            </motion.div>
        </div>
    );
}
