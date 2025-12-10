import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { type ColumnMapping } from '../lib/parser';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface ColumnMapperProps {
    headers: string[];
    onConfirm: (mapping: ColumnMapping) => void;
    onCancel: () => void;
}

const REQUIRED_FIELDS = [
    { key: 'date', label: 'Fecha', description: 'Fecha de la transacción' },
    { key: 'description', label: 'Descripción', description: 'Detalle o concepto' },
    { key: 'category', label: 'Categoría', description: 'Categoría del gasto/ingreso' },
    { key: 'amount', label: 'Monto', description: 'Valor numérico' },
    { key: 'type', label: 'Tipo', description: 'Ingreso/Egreso/Signo' }
];

export function ColumnMapper({ headers, onConfirm, onCancel }: ColumnMapperProps) {
    const [mapping, setMapping] = useState<Partial<ColumnMapping>>({});

    // Auto-guess mapping based on common names
    useEffect(() => {
        const newMapping: Partial<ColumnMapping> = {};
        headers.forEach(header => {
            const h = header.toLowerCase();
            if (h.includes('date') || h.includes('fecha')) newMapping.date = header;
            else if (h.includes('desc') || h.includes('concept') || h.includes('detalle')) newMapping.description = header;
            else if (h.includes('cat') || h.includes('rubro')) newMapping.category = header;
            else if (h.includes('amount') || h.includes('monto') || h.includes('importe')) newMapping.amount = header;
            else if (h.includes('type') || h.includes('tipo')) newMapping.type = header;
        });
        setMapping(prev => ({ ...prev, ...newMapping }));
    }, [headers]);

    const handleSelect = (field: keyof ColumnMapping, header: string) => {
        setMapping(prev => ({ ...prev, [field]: header }));
    };

    const isValid = REQUIRED_FIELDS.every(f => mapping[f.key as keyof ColumnMapping]);

    const handleConfirm = () => {
        if (isValid) {
            onConfirm(mapping as ColumnMapping);
        }
    };

    return (
        <Card className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-50 mb-2">Asignar Columnas</h2>
            <p className="text-slate-400 mb-8">
                Asocia las columnas de tu archivo CSV con los campos requeridos.
            </p>

            <div className="space-y-4 mb-8">
                {REQUIRED_FIELDS.map((field) => (
                    <div key={field.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div>
                            <p className="font-bold text-slate-200">{field.label}</p>
                            <p className="text-xs text-slate-500">{field.description}</p>
                        </div>
                        <div className="relative">
                            <select
                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-neon-green focus:outline-none appearance-none"
                                value={mapping[field.key as keyof ColumnMapping] || ''}
                                onChange={(e) => handleSelect(field.key as keyof ColumnMapping, e.target.value)}
                            >
                                <option value="">Seleccionar columna...</option>
                                {headers.map(h => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={!isValid}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all",
                        isValid
                            ? "bg-neon-green text-slate-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : "bg-slate-700 text-slate-500 cursor-not-allowed"
                    )}
                >
                    <Check className="w-4 h-4" />
                    Confirmar
                </button>
            </div>
        </Card>
    );
}
