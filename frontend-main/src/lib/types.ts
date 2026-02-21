// Database types matching the Supabase schema

export interface TradePostDB {
  id: string;
  owner_pubkey: string;
  pair_index: number;
  position_id: bigint;
  position_type: 'Long' | 'Short';
  amount_token_out: bigint;
  entry_price: bigint;
  exit_price: bigint;
  take_profit_price: bigint | null;
  stop_loss_price: bigint | null;
  opened_at: bigint;
  closed_at: bigint;
  position_pubkey: string | null;
  open_tx_signature: string | null;
  close_tx_signature: string | null;
  author_username: string | null;
  analysis: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

// Frontend display type
export interface TradePost {
  id: string;
  author: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  entry: number;
  exit: number;
  entryTimestamp: string;
  exitTimestamp: string;
  analysis: string;
  likes: number;
  comments: number;
}

// Map pair_index to trading pair symbols
export const PAIR_SYMBOLS: Record<number, string> = {
  0: 'SOL/USDT',
  1: 'BTC/USDT',
  2: 'ETH/USDT',
  3: 'AVAX/USDT'
};

// Helper function to convert database trade to frontend format
export function convertTradePostFromDB(dbTrade: TradePostDB): TradePost {
  // Convert prices from 6-decimal integers to floats
  const entryPrice = Number(dbTrade.entry_price) / 1_000_000;
  const exitPrice = Number(dbTrade.exit_price) / 1_000_000;
  
  // Convert Unix timestamps to readable format
  const entryDate = new Date(Number(dbTrade.opened_at) * 1000);
  const exitDate = new Date(Number(dbTrade.closed_at) * 1000);
  
  const formatDate = (date: Date): string => {
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${hours}:${minutes}`;
  };
  
  return {
    id: dbTrade.id,
    author: dbTrade.author_username || 'Anonymous',
    symbol: PAIR_SYMBOLS[dbTrade.pair_index] || 'UNKNOWN',
    direction: dbTrade.position_type.toUpperCase() as 'LONG' | 'SHORT',
    entry: entryPrice,
    exit: exitPrice,
    entryTimestamp: formatDate(entryDate),
    exitTimestamp: formatDate(exitDate),
    analysis: dbTrade.analysis || 'No analysis provided.',
    likes: dbTrade.likes_count,
    comments: dbTrade.comments_count
  };
}
