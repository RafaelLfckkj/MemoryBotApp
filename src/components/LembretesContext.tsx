import React, { createContext, useContext, useState } from 'react';

interface Lembrete {
  id: string;
  nome: string;
  horarios: Array<{ hour: number; minute: number }>;
  dias: string[];
}

interface LembretesContextType {
  lembretes: Lembrete[];
  adicionarLembrete: (lembrete: Omit<Lembrete, 'id'>) => void;
  removerLembrete: (id: string) => void;
}

const LembretesContext = createContext<LembretesContextType | undefined>(undefined);

export function LembretesProvider({ children }: { children: React.ReactNode }) {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);

  const adicionarLembrete = (lembrete: Omit<Lembrete, 'id'>) => {
    const novoLembrete = {
      ...lembrete,
      id: Date.now().toString(),
    };
    setLembretes([...lembretes, novoLembrete]);
  };

  const removerLembrete = (id: string) => {
    setLembretes(lembretes.filter(lem => lem.id !== id));
  };

  return (
    <LembretesContext.Provider value={{ lembretes, adicionarLembrete, removerLembrete }}>
      {children}
    </LembretesContext.Provider>
  );
}

export function useLembretes() {
  const context = useContext(LembretesContext);
  if (!context) {
    throw new Error('useLembretes deve ser usado dentro de LembretesProvider');
  }
  return context;
}