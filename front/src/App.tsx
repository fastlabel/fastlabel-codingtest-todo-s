import React from "react";
import Index from "./pages/Index";
import { TodoStore } from "./stores/todo-store";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3} hideIconVariant>
        <TodoStore.Provider>
          <Index />
        </TodoStore.Provider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
