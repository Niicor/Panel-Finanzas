import * as React from 'react'
import { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '../lib/utils'
import { Card } from './ui/Card'

interface FileUploadProps {
    onFileSelect: (file: File) => void
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files?.[0]
        if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
            onFileSelect(file)
        } else {
            alert('Please upload a valid CSV file.')
        }
    }, [onFileSelect])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onFileSelect(file)
        }
    }, [onFileSelect])

    return (
        <Card
            className={cn(
                "relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-12 border-2 border-dashed transition-all cursor-pointer",
                isDragOver ? "border-neon-green bg-slate-800/80" : "border-slate-700 hover:border-slate-600"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
        >
            <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleInputChange}
            />

            <div className="p-4 rounded-full bg-slate-900 mb-4">
                <Upload className={cn("w-8 h-8", isDragOver ? "text-neon-green" : "text-slate-400")} />
            </div>

            <h3 className="text-xl font-bold mb-2 text-slate-50">Upload Financial Data</h3>
            <p className="text-slate-400 text-center mb-6">
                Drag and drop your CSV file here, or click to browse.
                <br />
                <span className="text-sm text-slate-500">Supports text/csv</span>
            </p>
        </Card>
    )
}
