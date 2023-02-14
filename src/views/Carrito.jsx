import carritoContext from "../contexts/ContextCarrito";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
    const { state, increaseQuantity, decreaseQuantity, removePizza } =
        useContext(carritoContext);

    const navigate = useNavigate();

    // Calcula el total de la compra
    const total = state.cart.reduce(
        (acc, item) => acc + item.price * item.cantidad,
        0
    );

    // Guarda en local storage las pizzas agregadas al carrito. En React no se puede usar localStorage directamente, por eso se usa useEffect.
    useEffect(() => {
        const pizzasAgregadas = state.cart.map((pizza) => pizza.id);
        localStorage.setItem(
            "pizzasAgregadas",
            JSON.stringify(pizzasAgregadas)
        );
    }, []);

    return (
        <div className='container my-5 pt-4 d-flex flex-column justify-content-center align-items-center'>
        {/* Si el carrito está vacío, muestra un mensaje y un botón para volver a Home. Si no, muestra el carrito. */}
            {state.cart.length === 0 ? (
                <>
                    <h4 className='mt-4'>No hay productos en el carrito</h4>
                    <button
                        className='btn btn-warning mt-3'
                        onClick={() => navigate("/home")}
                    >
                        Volver a Home
                    </button>
                </>
            ) : (
                <>
                    <h2>Carrito</h2>
                    {/* Mapea el carrito y muestra cada pizza agregada */}
                    {state.cart.map((pizza) => (
                        <div
                            key={pizza.id}
                            className='border border-success-subtle pt-2 pb-1 px-2 mb-2'
                            style={{ width: "750px" }}
                        >
                            <div className='row align-items-center'>
                                <div className='col'>
                                    <img
                                        src={pizza.img}
                                        alt={pizza.name}
                                        style={{ width: "120px" }}
                                    />
                                </div>
                                <div className='col'>
                                    <span className='text-capitalize fw-bold'>
                                        {pizza.name}
                                    </span>
                                </div>
                                <div className='col'>
                                    <button
                                        onClick={() => decreaseQuantity(pizza)}
                                        className='btn btn-outline-light btn btn-lg p-0'
                                        title='Disminuir cantidad'
                                    >
                                        ➖
                                    </button>
                                    <span className='fw-bold fs-5 px-1'>
                                        {pizza.cantidad}
                                    </span>
                                    <button
                                        onClick={() => increaseQuantity(pizza)}
                                        className='btn btn-outline-light btn btn-lg p-0'
                                        title='Aumentar cantidad'
                                    >
                                        ➕
                                    </button>
                                </div>
                                <div className='col'>
                                    <button
                                        onClick={() => removePizza(pizza)}
                                        className='btn btn-outline-danger'
                                        title='Eliminar pizza del carrito'
                                    >
                                        ❌Eliminar
                                    </button>
                                </div>
                                <div className='col-4'>
                                    <span>
                                        ${pizza.price} x {pizza.cantidad}{" "}
                                        unidad/es = $
                                        {pizza.price * pizza.cantidad}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='d-flex pt-2'>
                        <h4 className='pt-3'>Total a pagar: ${total}</h4>
                        {total > 0 && (
                            <button className='btn btn-primary btn-lg ms-3 mt-2'>
                                Ir a pagar
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Carrito;
