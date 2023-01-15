import { useNavigate } from "react-router-dom";
import notfound from "../assets/img/notfound.gif";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='mt-5 pt-5 d-flex flex-column justify-content-center align-items-center'>
            <h4 className='text-center mb-3'>
                La página a la intentas acceder no existe
            </h4>
            <img
                src={notfound}
                alt='404 Not Found'
                style={{ width: "300px" }}
            />
            <button
                className='btn btn-warning mt-3'
                onClick={() => navigate("/home")}
            >   
                Volver a Home
            </button>
        </div>
    );
};

export default NotFound;
