import { ArrowRight, BarChart3, PieChart, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from './ui/Card';

interface LandingPageProps {
    onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/90 z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>

                <div className="relative z-20 container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-sm font-medium mb-6 border border-neon-green/20">
                        <TrendingUp className="w-4 h-4" />
                        <span>Toma el control de tus finanzas hoy</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Claridad Financiera para<br />
                        <span className="text-neon-green">Decisiones Inteligentes</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        Deja de perder tiempo en hojas de cálculo eternas. Visualiza tus ingresos, gastos y rentabilidad en un panel moderno y fácil de usar.
                    </p>

                    <button
                        onClick={onStart}
                        className="group flex items-center gap-2 bg-neon-green hover:bg-neon-green/90 text-slate-900 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-neon-green/20"
                    >
                        Empieza a usar el panel
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Social Proof / Trust Indicators (Optional but good for SaaS look) */}
                    <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 text-sm font-medium">
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-neon-green" /> Sin registro</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-neon-green" /> 100% Privado</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-neon-green" /> Guarda Local</span>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-16">Todo lo que necesitas para crecer</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="p-8 hover:border-neon-green/50 transition-colors group">
                        <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <PieChart className="w-8 h-8 text-neon-green" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Visión 360°</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Entiende exactamente de dónde viene tu dinero y en qué se va con gráficos intuitivos y categorización automática.
                        </p>
                    </Card>

                    <Card className="p-8 hover:border-purple-500/50 transition-colors group">
                        <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <BarChart3 className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Adiós Excel</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Olvídate de las fórmulas complejas y los errores manuales. Sube tu CSV y obtén insights instantáneos.
                        </p>
                    </Card>

                    <Card className="p-8 hover:border-blue-500/50 transition-colors group">
                        <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Zap className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Simulación de Escenarios</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Proyecta tus ganancias futuras ajustando ingresos y gastos. Toma decisiones basadas en datos, no en suposiciones.
                        </p>
                    </Card>
                </div>
            </div>

            {/* Use Cases Section */}
            <div className="bg-slate-800/30 py-20 border-y border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Diseñado para quienes buscan resultados</h2>
                            <p className="text-slate-400 mb-8 text-lg">
                                Ya seas un freelancer controlando sus facturas o una pequeña empresa optimizando márgenes, el Panel Financiero se adapta a ti.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Creadores de Contenido y Digitales",
                                    "Pequeños Negocios y Startups",
                                    "Freelancers y Consultores",
                                    "Academias Online y E-learning"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-neon-green to-blue-500 rounded-2xl opacity-20 blur-lg"></div>
                            <Card className="relative p-6 border-slate-700 bg-slate-900">
                                {/* Mockup of a chart or mini dashboard view for visual interest */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="h-4 w-24 bg-slate-700/50 rounded"></div>
                                        <div className="h-6 w-16 bg-neon-green/20 rounded"></div>
                                    </div>
                                    <div className="h-32 bg-slate-800/50 rounded-lg flex items-end justify-between px-4 pb-2 gap-2">
                                        <div className="w-full bg-slate-700/30 rounded-t-sm h-[40%]"></div>
                                        <div className="w-full bg-slate-700/30 rounded-t-sm h-[60%]"></div>
                                        <div className="w-full bg-neon-green/20 rounded-t-sm h-[80%]"></div>
                                        <div className="w-full bg-slate-700/30 rounded-t-sm h-[50%]"></div>
                                        <div className="w-full bg-slate-700/30 rounded-t-sm h-[70%]"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="h-8 bg-slate-800 rounded"></div>
                                        <div className="h-8 bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-8 text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} Panel Financiero. Simplificando tus finanzas.</p>
            </footer>
        </div>
    );
}
