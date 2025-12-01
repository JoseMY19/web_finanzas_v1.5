import Link from 'next/link';
import { ArrowRight, PieChart, ShieldCheck, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Barra de Navegación */}
      <nav className="container mx-auto p-6 flex justify-between items-center border-b border-slate-800">
        <div className="text-2xl font-bold text-white flex items-center gap-2">
          <PieChart className="text-indigo-500" /> FinPro
        </div>
        <div className="space-x-4">
          <Link href="/login" className="text-slate-300 hover:text-white font-medium transition">Iniciar Sesión</Link>
          <Link href="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-lg shadow-indigo-900/20">
            Comenzar
          </Link>
        </div>
      </nav>

      {/* Sección Hero */}
      <main className="flex-grow container mx-auto px-6 flex flex-col md:flex-row items-center justify-center py-20 md:py-32">
        <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Claridad Financiera <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Simplificada.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
            La forma profesional de rastrear tus activos, analizar gastos y proyectar tu crecimiento financiero.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link href="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/20">
              Empezar Ahora <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="bg-slate-800 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-slate-700 transition flex items-center justify-center border border-slate-700">
              Entrar
            </Link>
          </div>
        </div>

        {/* Visual Abstracto */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-slate-400 text-sm">Balance Actual</p>
                <h3 className="text-3xl font-bold text-white">$24,500.00</h3>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-sm font-medium">+12.5%</div>
            </div>
            <div className="space-y-4">
              <div className="h-2 bg-slate-800 rounded-full w-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-3/4"></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Ingresos</span>
                <span>Gastos</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Características */}
      <section className="bg-slate-900 py-20 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition duration-300">
              <div className="bg-indigo-500/10 w-14 h-14 rounded-lg flex items-center justify-center text-indigo-500 mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analítica en Tiempo Real</h3>
              <p className="text-slate-400">Insights instantáneos sobre tu salud financiera con gráficos de nivel profesional.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition duration-300">
              <div className="bg-emerald-500/10 w-14 h-14 rounded-lg flex items-center justify-center text-emerald-500 mb-6">
                <PieChart size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Asignación de Activos</h3>
              <p className="text-slate-400">Visualiza la distribución de tus gastos y optimiza tu presupuesto.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition duration-300">
              <div className="bg-violet-500/10 w-14 h-14 rounded-lg flex items-center justify-center text-violet-500 mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Seguridad Bancaria</h3>
              <p className="text-slate-400">Tus datos están encriptados y protegidos con protocolos estándar de la industria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-slate-950 py-8 border-t border-slate-800 text-center text-slate-500">
        &copy; {new Date().getFullYear()} FinPro. Desarrollado por Jose Milla.
      </footer>
    </div>
  );
}
