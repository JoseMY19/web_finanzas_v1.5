'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PieChart } from 'lucide-react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/auth/register`, { name, email, password });
            router.push('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-950">
            {/* Lado Izquierdo - Formulario */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-slate-900 border-r border-slate-800">
                <div className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-8 text-indigo-500">
                        <PieChart size={32} />
                        <span className="text-2xl font-bold text-white">FinPro</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-white">Crear Cuenta</h2>
                    <p className="text-slate-400 mb-8">Únete a FinPro hoy.</p>

                    {error && (
                        <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm mb-6 border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Nombre Completo</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-slate-600"
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-slate-600"
                                placeholder="tu@ejemplo.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-slate-600"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg shadow-indigo-900/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creando Cuenta...' : 'Registrarse'}
                        </button>
                    </form>
                    <p className="mt-8 text-center text-sm text-slate-400">
                        ¿Ya tienes una cuenta? <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300">Inicia sesión</Link>
                    </p>
                </div>
            </div>

            {/* Lado Derecho - Minimalista Oscuro */}
            <div className="hidden md:flex w-1/2 bg-slate-950 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-emerald-900/20 to-slate-950"></div>
                <div className="relative z-10 max-w-lg text-center">
                    <h3 className="text-4xl font-bold mb-6 text-white">Comienza tu Viaje</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Toma el control de tu futuro financiero con analítica avanzada.
                    </p>
                </div>
            </div>
        </div>
    );
}
