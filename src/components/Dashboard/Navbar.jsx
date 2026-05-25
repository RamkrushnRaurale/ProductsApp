import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import images from "../Assets/Images/images.png"

export default function Navbar(props) {

    const [text, setText] = useState("Search Here");

    function onChangeHandlers(event) {
        setText(event.target.value);
    }

    return (

        <>
            <nav style={{ boxShadow: "10px 0 5px grey",width:"83%", background:"white",right:"0",position:"fixed",top:"0",zIndex:"9"}} className="navbar navbar-expand-lg navbar-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand mx-2" to="/"><img style={{
                        width: "100px",
                        borderRadius: "5px", boxShadow: "0px 0 5px black"
                    }} src={images} alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      
                        <div style={{position:"absolute",right:"0",width:"50%"}} >
                            <form className="d-flex">
                                <input className="form-control me-2" value={text} onChange={onChangeHandlers} type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-primary " type="submit">Search</button>
                                <button className="btn mx-5" style={{ right: "0", background: "white", boxShadow: "0px 0 5px grey" }} type='button'><Link aria-current="page" className="text-decoration-none text-dark " to="/SignIn">LogOut</Link></button>

                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}
