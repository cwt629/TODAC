import React, { useEffect, useState } from 'react';

const PointChargeContent = (props) => {
    const [temppoint, setTemppoint] = useState();
    return (
        <div>
            <div id="card-display">
                <button className="card-wrapper" type="button" onClick={props.setPoint5000}>
                    <div className="card">
                        <span
                            style={{ position: "absolute", left: "10px", top: "15px", color: "white", fontSize: "12px" }}>Todac Gift Point</span>
                        <span
                            style={{ position: "absolute", right: "5%", bottom: "5%", color: "white", fontSize: "150%" }}>₩5,000</span>

                        <i className="card-brand fa-solid fa-fork-knife"></i>
                        <i className="card-icon fa-duotone fa-ice-cream"></i>
                    </div>
                    <div className="card-chef">
                        <i className="fa-solid fa-user-chef"></i>
                        <i className="fa-regular fa-fire"></i>
                    </div>
                </button>
                <button className="card-wrapper" type="button" onClick={props.setPoint10000}>
                    <div className="card" style={{ background: "skyblue" }}>
                        <span
                            style={{ position: "absolute", left: "10px", top: "15px", color: "white", fontSize: "12px" }}>Todac Gift Point</span>
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
                            style={{ position: "absolute", left: "10px", top: "15px", color: "white", fontSize: "12px" }}>Todac Gift Point</span>
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
                <div className="card-wrapper" type="button">
                    <div className="card" style={{ background: "#5279FD" }}>
                        <span
                            style={{ position: "absolute", left: "10px", top: "15px", color: "white", fontSize: "12px" }}>Todac Gift Point</span>
                        <span
                            style={{
                                position: "absolute",
                                left: "50%",
                                bottom: "5%",
                                color: "white",
                                fontSize: "150%"
                            }}>₩
                            <input className='myplaceholder' style={{
                                width: "70%",
                                border: "none",
                                borderRight: "0px",
                                borderLeft: "0px",
                                borderTop: "0px",
                                borderBottom: "0px",
                                background: "unset",
                                color: "white"
                            }}
                                type={"text"} value={temppoint}
                                placeholder='직접입력'
                                onChange={(e) => {
                                    setTemppoint(e.target.value);
                                    props.setPointAmount(e.target.value);
                                }} />
                        </span>
                        <i className="card-brand fa-solid fa-fork-knife"></i>
                        <i className="card-icon fa-duotone fa-burger-soda"></i>
                    </div>
                    <div className="card-chef">
                        <i className="fa-solid fa-user-chef"></i>
                        <i className="fa-regular fa-fire"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointChargeContent;