'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { TrendingUp, LayoutDashboard, List, LogOut } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const isActive = (path) => pathname === path;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition">
                    <TrendingUp className="w-6 h-6" />
                    <span>FinanceApp</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/transactions"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/transactions') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <List className="w-4 h-4" />
                        Transactions
                    </Link>
                    <div className="h-6 w-px bg-gray-200 mx-2"></div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
