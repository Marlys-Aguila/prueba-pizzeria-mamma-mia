import github from "../assets/img/github.png";
import linkedin from "../assets/img/linkedin.png";

const Footer = () => {
    return (
        <div className='bg-dark text-light text-center footer d-flex justify-content-around align-items-center'>
            <p className='lead mb-0'>
                {" "}
                Sitio Web creado por Marlys A. &copy; 2023{" "}
            </p>
            <div className='d-flex justify-content-center align-items-center'>
                <div>
                    <a
                        href='https://github.com/Marlys-Aguila'
                        target='_blank'
                        rel='noreferrer'
                    >
                        {" "}
                        <img
                            src={github}
                            className='social-logo pe-2'
                            alt='Ir a mi Github'
                            title='Ir a mi Github'
                        />{" "}
                    </a>
                </div>

                <div>
                    <a
                        href='https://www.linkedin.com/in/mvau/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        {" "}
                        <img
                            src={linkedin}
                            className='social-logo'
                            alt='Ir a mi LinkedIn'
                            title='Ir a mi LinkedIn'
                        />{" "}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
