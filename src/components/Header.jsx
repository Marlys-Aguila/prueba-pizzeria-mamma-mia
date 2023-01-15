const Header = () => {
    return (
        <div className='d-flex flex-column justify-content-center text-center text-white hero'>
            <div className='hero-content'>
                <h1 className='title'>
                    {" "}
                    <span className='first-letter'>P</span> izzería ¡
                    <span className='first-letter'>M</span>amma{" "}
                    <span className='first-letter'>M</span>ía!{" "}
                </h1>
                <h4 className='subtitle'>
                    {" "}
                    ¡Tenemos las mejores pizzas que podrás encontrar!{" "}
                </h4>
                <a href="#listado-pizzas">
                    <div className='arrow-container'>
                        <div className='chevron'></div>
                        <div className='chevron'></div>
                        <div className='chevron'></div>
                </div>
                </a>
            </div>
        </div>
    );
};

export default Header;
