import { Dish } from '@/data/dishes';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface DishGridProps {
    dishes: Dish[];
    takenCounts: Record<string, number>;
    selectedDishIds: string[];
    onToggle: (dish: Dish) => void;
}

export default function DishGrid({ dishes, takenCounts, selectedDishIds, onToggle }: DishGridProps) {
    return (
        <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2">
            {dishes.map((dish) => {
                const isSelected = selectedDishIds.includes(dish.id);
                const takenCount = takenCounts[dish.id] || 0;
                const isCustomDish = dish.id.startsWith('custom-');
                const isFood = !['Drinks'].includes(dish.category) && dish.id !== 'diapers';
                const showTakenDot = takenCount > 0 && isFood;
                const isDiapers = dish.id === 'diapers';
                const nameLines = dish.name.split('\n');

                return (
                    <motion.div
                        key={dish.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onToggle(dish)}
                        className={`relative flex flex-col items-center p-2 rounded border-2 cursor-pointer transition-colors ${isSelected
                            ? 'bg-green-900/50 border-green-500'
                            : isDiapers
                                ? 'bg-blue-900/30 border-blue-400 hover:border-blue-300'
                                : 'bg-black/40 border-gray-700 hover:border-gray-500'
                            }`}
                    >
                        <div className="relative w-16 h-16 mb-2">
                            <Image
                                src={dish.image}
                                alt={dish.name}
                                fill
                                className="object-contain pixelated"
                                sizes="64px"
                            />
                            {showTakenDot && (
                                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold border border-white shadow-sm animate-pulse">
                                    {takenCount}
                                </div>
                            )}
                            {isSelected && (
                                <div className="absolute -bottom-1 -right-1 bg-green-500 text-black text-[10px] font-bold px-1 rounded border border-white">
                                    ✓
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] text-center leading-tight text-gray-300 font-pixel">
                            {nameLines.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < nameLines.length - 1 && <br />}
                                </span>
                            ))}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
}
