import "../styles/global.css";
import { Slot } from "expo-router";
import { MedicamentosProvider } from "../components/MedicamentosContext";

export default function RootLayout() {
  return (
    <MedicamentosProvider>
      <Slot />
    </MedicamentosProvider>
  );
}
