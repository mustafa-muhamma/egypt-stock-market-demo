"use client";
import { useStocksSocket } from '../hooks/useStocksSocket';
import StocksTable from './components/StocksTable';
import ThemeToggle from './components/ThemeToggle';

export default function Page() {
  // جميع الرموز المصرية التجريبية
  const stockSymbols = [
    "COMI", "EFG Hermes", "AMOC", "ORWE", "FWRY", "ESRS", "EGCH", "JUFO", "CIEB", "ETEL", "MNHD", "ELKA", "PHDC", "SWDY", "TALA", "HRHO", "SKTM", "CLHO", "AMER", "CCAP"
  ];
  const stocks = useStocksSocket(stockSymbols);

  return (
    <main className="max-w-6xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-extrabold mb-2" style={{letterSpacing:'0.01em'}}>لوحة أسعار الأسهم المصرية <span className="text-blue-700 font-bold">(لحظي)</span></h1>
      <p className="mb-6 text-lg text-gray-600" style={{fontWeight:500}}>تحديث لحظي، بيانات تجريبية سوقية ممتدة، تلوين تفاؤلي/تشاؤمي، دعم كامل للوضع الليلي/النهاري.</p>
      <div className="card">
        <StocksTable stocks={stocks} />
      </div>
      <ThemeToggle />
    </main>
  );
}
