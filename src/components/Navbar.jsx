import { NavLink } from "react-router-dom";
import carritoContext from "../contexts/ContextCarrito";
import { useContext } from "react";
import pizzaIcon from "../assets/img/pizza-icon.png";

const Navbar = () => {
    const { state, setTotal } = useContext(carritoContext);
    const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");

    const total = state.cart.reduce(
        (acc, item) => acc + item.price * item.cantidad,
        0
    );
    setTotal(total);

    return (
        <nav className='navbar navbar-dark bg-dark px-5 fixed-top'>
            <div className='container justify-content-between'>
                <NavLink className={setActiveClass} to='/'>
                    <div className='navbar-brand'>
                        <img
                            src={pizzaIcon}
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                            alt=''
                        />
                        <span className='brand-text'>¡Mamma Mía!</span>
                    </div>
                </NavLink>
                <section>
                    <NavLink className={setActiveClass} to='/home'>
                        <span className='text-light fs-4 hover'>🏠Home</span>
                    </NavLink>

                    {" - "}
                    {" - "}

                    <NavLink className={setActiveClass} to='/carrito'>
                        <span className='text-light fs-4 hover'>
                            🛒Carrito: ${total}
                        </span>
                    </NavLink>
                </section>
            </div>
        </nav>
    );
};

export default Navbar;
