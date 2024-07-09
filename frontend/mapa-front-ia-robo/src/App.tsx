import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout, NotFound } from "./components";
import { Home, Robos } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
          errorElement={<NotFound />}
        >
          <Route
            index={true}
            element={<Home />}
          />
          <Route
            path="/robos"
            element={<Robos />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
