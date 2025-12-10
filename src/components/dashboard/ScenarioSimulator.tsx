import { useState } from 'react';
import { Card } from '../ui/Card';
import { formatCurrency, cn } from '../../lib/utils';
import { Sliders } from 'lucide-react';

interface ScenarioSimulatorProps {
    currentIncome: number;
    currentExpense: number;
}

export function ScenarioSimulator({ currentIncome, currentExpense }: ScenarioSimulatorProps) {
    const [incomeGrowth, setIncomeGrowth] = useState(0);
    const [expenseAdjustment, setExpenseAdjustment] = useState(0);

    const projectedIncome = currentIncome * (1 + incomeGrowth / 100);
    const projectedExpense = currentExpense * (1 + expenseAdjustment / 100);
    const projectedProfit = projectedIncome - projectedExpense;

    // Calculate current profit for comparison
    const currentProfit = currentIncome - currentExpense;
    const difference = projectedProfit - currentProfit;

    return (
        <Card className="p-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
                <Sliders className="w-6 h-6 text-neon-green" />
                <h3 className="text-xl font-bold text-slate-50">Simulador de Escenarios</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-slate-300 font-medium">Crecimiento de Ingresos</label>
                            <span className="text-neon-green font-bold">+{incomeGrowth}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={incomeGrowth}
                            onChange={(e) => setIncomeGrowth(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neon-green"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Proyección: {formatCurrency(projectedIncome)}
                        </p>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-slate-300 font-medium">Ajuste de Gastos</label>
                            <span className={cn("font-bold", expenseAdjustment > 0 ? "text-neon-red" : "text-neon-green")}>
                                {expenseAdjustment > 0 ? '+' : ''}{expenseAdjustment}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            step="5"
                            value={expenseAdjustment}
                            onChange={(e) => setExpenseAdjustment(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neon-red"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Proyección: {formatCurrency(projectedExpense)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                    <p className="text-slate-400 mb-2">Beneficio Proyectado Mensual</p>
                    <h2 className={cn("text-4xl font-bold mb-2", projectedProfit >= 0 ? "text-neon-green" : "text-neon-red")}>
                        {formatCurrency(projectedProfit)}
                    </h2>

                    {difference !== 0 && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-500">Diferencia:</span>
                            <span className={cn("font-medium", difference > 0 ? "text-neon-green" : "text-neon-red")}>
                                {difference > 0 ? '+' : ''}{formatCurrency(difference)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
