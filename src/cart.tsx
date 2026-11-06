import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode
} from 'react';

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

type Action =
  | { type: 'add'; item: Omit<CartLine, 'qty'> }
  | { type: 'set'; id: string; qty: number }
  | { type: 'clear' };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const found = state.find((l) => l.id === action.item.id);
      if (found) return state.map((l) => (l.id === found.id ? { ...l, qty: l.qty + 1 } : l));
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'set':
      return action.qty <= 0
        ? state.filter((l) => l.id !== action.id)
        : state.map((l) => (l.id === action.id ? { ...l, qty: action.qty } : l));
    case 'clear':
      return [];
  }
}

export interface Toast {
  key: number;
  text: string;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  total: number;
  add: (item: Omit<CartLine, 'qty'>) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toast: Toast | null;
  dismissToast: () => void;
  drawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [toast, setToast] = useState<Toast | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const add = useCallback((item: Omit<CartLine, 'qty'>) => {
    dispatch({ type: 'add', item });
    setToast({ key: Date.now(), text: `${item.name} adicionado ao carrinho` });
  }, []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'set', id, qty }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const dismissToast = useCallback(() => setToast(null), []);
  const openCart = useCallback(() => setDrawerOpen(true), []);
  const closeCart = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.price, 0),
      add,
      setQty,
      clear,
      toast,
      dismissToast,
      drawerOpen,
      openCart,
      closeCart
    }),
    [lines, toast, drawerOpen, add, setQty, clear, dismissToast, openCart, closeCart]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart fora do CartProvider');
  return ctx;
}
