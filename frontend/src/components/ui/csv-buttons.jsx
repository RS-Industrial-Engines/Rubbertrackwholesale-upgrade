import React, { useRef } from 'react';
import { Button } from './button';
import { Upload, Download } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

/**
 * Reusable CSV Import/Export Component
 * 
 * Props:
 * - data: Array of objects to export
 * - onImport: Function to handle CSV import (receives parsed rows)
 * - headers: Array of header names for CSV
 * - filename: Base filename for export (without .csv)
 * - parseRow: Function to parse a CSV row into an object
 * - disabled: Boolean to disable buttons
 */
export const CSVButtons = ({ 
  data = [], 
  onImport, 
  headers = [], 
  filename = 'export',
  parseRow,
  disabled = false 
}) => {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "There is no data to export",
        variant: "destructive"
      });
      return;
    }

    const csvRows = [headers];
    
    data.forEach(item => {
      const row = headers.map(header => {
        const key = header.toLowerCase().replace(/ /g, '_');
        const value = item[key] || '';
        return `"${value}"`;
      });
      csvRows.push(row);
    });

    const csv = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export Successful",
      description: `Exported ${data.length} records`
    });
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    try {
      const text = await file.text();
      const lines = text.split('\n');
      
      // Skip header row
      const dataLines = lines.slice(1).filter(line => line.trim());
      
      const parsedData = [];
      
      for (const line of dataLines) {
        // Parse CSV line (handle quoted fields)
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        
        if (parseRow) {
          const parsed = parseRow(values);
          if (parsed) {
            parsedData.push(parsed);
          }
        }
      }

      if (parsedData.length > 0 && onImport) {
        await onImport(parsedData);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process CSV file",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={handleExport} 
        disabled={disabled || data.length === 0}
        className="text-white border-slate-600 hover:bg-slate-800"
      >
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()} 
        disabled={disabled}
        className="text-white border-slate-600 hover:bg-slate-800"
      >
        <Upload className="h-4 w-4 mr-2" />
        Import CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
    </>
  );
};
