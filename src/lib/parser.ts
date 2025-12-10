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

export interface ColumnMapping {
    date: string;
    description: string;
    category: string;
    amount: string;
    type: string;
}

export const getCSVHeaders = (file: File): Promise<string[]> => {
    return new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            preview: 1,
            step: (results) => {
                if (results.meta.fields) {
                    resolve(results.meta.fields);
                } else {
                    resolve([]);
                }
            },
            complete: () => {
                // In case step isn't called for empty file
            }
        });
    });
};

export const parseCSV = (file: File, mapping?: ColumnMapping): Promise<ParseResult> => {
    return new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const transactions: Transaction[] = [];
                const errors: string[] = [];

                results.data.forEach((row: any, index) => {
                    // Normalize keys to lowercase for flexible matching ONLY if no mapping provided
                    const normalizedRow = mapping ? row : Object.keys(row).reduce((acc, key) => {
                        acc[key.toLowerCase().trim()] = row[key];
                        return acc;
                    }, {} as any);

                    let date, description, category, amountStr, typeRaw;

                    if (mapping) {
                        date = row[mapping.date];
                        description = row[mapping.description];
                        category = row[mapping.category];
                        amountStr = row[mapping.amount];
                        typeRaw = row[mapping.type];
                    } else {
                        date = normalizedRow['date'] || normalizedRow['fecha'];
                        description = normalizedRow['description'] || normalizedRow['descripcion'] || normalizedRow['descripción'] || normalizedRow['memo'];
                        category = normalizedRow['category'] || normalizedRow['categoria'] || 'Sin Categoría';
                        amountStr = normalizedRow['amount'] || normalizedRow['monto'] || '0';
                        typeRaw = normalizedRow['type'] || normalizedRow['tipo'];
                    }

                    if (!date || !amountStr) {
                        // Skip invalid rows but maybe log?
                        return;
                    }

                    let amount = parseFloat(amountStr.toString().replace(/[^0-9.-]+/g, ''));
                    let type: 'Income' | 'Expense' = 'Expense';

                    if (typeRaw) {
                        const t = typeRaw.toString().toLowerCase();
                        if (t === 'income' || t === 'ingreso' || t === 'credit') type = 'Income';
                        else type = 'Expense';
                    } else {
                        // Infer from amount sign
                        if (amount >= 0) type = 'Income';
                        else {
                            type = 'Expense';
                            amount = Math.abs(amount);
                        }
                    }

                    // Ensure amount is positive for visualization, but logic handles sign via Type?
                    // Let's store absolute amount and rely on Type.
                    amount = Math.abs(amount);

                    transactions.push({
                        id: `txn-${index}-${Date.now()}`,
                        date,
                        description: description || 'Sin Descripción',
                        category: category || 'Sin Categoría',
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
