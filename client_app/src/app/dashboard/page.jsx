'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/navigation';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from 'lucide-react';
import { getApiUrl } from '@/utils/api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const res = await axios.get(`${getApiUrl()}/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    if (loading) return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        </DashboardLayout>
    );

    if (!stats) return (
        <DashboardLayout>
            <div className="text-red-400">Error al cargar el dashboard</div>
        </DashboardLayout>
    );

    const chartData = {
        labels: Object.keys(stats.expensesByCategory || {}),
        datasets: [
            {
                data: Object.values(stats.expensesByCategory || {}),
                backgroundColor: [
                    '#6366f1', // Indigo 500
                    '#ec4899', // Pink 500
                    '#10b981', // Emerald 500
                    '#f59e0b', // Amber 500
                    '#8b5cf6', // Violet 500
                    '#3b82f6', // Blue 500
                ],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Resumen Financiero</h1>
                <p className="text-slate-400">Bienvenido de nuevo, aquí está lo que sucede con tu dinero.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Ingresos */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Ingresos Totales</p>
                            <h3 className="text-2xl font-bold text-white mt-1">${stats.totalIncome.toFixed(2)}</h3>
                        </div>
                        <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-500">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                </div>

                {/* Gastos */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Gastos Totales</p>
                            <h3 className="text-2xl font-bold text-white mt-1">${stats.totalExpense.toFixed(2)}</h3>
                        </div>
                        <div className="bg-rose-500/10 p-2 rounded-lg text-rose-500">
                            <ArrowDownRight size={24} />
                        </div>
                    </div>
                </div>

                {/* Balance */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-xl shadow-lg text-white">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">Balance Neto</p>
                            <h3 className="text-3xl font-bold mt-1">${stats.balance.toFixed(2)}</h3>
                        </div>
                        <div className="bg-white/20 p-2 rounded-lg text-white">
                            <Wallet size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gráfico */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-6">Distribución de Gastos</h3>
                    {Object.keys(stats.expensesByCategory).length > 0 ? (
                        <div className="h-64 flex justify-center">
                            <Doughnut
                                data={chartData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                            labels: { color: '#94a3b8', usePointStyle: true, padding: 20 }
                                        }
                                    },
                                    cutout: '75%',
                                }}
                            />
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-lg">
                            No hay datos disponibles
                        </div>
                    )}
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center">
                    <div className="bg-slate-800 p-4 rounded-full mb-4">
                        <DollarSign className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Gestionar Transacciones</h3>
                    <p className="text-slate-400 mb-6 max-w-xs">Mantén tus registros actualizados añadiendo nuevos ingresos o gastos.</p>
                    <button
                        onClick={() => router.push('/transactions')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition w-full max-w-xs"
                    >
                        Ir a Transacciones
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
