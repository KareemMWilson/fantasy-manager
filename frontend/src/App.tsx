import "./App.css";
import Navigation from "@/pages/Navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { ChakraProvider } from "@chakra-ui/react";
import system from "./theme/theme";
import { Toaster } from "./components/Toaster";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider value={system}>
          <Navigation />
          <Toaster />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
