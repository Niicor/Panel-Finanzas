import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { type Transaction } from '../../lib/parser';
import { aggregateDailyData } from './chartUtils';
import { formatCurrency } from '../../lib/utils';

interface IncomeExpenseChartProps {
    transactions: Transaction[];
}

export function IncomeExpenseChart({ transactions }: IncomeExpenseChartProps) {
    const data = useMemo(() => aggregateDailyData(transactions), [transactions]);

    return (
        <Card className="p-6 col-span-2 min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-50 mb-6">Ingresos vs Gastos</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                            itemStyle={{ color: '#f8fafc' }}
                            formatter={(value: number) => formatCurrency(value)}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#10B981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            name="Ingresos"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#F43F5E"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            name="Gastos"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
