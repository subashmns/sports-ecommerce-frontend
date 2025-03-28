import { Link } from 'react-router-dom'
import './nav.css'
import { useContext } from 'react'
import { CartContext } from '../customer/card/cartContext'


function NavBar() {

    const { count, setSearch } = useContext(CartContext)
    return (
        <div className="main-navbar shadow-sm sticky-top pe-0">
            <div className="top-navbar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                            <h5 className="brand-name">Sports Ecom</h5>
                        </div>
                        <div className="col-md-5 my-auto">
                            <form role="search" className="search-form">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="Search your product"
                                        className="form-control"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <span className="btn bg-white" type="submit">
                                        <i className="fa fa-search"></i>                                   
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 my-auto">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <Link to='/viewcart' className="nav-link" >
                                        <i className="fa fa-shopping-cart"></i> Cart ({count})
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/wishlist' className="nav-link">
                                        <i className="fa fa-heart"></i> Wishlist (0)
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa fa-user"></i> Username
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link to='/profile/:id' className="dropdown-item"><i className="fa fa-user"></i> Profile</Link></li>
                                        <li><Link to='/profile/my-order/:id' className="dropdown-item"><i className="fa fa-list"></i> My Orders</Link></li>
                                        <li><Link to='/profile/my-wishlist/:id' className="dropdown-item"><i className="fa fa-heart"></i> My Wishlist</Link></li>
                                        <li><Link to='/profile/my-cart/:id' className="dropdown-item"><i className="fa fa-shopping-cart"></i> My Cart</Link></li>
                                        <li className="dropdown-item btn" onClick={() =>{ 
                                            localStorage.removeItem('authToken')
                                            localStorage.removeItem('google_email')
                                            localStorage.removeItem('cartItems')
                                            localStorage.removeItem('user')
                                            }} ><i className="fa fa-sign-out"></i> Logout</li>

                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <span className="navbar-brand d-block d-sm-block d-md-none d-lg-none" >
                        Sports Ecom
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/Products' className="nav-link">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/all-categories' className="nav-link" >All Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/new-arrivals' className="nav-link" >New Arrivals</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
