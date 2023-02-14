import { createContext } from "react";
import { useState } from "react";
import { data } from "../data/pizzas";

// Creación del contexto
const carritoContext = createContext();

// Componente proveedor del contexto
const CarritoProvider = ({ children }) => {
    // El estado 'state' almacena tanto los datos de todas las pizzas como también los datos de las pizzas seleccionadas (carrito)
    const [state, setState] = useState({
        data: data.map((p) => ({ ...p, cantidad: 0 })), // El estado 'data' contiene un arreglo con todas las pizzas y su cantidad inicial es cero
        cart: [], // El estado 'cart' contiene un arreglo vacío que más tarde se llena con las pizzas seleccionadas
    });

    // El estado 'total' contiene el monto total a pagar por todas las pizzas seleccionadas
    const [total, setTotal] = useState(0);

    // El estado 'pizzasAgregadas' contiene un arreglo con las ID de las pizzas seleccionadas
    const [pizzasAgregadas, setPizzasAgregadas] = useState([]);

    // La función 'calculateTotal' calcula el monto total de todas las pizzas seleccionadas
    const calculateTotal = () => {
        let newTotal = 0;
        state.cart.forEach((pizza) => {
            newTotal += pizza.cantidad * pizza.price;
        });
        setTotal(newTotal);
    };

    // La función 'addToCart' agrega una pizza seleccionada al carrito
    const addToCart = (pizza) => {
        // Si la pizza ya fue agregada al carrito, no se agrega de nuevo
        if (state.cart.some((p) => p.id === pizza.id)) {
            return;
        }
        setState((prevState) => {
            // Se crea un nuevo arreglo con todas las pizzas previamente seleccionadas y se agrega la nueva pizza seleccionada con cantidad igual a 1
            const newCart = [...prevState.cart, { ...pizza, cantidad: 1 }];
            return { ...prevState, cart: newCart };
        });
        // Llama a la función calculateTotal para recalcular el total a pagar
        calculateTotal();
        // actualiza pizzasAgregadas con la nueva pizza seleccionada
        setPizzasAgregadas([...pizzasAgregadas, pizza.id]); 
    };

    // La función 'increaseQuantity' aumenta la cantidad de una pizza seleccionada
    const increaseQuantity = (pizza) => {
        // La cantidad de cada pizza no puede superar el límite de 9 unidades
        if (pizza.cantidad < 9) {
            setState((prevState) => {
                const newCart = prevState.cart.map((p) =>
                    p.id === pizza.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
                // Se crea un nuevo arreglo de pizzas seleccionadas con la cantidad de la pizza correspondiente aumentada en 1
                return { ...prevState, cart: newCart };
            });
            calculateTotal();
        }
    };

    // La función 'decreaseQuantity' disminuye la cantidad de una pizza seleccionada
    const decreaseQuantity = (pizza) => {
        // La cantidad de cada pizza no puede ser menor que 1 unidad
        if (pizza.cantidad > 1) {
            setState((prevState) => {
                // Crea un nuevo arreglo de pizzas en el carrito, filtrando todas las pizzas que no tengan el id de la pizza pasada como parámetro
                const newCart = prevState.cart.map((p) =>
                    p.id === pizza.id ? { ...p, cantidad: p.cantidad - 1 } : p
                );
                // Se crea un nuevo arreglo de pizzas seleccionadas con la cantidad de la pizza correspondiente disminuida en 1
                return { ...prevState, cart: newCart };
            });
            calculateTotal();
        }
    };

    // La función 'removePizza' elimina una pizza seleccionada
    const removePizza = (pizza) => {
        // Actualiza el estado del carrito
        setState((prevState) => {
            const newCart = prevState.cart.filter((p) => p.id !== pizza.id);
            return { ...prevState, cart: newCart };
        });
        calculateTotal();
        // cuando se remueve una pizza se elimina su id de pizzasAgregadas
        setPizzasAgregadas(pizzasAgregadas.filter((id) => id !== pizza.id));
    };

    // Objeto que contiene el estado y las funciones del proveedor
    const datacontext = {
        state,
        setState,
        total,
        setTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removePizza,
        pizzasAgregadas,
        setPizzasAgregadas,
    };

    // Provee el contexto y sus valores a los componentes hijos
    return (
        <carritoContext.Provider value={datacontext}>
            {children}
        </carritoContext.Provider>
    );
};

// Exporta el contexto y el componente proveedor
export default carritoContext;
export { CarritoProvider };
