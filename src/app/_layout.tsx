import "../styles/global.css";
import { Slot } from "expo-router";
import { MedicamentosProvider } from "../components/MedicamentosContext";
import { LembretesProvider } from "../components/LembretesContext";

export default function RootLayout() {
  return (
    <MedicamentosProvider>
    <LembretesProvider>
      <Slot />
    </LembretesProvider>
  </MedicamentosProvider>
  );
}
