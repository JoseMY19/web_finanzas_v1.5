'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Plus, X, Search, Filter } from 'lucide-react';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        type: 'gasto',
        date: new Date().toISOString().split('T')[0],
    });
    const router = useRouter();

    const fetchTransactions = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/transactions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(res.data);
        } catch (error) {
            console.error('Error al obtener transacciones:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [router]);

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta transacción?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/transactions/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTransactions();
        } catch (error) {
            console.error('Error al eliminar transacción:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (editingId) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/transactions/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/transactions`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({
                amount: '',
                category: '',
                description: '',
                type: 'gasto',
                date: new Date().toISOString().split('T')[0],
            });
            fetchTransactions();
        } catch (error) {
            console.error('Error al guardar transacción:', error);
            alert('Error al guardar transacción');
        }
    };

    const openEditModal = (transaction) => {
        setEditingId(transaction.id);
        setFormData({
            amount: transaction.amount,
            category: transaction.category,
            description: transaction.description || '',
            type: transaction.type,
            date: new Date(transaction.date).toISOString().split('T')[0],
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            amount: '',
            category: '',
            description: '',
            type: 'gasto',
            date: new Date().toISOString().split('T')[0],
        });
        setShowModal(true);
    };

    const filteredTransactions = transactions.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Transacciones</h1>
                    <p className="text-slate-400">Gestiona tus ingresos y gastos</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-900/20 font-medium"
                >
                    <Plus size={20} /> Nueva Transacción
                </button>
            </div>

            {/* Barra de Búsqueda */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-6 flex items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar transacciones..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-800">
                            <thead className="bg-slate-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Categoría</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Descripción</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Monto</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {filteredTransactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-800/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {new Date(t.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${t.type === 'ingreso'
                                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                                }`}>
                                                {t.type === 'ingreso' ? 'Ingreso' : 'Gasto'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{t.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{t.description || '-'}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${t.type === 'ingreso' ? 'text-emerald-400' : 'text-rose-400'
                                            }`}>
                                            {t.type === 'ingreso' ? '+' : '-'}${t.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openEditModal(t)} className="text-indigo-400 hover:text-indigo-300 mr-4 p-1 hover:bg-indigo-500/10 rounded transition">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(t.id)} className="text-rose-400 hover:text-rose-300 p-1 hover:bg-rose-500/10 rounded transition">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTransactions.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                            No se encontraron transacciones.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">{editingId ? 'Editar Transacción' : 'Nueva Transacción'}</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Tipo</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'ingreso' })}
                                        className={`py-2 rounded-lg font-medium transition ${formData.type === 'ingreso' ? 'bg-emerald-500/20 text-emerald-500 border-2 border-emerald-500' : 'bg-slate-800 text-slate-400 border-2 border-transparent hover:bg-slate-700'}`}
                                    >
                                        Ingreso
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'gasto' })}
                                        className={`py-2 rounded-lg font-medium transition ${formData.type === 'gasto' ? 'bg-rose-500/20 text-rose-500 border-2 border-rose-500' : 'bg-slate-800 text-slate-400 border-2 border-transparent hover:bg-slate-700'}`}
                                    >
                                        Gasto
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Monto ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Categoría</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="ej. Comida, Alquiler, Salario"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Descripción (Opcional)</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Detalles..."
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Fecha</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-900/20"
                                >
                                    {editingId ? 'Actualizar Transacción' : 'Guardar Transacción'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
