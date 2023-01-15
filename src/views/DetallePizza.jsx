import { useParams } from "react-router-dom";
import carritoContext from "../contexts/ContextCarrito";
import { useContext } from "react";

const DetallePizza = () => {
    const { id } = useParams();
    const { state, setState, pizzasAgregadas, setPizzasAgregadas } =
        useContext(carritoContext);
    const pizza = state.data.filter((pizza) => pizza.id === id)[0];

    const addToCart = (pizza) => {
        if (pizzasAgregadas.includes(pizza.id)) {
            return;
        }
        setState((prevState) => {
            const newCart = [...prevState.cart, { ...pizza, cantidad: 1 }];
            return { ...prevState, cart: newCart };
        });
        setPizzasAgregadas([...pizzasAgregadas, pizza.id]);
    };

    return (
        <>
            <div className='container mt-5 pt-4 d-flex flex-column align-items-center justify-content-center'>
                <div className='card mb-3' style={{ maxWidth: 900 }}>
                    <div className='row g-0'>
                        <div className='col-6'>
                            <img
                                src={pizza.img}
                                className='img-fluid h-100'
                                alt={pizza.name}
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className='col-md-6'>
                            <div className='card-body'>
                                <h5 className='card-title text-capitalize'>
                                    {pizza.name}
                                </h5>
                                <p className='card-text'>{pizza.desc}</p>
                                <ul className='list-group list-group-flush text-center d-flex flex-column align-items-center'>
                                    <span className='fw-bold'>
                                        {" "}
                                        Ingredientes:{" "}
                                    </span>
                                    {pizza.ingredients.map((ingredient, i) => (
                                        <li
                                            key={i}
                                            className='list-group-item w-50'
                                        >
                                            {" "}
                                            {ingredient}{" "}
                                        </li>
                                    ))}
                                </ul>
                                <h5 className='text-center p-1'>
                                    {" "}
                                    Precio: ${pizza.price}{" "}
                                </h5>
                            </div>
                            <div className='d-flex flex-column pb-3 px-5'>
                                <button
                                    className='btn btn-success btn-lg fs-5'
                                    type='button '
                                    onClick={() => addToCart(pizza)}
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetallePizza;
