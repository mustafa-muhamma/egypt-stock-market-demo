// import { useEffect, useRef, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// export interface StockData {
//   symbol: string;
//   name: string;
//   price: number;
//   change: number;
//   percent: number;
//   updated: string;
// }

// export function useStocksSocket(initialSymbols: string[] = []) {
//   const [stocks, setStocks] = useState<Record<string, StockData | undefined>>({});
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     const socket = io(process.env.NEXT_PUBLIC_API_URL, {
//       transports: ['websocket'],
//     });
//     socketRef.current = socket;

//     socket.emit('subscribe', { symbols: initialSymbols });

//     socket.on('stock_update', (payload: Record<string, any>) => {
//       setStocks((prev) => ({ ...prev, ...payload }));
//     });

//     // cleanup
//     return () => {
//       socket.disconnect();
//     };
//   }, [initialSymbols.join('_')]);

//   return stocks;
// }
import { useEffect, useRef, useState } from "react";

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percent: number;
  updated: string;
}

export function useStocksStream() {
  const [stocks, setStocks] = useState<Record<string, StockData>>({});
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Connect directly to your Next.js API route
    const eventSource = new EventSource("/api/events");
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data: StockData[] = JSON.parse(event.data);

        // Convert array to { symbol: data } shape
        const mapped = data.reduce((acc, item) => {
          acc[item.symbol] = item;
          return acc;
        }, {} as Record<string, StockData>);

        setStocks(mapped);
      } catch (err) {
        console.error("Error parsing SSE data:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return stocks;
}
