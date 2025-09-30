import React, { createContext, useContext, useState } from 'react';

interface Medicamento {
  id: string;
  nome: string;
  horario: string;
  dosagem: string;
  duracao: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

interface MedicamentosContextType {
  medicamentos: Medicamento[];
  adicionarMedicamento: (medicamento: Omit<Medicamento, 'id'>) => void;
  removerMedicamento: (id: string) => void;
}

const MedicamentosContext = createContext<MedicamentosContextType | undefined>(undefined);

export function MedicamentosProvider({ children }: { children: React.ReactNode }) {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  const adicionarMedicamento = (medicamento: Omit<Medicamento, 'id'>) => {
    const novoMedicamento = {
      ...medicamento,
      id: Date.now().toString(),
    };
    setMedicamentos([...medicamentos, novoMedicamento]);
  };

  const removerMedicamento = (id: string) => {
    setMedicamentos(medicamentos.filter(med => med.id !== id));
  };

  return (
    <MedicamentosContext.Provider value={{ medicamentos, adicionarMedicamento, removerMedicamento }}>
      {children}
    </MedicamentosContext.Provider>
  );
}

export function useMedicamentos() {
  const context = useContext(MedicamentosContext);
  if (!context) {
    throw new Error('useMedicamentos deve ser usado dentro de MedicamentosProvider');
  }
  return context;
}