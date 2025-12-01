import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
