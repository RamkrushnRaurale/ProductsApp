import React from 'react'


function Slider() {
    return (
        <>
            <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide pt-1"
                data-bs-ride="carousel"
                style={{ width: "100%" }}
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleLight"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                        style={{ backgroundColor: "white" }}
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleLight"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                        style={{ backgroundColor: "white" }}
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleLight"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                        style={{ backgroundColor: "white" }}
                    ></button>
                </div>

                <div className="carousel-inner" style={{ height: "500px" }}>
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img
                            src="https://images-static.nykaa.com/uploads/b59d2ab5-9aee-4f26-8a12-9d0fa30e7395.gif"
                            className="d-block w-100"
                            alt="Nature"
                            style={{ height: "500px", objectFit: "cover", borderRadius: "20px" }}
                        />
                        <div style={{ color: "white" }} className="carousel-caption d-none d-md-block">
                            <h5>Beautiful Nature</h5>
                            <p>Green mountains and clear skies.</p>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="3000">
                        <img
                            src="https://cdn.shopify.com/app-store/listing_images/c7e3fe2671ce33603dd888b35526ef57/promotional_image/CL7Ru8PBypQDEAE=.jpeg?height=720&quality=90&width=1280"
                            className="d-block w-100"
                            alt="Beach"
                            style={{ height: "500px", objectFit: "cover", borderRadius: "20px" }}
                        />
                        <div style={{ color: "white" }} className="carousel-caption d-none d-md-block ">
                            <h5>Sunny Beach</h5>
                            <p>Relaxing ocean view with blue waters.</p>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="3000">
                        <img
                            src="https://www.dsers.com/blog/content/images/2025/01/Product-Offering.png"
                            className="d-block w-100"
                            alt="City"
                            style={{ height: "500px", objectFit: "cover", borderRadius: "20px" }}
                        />
                        <div style={{ color: "white" }} className="carousel-caption d-none d-md-block">
                            <h5>Modern City</h5>
                            <p>Skyscrapers and city life.</p>
                        </div>
                    </div>
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Slider
