import './PointLogo.css';

const PointLogo = () => {
    return (
            <div className="coin">
                <div className="front jump">
                    <div className="star"/>
                    <span className="currency">$</span>
                    <div className="shapes">
                        <div className="shape_l"/>
                        <div className="shape_r"/>
                        <span className="top">TODAC</span>
                        <span className="bottom">coin</span>
                    </div>
                </div>
                <div className="shadow"/>
            </div>
    );
};

export default PointLogo;
