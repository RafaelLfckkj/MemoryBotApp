import "../styles/global.css";
import { Slot } from "expo-router";
import { MedicamentosProvider } from "../components/MedicamentosContext";
import { LembretesProvider } from "../components/LembretesContext";
import { ESP32Provider } from "../components/ESP32Context";

export default function RootLayout() {
  return (
    <MedicamentosProvider>
      <LembretesProvider>
        <ESP32Provider>
          <Slot />
        </ESP32Provider>
      </LembretesProvider>
    </MedicamentosProvider>
  );
}
