import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./contexts/ContextCarrito";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import DetallePizza from "./views/DetallePizza";
import Carrito from "./views/Carrito";
import NotFound from "./views/NotFound";
import "./App.css";

function App() {
    return (
        <div className='App'>
            <CarritoProvider>
                <BrowserRouter>
                    <Navbar />

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route
                            path='/detalle-pizza/:id'
                            element={<DetallePizza />}
                        />
                        <Route path='/carrito' element={<Carrito />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </CarritoProvider>
        </div>
    );
}

export default App;
