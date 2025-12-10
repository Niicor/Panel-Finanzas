import Papa from 'papaparse';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'Income' | 'Expense';
}

export interface ParseResult {
    data: Transaction[];
    errors: string[];
}

export const parseCSV = (file: File): Promise<ParseResult> => {
    return new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const transactions: Transaction[] = [];
                const errors: string[] = [];

                results.data.forEach((row: any, index) => {
                    // Normalize keys to lowercase for flexible matching
                    const normalizedRow = Object.keys(row).reduce((acc, key) => {
                        acc[key.toLowerCase().trim()] = row[key];
                        return acc;
                    }, {} as any);

                    const date = normalizedRow['date'] || normalizedRow['fecha'];
                    const description = normalizedRow['description'] || normalizedRow['descripción'] || normalizedRow['memo'];
                    const category = normalizedRow['category'] || normalizedRow['categoría'] || 'Uncategorized';
                    const amountStr = normalizedRow['amount'] || normalizedRow['monto'] || '0';
                    const typeRaw = normalizedRow['type'] || normalizedRow['tipo'];

                    if (!date || !amountStr) {
                        // Skip invalid rows but maybe log?
                        return;
                    }

                    let amount = parseFloat(amountStr.toString().replace(/[^0-9.-]+/g, ''));
                    let type: 'Income' | 'Expense' = 'Expense';

                    if (typeRaw) {
                        const t = typeRaw.toLowerCase();
                        if (t === 'income' || t === 'ingreso' || t === 'credit') type = 'Income';
                        else type = 'Expense';
                    } else {
                        // Infer from amount sign
                        if (amount >= 0) type = 'Income';
                        else {
                            type = 'Expense';
                            amount = Math.abs(amount); // Normalizing expense to positive number usually? 
                            // Wait, requirements say: "Values of Expense/Negative: Neon Red". 
                            // If I store expense as positive but label it Expense, it's easier for charts usually.
                            // But user logic: "If Type missing, infer from sign (positive = Income, negative = Expense)".
                            // So original amount might be negative. 
                            // I will store absolute amount and use Type to distinguish.
                        }
                    }

                    // Ensure amount is positive for visualization, but logic handles sign via Type?
                    // Let's store absolute amount and rely on Type.
                    amount = Math.abs(amount);

                    transactions.push({
                        id: `txn-${index}-${Date.now()}`,
                        date,
                        description: description || 'No Description',
                        category,
                        amount,
                        type
                    });
                });

                resolve({ data: transactions, errors });
            },
            error: (error) => {
                resolve({ data: [], errors: [error.message] });
            }
        });
    });
};
