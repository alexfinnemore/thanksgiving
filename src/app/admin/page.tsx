'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [rsvps, setRsvps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const fetchRsvps = () => {
        fetch('/api/rsvp')
            .then((res) => res.json())
            .then((data) => {
                setRsvps(data.rsvps);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRsvps();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this RSVP?')) return;
        await fetch(`/api/rsvp?id=${id}`, { method: 'DELETE' });
        fetchRsvps();
    };

    const startEdit = (rsvp: any) => {
        setEditingId(rsvp.id);
        setEditForm(rsvp);
    };

    const saveEdit = async () => {
        await fetch('/api/rsvp', {
            method: 'PUT',
            body: JSON.stringify(editForm),
        });
        setEditingId(null);
        fetchRsvps();
    };

    if (loading) return <div className="p-8 text-white font-pixel">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 p-8 font-sans">
            <h1 className="text-3xl text-yellow-500 font-bold mb-8 font-pixel">RSVP Admin Dashboard</h1>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-100 uppercase text-sm font-bold">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Dish</th>
                            <th className="p-4 text-center">+1</th>
                            <th className="p-4 text-center">Early</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {rsvps.map((rsvp, i) => (
                            <tr key={i} className="hover:bg-gray-700/50 transition-colors">
                                {editingId === rsvp.id ? (
                                    <>
                                        <td className="p-4"><input className="bg-gray-900 p-1 rounded text-white w-full" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /></td>
                                        <td className="p-4"><input className="bg-gray-900 p-1 rounded text-white w-full" value={editForm.dish} onChange={e => setEditForm({ ...editForm, dish: e.target.value })} /></td>
                                        <td className="p-4 text-center"><input type="checkbox" checked={editForm.plusOne} onChange={e => setEditForm({ ...editForm, plusOne: e.target.checked })} /></td>
                                        <td className="p-4 text-center"><input type="checkbox" checked={editForm.comeEarly} onChange={e => setEditForm({ ...editForm, comeEarly: e.target.checked })} /></td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={saveEdit} className="text-green-400 hover:text-green-300 font-bold">SAVE</button>
                                            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-300">CANCEL</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
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
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => startEdit(rsvp)} className="text-blue-400 hover:text-blue-300 text-xs uppercase">Edit</button>
                                            <button onClick={() => handleDelete(rsvp.id)} className="text-red-400 hover:text-red-300 text-xs uppercase">Delete</button>
                                        </td>
                                    </>
                                )}
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
