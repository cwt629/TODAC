import React from 'react';

const PointChargeContent = (props) => {
    return (
        <div>
            <div id="card-display">
                <button className="card-wrapper" type="button" onClick={props.setPoint5000}>
                    <div className="card">
                        <span
                            style={{position: "absolute", left: "10px", top: "15px", color: "white", fontSize: "12px"}}>Todac Gift Point</span>
                        <span
                            style={{position: "absolute", right: "5%", bottom: "5%", color: "white", fontSize: "150%"}}>₩5,000</span>

                        <i className="card-brand fa-solid fa-fork-knife"></i>
                        <i className="card-icon fa-duotone fa-ice-cream"></i>
                    </div>
                    <div className="card-chef">
                        <i className="fa-solid fa-user-chef"></i>
                        <i className="fa-regular fa-fire"></i>
                    </div>
                </button>
                <button className="card-wrapper" type="button" onClick={props.setPoint10000}>
                    <div className="card" style={{background:"skyblue"}}>
                        <span
                            style={{position: "absolute", left: "10px", top: "15px", color: "white", fontSize: "12px"}}>Todac Gift Point</span>
                        <span
                            style={{
                                position: "absolute",
                                right: "5%",
                                bottom: "5%",
                                color: "white",
                                fontSize: "150%"
                            }}>₩10,000</span>
                        <i className="card-brand fa-solid fa-fork-knife"></i>
                        <i className="card-icon fa-duotone fa-burger-soda"></i>
                    </div>
                    <div className="card-chef">
                        <i className="fa-solid fa-user-chef"></i>
                        <i className="fa-regular fa-fire"></i>
                    </div>
                </button>
                <button className="card-wrapper" type="button" onClick={props.setPoint50000}>
                    <div className="card">
                        <span className="card-amount roboto-mono"></span>
                        <span
                            style={{position: "absolute", left: "10px", top: "15px", color: "white", fontSize: "12px"}}>Todac Gift Point</span>
                        <span
                            style={{
                                position: "absolute",
                                right: "5%",
                                bottom: "5%",
                                color: "white",
                                fontSize: "150%"
                            }}>₩50,000</span>
                        <i className="card-brand fa-solid fa-fork-knife"></i>
                        <i className="card-icon fa-duotone fa-donut"></i>
                    </div>
                    <div className="card-chef">
                        <i className="fa-solid fa-user-chef"></i>
                        <i className="fa-regular fa-fire"></i>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PointChargeContent;