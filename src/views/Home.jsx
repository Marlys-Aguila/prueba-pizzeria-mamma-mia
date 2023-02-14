import carritoContext from "../contexts/ContextCarrito";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    const { state, pizzasAgregadas, addToCart } = useContext(carritoContext);
    const navigate = useNavigate();

    return (
        <>
            <Header />

            <div
                className='row align-items-center justify-content-center gap-4 mt-5 mb-3'
                id='listado-pizzas'
            >
                {state.data.map((pizza) => (
                    <div
                        className='card border-success'
                        style={{ width: "23rem" }}
                        key={pizza.id}
                    >
                        <img
                            src={pizza.img}
                            className='card-img-top card-img'
                            alt={pizza.name}
                        />
                        <div className='card-body'>
                            <h3 className='card-title text-center text-capitalize'>
                                {" "}
                                {pizza.name}{" "}
                            </h3>
                            <ul className='list-group list-group-flush text-center'>
                                {pizza.ingredients.map((ingredient, i) => (
                                    <li key={i} className='list-group-item'>
                                        {" "}
                                        {ingredient}{" "}
                                    </li>
                                ))}
                            </ul>
                            <h5 className='text-center p-1'>
                                {" "}
                                Precio: ${pizza.price}{" "}
                            </h5>
                            <div className='d-flex justify-content-evenly pt-1'>
                                <button
                                    className='btn btn-success'
                                    type='button'
                                    to={`pizza/${pizza.id}`}
                                    onClick={() =>
                                        navigate(`/detalle-pizza/${pizza.id}`)
                                    }
                                >
                                    Ver Detalle
                                </button>
                                <button
                                    className='btn btn-danger'
                                    type='button'
                                    onClick={() => addToCart(pizza)}
                                    disabled={pizzasAgregadas.includes(
                                        pizza.id
                                    )}
                                >
                                    {pizzasAgregadas.includes(pizza.id)
                                        ? "Agregado al carrito"
                                        : "Agregar"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
};

export default Home;
