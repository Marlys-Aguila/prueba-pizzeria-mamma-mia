import { createContext } from "react";
import { useState } from "react";
import { data } from "../data/pizzas";

const carritoContext = createContext();

const CarritoProvider = ({ children }) => {
    const [state, setState] = useState({
        data: data.map((p) => ({ ...p, cantidad: 0 })),
        cart: [],
    });

    const [total, setTotal] = useState(0);
    const [pizzasAgregadas, setPizzasAgregadas] = useState([]);

    const increaseQuantity = (pizza) => {
        if (pizza.cantidad < 9) {
            setState((state) => {
                const newCart = state.cart.map((p) =>
                    p.id === pizza.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
                return { ...state, cart: newCart };
            });
            calculateTotal();
        }
    };

    const decreaseQuantity = (pizza) => {
        if (pizza.cantidad > 1) {
            setState((state) => {
                const newCart = state.cart.map((p) =>
                    p.id === pizza.id ? { ...p, cantidad: p.cantidad - 1 } : p
                );
                return { ...state, cart: newCart };
            });
            calculateTotal();
        }
    };

    const removePizza = (pizza) => {
        setState((state) => {
            const newCart = state.cart.filter((p) => p.id !== pizza.id);
            return { ...state, cart: newCart };
        });
        setPizzasAgregadas(pizzasAgregadas.filter((id) => id !== pizza.id));
        calculateTotal();
    };

    const calculateTotal = () => {
        state.cart.forEach((pizza) => {
            total += pizza.cantidad * pizza.price;
        });
        setTotal(total);
    };

    const datacontext = {
        state,
        setState,
        total,
        setTotal,
        increaseQuantity,
        decreaseQuantity,
        removePizza,
        pizzasAgregadas,
        setPizzasAgregadas,
    };

    return (
        <carritoContext.Provider value={datacontext}>
            {children}
        </carritoContext.Provider>
    );
};

export default carritoContext;
export { CarritoProvider };
