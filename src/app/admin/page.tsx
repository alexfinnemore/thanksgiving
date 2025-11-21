'use client';

import { useEffect, useState } from 'react';

import { DISHES } from '@/data/dishes';

export default function AdminPage() {
    const [rsvps, setRsvps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

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

    useEffect(() => {
        const handleClickOutside = () => {
            if (dropdownOpen) setDropdownOpen(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [dropdownOpen]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this RSVP?')) return;
        await fetch(`/api/rsvp?id=${id}`, { method: 'DELETE' });
        fetchRsvps();
    };

    const startEdit = (rsvp: any) => {
        setEditingId(rsvp.id);
        setEditForm(rsvp);
        setDropdownOpen(null);
    };

    const saveEdit = async () => {
        await fetch('/api/rsvp', {
            method: 'PUT',
            body: JSON.stringify(editForm),
        });
        setEditingId(null);
        setDropdownOpen(null);
        fetchRsvps();
    };

    const toggleDish = (dish: any) => {
        let currentIds = (editForm.dishId === 'custom' || !editForm.dishId) ? [] : editForm.dishId.split(',');
        // Clean up empty strings
        currentIds = currentIds.filter((id: string) => id.trim() !== '');

        if (currentIds.includes(dish.id)) {
            currentIds = currentIds.filter((id: string) => id !== dish.id);
        } else {
            currentIds.push(dish.id);
        }

        if (currentIds.length === 0) {
            setEditForm({ ...editForm, dishId: '', dish: '' });
        } else {
            const names = currentIds.map((id: string) => DISHES.find(d => d.id === id)?.name || id).join(', ');
            setEditForm({ ...editForm, dishId: currentIds.join(','), dish: names });
        }
    };

    const handleCustomDish = (val: string) => {
        setEditForm({ ...editForm, dishId: 'custom', dish: val });
    };

    if (loading) return <div className="p-8 text-white font-pixel">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 p-8 font-sans">
            <h1 className="text-3xl text-yellow-500 font-bold mb-8 font-pixel">RSVP Admin Dashboard</h1>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 overflow-x-auto pb-32">
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
                                        <td className="p-4 relative">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDropdownOpen(dropdownOpen === rsvp.id ? null : rsvp.id);
                                                }}
                                                className="bg-gray-900 p-2 rounded text-white w-full text-left flex justify-between items-center border border-gray-600 min-w-[200px]"
                                            >
                                                <span className="truncate text-sm">{editForm.dish || 'Select Dishes...'}</span>
                                                <span className="text-xs ml-2">▼</span>
                                            </button>

                                            {dropdownOpen === rsvp.id && (
                                                <div
                                                    className="absolute top-full left-0 z-50 bg-gray-800 border border-gray-600 rounded shadow-xl max-h-60 overflow-y-auto w-64 p-2 mt-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {DISHES.map(dish => {
                                                        const isSelected = (editForm.dishId || '').split(',').includes(dish.id);
                                                        return (
                                                            <div key={dish.id} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors" onClick={() => toggleDish(dish)}>
                                                                <div className={`w-4 h-4 border flex items-center justify-center text-black text-[10px] font-bold ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                                                                    {isSelected && '✓'}
                                                                </div>
                                                                <span className="text-sm text-gray-200">{dish.name}</span>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="border-t border-gray-600 mt-2 pt-2">
                                                        <label className="flex flex-col gap-1 p-1">
                                                            <span className="text-xs text-gray-400 uppercase">Or Custom Dish:</span>
                                                            <input
                                                                className="bg-gray-900 text-white text-sm p-2 rounded border border-gray-700 focus:border-green-500 outline-none"
                                                                value={editForm.dishId === 'custom' ? editForm.dish : ''}
                                                                onChange={(e) => handleCustomDish(e.target.value)}
                                                                placeholder="Type custom dish name..."
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
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
