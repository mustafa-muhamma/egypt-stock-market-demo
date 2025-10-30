import React from 'react';
import { StockData } from '../../hooks/useStocksSocket';

interface StocksTableProps {
  stocks: Record<string, StockData | undefined>;
}

export default function StocksTable({ stocks }: StocksTableProps) {
  const stockList = Object.entries(stocks);

  return (
    <div className="w-full overflow-x-auto">
      <table dir="rtl">
        <thead>
          <tr>
            <th>الرمز</th>
            <th>اسم الشركة</th>
            <th>السعر</th>
            <th>التغير</th>
            <th>النسبة</th>
            <th>آخر تحديث</th>
          </tr>
        </thead>
        <tbody>
          {stockList.length === 0 && (
            <tr><td colSpan={6} style={{textAlign:'center', opacity:0.7}}>جارِ التحميل...</td></tr>
          )}
          {stockList.map(([symbol, s], idx) => (
            <tr key={symbol} style={{background: idx%2===1 ? 'var(--color-hover)' : undefined}}>
              <td style={{fontWeight:'600'}}>{symbol}</td>
              <td style={{textAlign:'right', fontWeight:500}}>{s?.name || '-'}</td>
              <td style={{textAlign:'right'}}>{s?.price?.toFixed(2)}</td>
              <td className={typeof s?.change==="number"?(s.change>0?"green":(s.change<0?"red":"")):""} style={{textAlign:'right',fontWeight:600}}>{s?.change}</td>
              <td className={typeof s?.change==="number"?(s.change>0?"green":(s.change<0?"red":"")):""} style={{textAlign:'right'}}>{s?.percent}%</td>
              <td style={{textAlign:'right',fontSize:'0.97em',opacity:0.7}}>{s?.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
