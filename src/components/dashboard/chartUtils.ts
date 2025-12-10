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
