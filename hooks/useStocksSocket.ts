import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percent: number;
  updated: string;
}

export function useStocksSocket(initialSymbols: string[] = []) {
  const [stocks, setStocks] = useState<Record<string, StockData | undefined>>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.emit('subscribe', { symbols: initialSymbols });

    socket.on('stock_update', (payload: Record<string, any>) => {
      setStocks((prev) => ({ ...prev, ...payload }));
    });

    // cleanup
    return () => {
      socket.disconnect();
    };
  }, [initialSymbols.join('_')]);

  return stocks;
}
