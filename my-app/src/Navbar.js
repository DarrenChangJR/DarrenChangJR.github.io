import { Link } from 'react-router-dom';

function Navbar() {
    function closeOffcanvas() {
        document.querySelector('[aria-label="Close"]').click();
    }
    return (
        <nav className="navbar sticky-top bg-white">
            <div className="container-fluid">
                <h2 className="mx-3">Darren Chang JR</h2>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <em className="offcanvas-title" id="offcanvasNavbarLable">"Where will my feet take me today?"</em>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {/* <li className="nav-item">
                                <Link to="/blog" className="nav-link navbar-collapse" onClick={closeOffcanvas} >Blog</Link>
                            </li> */}
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Literature
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                    <li className="nav-item">
                                        <Link to="/literature/learning" className="ps-2 nav-link navbar-collapse" onClick={closeOffcanvas} >Learning & Notes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/literature/poems" className="ps-2 nav-link navbar-collapse" onClick={closeOffcanvas} >Poems</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
