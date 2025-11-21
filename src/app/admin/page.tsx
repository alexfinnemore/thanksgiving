'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [rsvps, setRsvps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/rsvp')
            .then((res) => res.json())
            .then((data) => {
                setRsvps(data.rsvps);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-white font-pixel">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 p-8 font-sans">
            <h1 className="text-3xl text-yellow-500 font-bold mb-8 font-pixel">RSVP Admin Dashboard</h1>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-100 uppercase text-sm font-bold">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Dish</th>
                            <th className="p-4 text-center">+1</th>
                            <th className="p-4 text-center">Cooking Early</th>
                            <th className="p-4 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {rsvps.map((rsvp, i) => (
                            <tr key={i} className="hover:bg-gray-700/50 transition-colors">
                                <td className="p-4 font-bold text-white">{rsvp.name}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${rsvp.dishId === 'diapers' ? 'bg-blue-900 text-blue-200' : 'bg-green-900 text-green-200'}`}>
                                        {rsvp.dish}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    {rsvp.plusOne ? <span className="text-green-400">Yes</span> : <span className="text-gray-600">-</span>}
                                </td>
                                <td className="p-4 text-center">
                                    {rsvp.comeEarly ? <span className="text-yellow-400">Yes</span> : <span className="text-gray-600">-</span>}
                                </td>
                                <td className="p-4 text-right text-sm text-gray-500">
                                    {new Date(rsvp.timestamp).toLocaleDateString()} {new Date(rsvp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>
                            </tr>
                        ))}
                        {rsvps.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                                    No RSVPs yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-6 rounded border border-gray-700">
                    <h3 className="text-gray-400 text-sm uppercase mb-2">Total Guests</h3>
                    <p className="text-4xl font-bold text-white">
                        {rsvps.reduce((acc, curr) => acc + 1 + (curr.plusOne ? 1 : 0), 0)}
                    </p>
                </div>
                <div className="bg-gray-800 p-6 rounded border border-gray-700">
                    <h3 className="text-gray-400 text-sm uppercase mb-2">Dishes Promised</h3>
                    <p className="text-4xl font-bold text-green-400">
                        {rsvps.filter(r => r.dishId !== 'diapers').length}
                    </p>
                </div>
                <div className="bg-gray-800 p-6 rounded border border-gray-700">
                    <h3 className="text-gray-400 text-sm uppercase mb-2">Early Cooks</h3>
                    <p className="text-4xl font-bold text-yellow-400">
                        {rsvps.filter(r => r.comeEarly).length}
                    </p>
                </div>
            </div>
        </div>
    );
}
