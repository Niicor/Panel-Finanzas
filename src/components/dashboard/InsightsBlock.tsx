import { useMemo } from 'react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../lib/utils';
import { getBestMonth, getMostProfitableCategory } from './chartUtils';
import { type Transaction } from '../../lib/parser';
import { TrendingUp, Award, Activity } from 'lucide-react';

interface InsightsBlockProps {
    transactions: Transaction[];
}

export function InsightsBlock({ transactions }: InsightsBlockProps) {
    const bestMonth = useMemo(() => getBestMonth(transactions), [transactions]);
    const bestCategory = useMemo(() => getMostProfitableCategory(transactions), [transactions]);

    const roi = useMemo(() => {
        const income = transactions.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
        return expense > 0 ? (income / expense).toFixed(1) : '∞';
    }, [transactions]);

    if (!transactions.length) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-900/50 rounded-full text-yellow-400">
                        <Award className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Mejor Mes (Beneficio)</p>
                        <h2 className="text-xl font-bold text-slate-50">
                            {bestMonth ? bestMonth.month : '-'}
                        </h2>
                        {bestMonth && (
                            <p className="text-sm text-neon-green">
                                +{formatCurrency(bestMonth.amount)}
                            </p>
                        )}
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-900/50 rounded-full text-purple-400">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Categoría Más Rentable</p>
                        <h2 className="text-xl font-bold text-slate-50">
                            {bestCategory ? bestCategory.category : '-'}
                        </h2>
                        {bestCategory && (
                            <p className="text-sm text-neon-green">
                                +{formatCurrency(bestCategory.amount)}
                            </p>
                        )}
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-900/50 rounded-full text-blue-400">
                        <Activity className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">ROI Aproximado</p>
                        <h2 className="text-2xl font-bold text-slate-50">
                            {roi}x
                        </h2>
                        <p className="text-sm text-slate-500">Ingreso / Gasto</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
