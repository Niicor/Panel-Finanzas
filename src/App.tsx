import { useState, useMemo } from 'react';
import { FileUpload } from './components/FileUpload';
import { parseCSV, type Transaction } from './lib/parser';
import { Card } from './components/ui/Card';
import { formatCurrency, cn } from './lib/utils';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { IncomeExpenseChart } from './components/dashboard/IncomeExpenseChart';
import { CategoryChart } from './components/dashboard/CategoryChart';
import { InsightsBlock } from './components/dashboard/InsightsBlock';
import { ScenarioSimulator } from './components/dashboard/ScenarioSimulator';
import { Percent } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    const result = await parseCSV(file);
    setTransactions(result.data);
    setIsProcessing(false);
  };

  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const net = income - expense;
    const margin = income > 0 ? ((net / income) * 100) : 0;
    return { income, expense, net, margin };
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-50 mb-2">Panel Financiero</h1>
        <p className="text-slate-400 mb-8">Sube tu resumen bancario para visualizar tus finanzas</p>
        <FileUpload onFileSelect={handleFileSelect} />
        {isProcessing && <p className="text-slate-400 mt-4 animate-pulse">Procesando...</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-50">Panel Financiero</h1>
        <button
          onClick={() => setTransactions([])}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Subir Nuevo Archivo
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900/50 rounded-full text-neon-green">
              <ArrowUpCircle className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Ingresos Totales</p>
              <h2 className="text-2xl font-bold text-neon-green">{formatCurrency(summary.income)}</h2>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900/50 rounded-full text-neon-red">
              <ArrowDownCircle className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Gastos Totales</p>
              <h2 className="text-2xl font-bold text-neon-red">{formatCurrency(summary.expense)}</h2>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900/50 rounded-full text-blue-400">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Balance Neto</p>
              <h2 className={cn("text-2xl font-bold", summary.net >= 0 ? "text-neon-green" : "text-neon-red")}>
                {formatCurrency(summary.net)}
              </h2>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900/50 rounded-full text-purple-400">
              <Percent className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Margen de Beneficio</p>
              <h2 className={cn("text-2xl font-bold", summary.margin >= 0 ? "text-neon-green" : "text-neon-red")}>
                {summary.margin.toFixed(1)}%
              </h2>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights Block */}
      <InsightsBlock transactions={transactions} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <IncomeExpenseChart transactions={transactions} />
        <CategoryChart transactions={transactions} />
      </div>

      {/* Transactions Table */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-50 mb-4">Transacciones Recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-slate-900/50 text-slate-300">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-right">Monto</th>
                <th className="px-4 py-3 text-center">Tipo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {transactions.slice(0, 10).map((t) => (
                <tr key={t.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">{t.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-200">{t.description}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-slate-700 text-xs">{t.category}</span>
                  </td>
                  <td className={cn("px-4 py-3 text-right font-bold", t.type === 'Income' ? 'text-neon-green' : 'text-neon-red')}>
                    {t.type === 'Expense' ? '-' : '+'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn("inline-block w-2 h-2 rounded-full", t.type === 'Income' ? 'bg-neon-green' : 'bg-neon-red')}></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Scenario Simulator */}
      <ScenarioSimulator currentIncome={summary.income} currentExpense={summary.expense} />
    </div >
  );
}

export default App;
