import { type Transaction } from "../../lib/parser";

export const aggregateDailyData = (transactions: Transaction[]) => {
    const map = new Map<string, { date: string; income: number; expense: number }>();

    transactions.forEach(t => {
        // Standardize date format if possible or just use raw date string if it's consistent
        // For better sorting, we might need to parse date.
        // Assuming date string is somewhat sortable or we parse it.
        // Let's blindly group by the string 'date' for now, assuming standard YYYY-MM-DD from parser if possible, 
        // but parser just passes through.

        // Attempt to normalize date to YYYY-MM-DD for sorting
        let dateKey = t.date;
        try {
            const d = new Date(t.date);
            if (!isNaN(d.getTime())) {
                dateKey = d.toISOString().split('T')[0];
            }
        } catch (e) {
            // ignore
        }

        if (!map.has(dateKey)) {
            map.set(dateKey, { date: dateKey, income: 0, expense: 0 });
        }
        const entry = map.get(dateKey)!;
        if (t.type === 'Income') entry.income += t.amount;
        else entry.expense += t.amount;
    });

    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
};

export const aggregateCategoryData = (transactions: Transaction[]) => {
    const map = new Map<string, number>();

    transactions
        .filter(t => t.type === 'Expense')
        .forEach(t => {
            const cat = t.category;
            map.set(cat, (map.get(cat) || 0) + t.amount);
        });

    return Array.from(map.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
};

export const getBestMonth = (transactions: Transaction[]) => {
    const map = new Map<string, number>();

    transactions.forEach(t => {
        let dateKey = t.date;
        try {
            const d = new Date(t.date);
            if (!isNaN(d.getTime())) {
                const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ];
                dateKey = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            }
        } catch (e) {
            // ignore
        }

        if (!map.has(dateKey)) map.set(dateKey, 0);

        const current = map.get(dateKey)!;
        if (t.type === 'Income') map.set(dateKey, current + t.amount);
        else map.set(dateKey, current - t.amount);
    });

    const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? { month: sorted[0][0], amount: sorted[0][1] } : null;
};

export const getMostProfitableCategory = (transactions: Transaction[]) => {
    const map = new Map<string, number>();

    transactions
        .filter(t => t.type === 'Income')
        .forEach(t => {
            const cat = t.category;
            map.set(cat, (map.get(cat) || 0) + t.amount);
        });

    const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? { category: sorted[0][0], amount: sorted[0][1] } : null;
};
