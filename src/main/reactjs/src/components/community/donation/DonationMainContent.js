import React from 'react';

const DonationMainContent = () => {
    return (
        <div>
            {/* Title */}
            <div className="title">
                <h1>후원의 전당</h1>
                <p>후원자분들의 후원금은 자선단체를 통해
                    <br/>도움이 필요한 분들에게 전달 됩니다.</p>
            </div>
            {/*Rancking */}
            <div className="box"> {/* #01 */}
                {/* Number*/}
                <div className="number">1</div>
                {/* Cover */}
                <div className="cover"><img src="https://m.media-amazon.com/images/I/91-kmdlsEsL._SS500_.jpg" alt=''/>
                </div>
                {/* Name */}
                <div className="name"><span>Mi gente</span> J Balin &amp; Willy William</div>
                {/* Button */}
                <div className="link"><a href="https://www.youtube.com/watch?v=wnJ6LuUFpMo">Listen</a></div>
            </div>
            {/* Separator */}
            <div className="separator"/>
            <div className="box"> {/* #02 */}
                {/* Number*/}
                <div className="number">2</div>
                {/* Cover */}
                <div className="cover"><img src="http://bit.ly/2vlCeWf" alt=''/></div>
                {/* Name */}
                <div className="name"><span>Feels</span> Calvin Harris</div>
                {/* Button */}
                <div className="link"><a href="https://www.youtube.com/watch?v=ozv4q2ov3Mk">Listen</a></div>
            </div>
            {/* Separator */}
            <div className="separator"/>
            <div className="box"> {/* #03 */}
                {/* Number*/}
                <div className="number">3</div>
                {/* Cover */}
                <div className="cover"><img src="http://bit.ly/2vlRum1" alt=''/></div>
                {/* Name */}
                <div className="name"><span>Attention</span> Charlie Puth</div>
                {/* Button */}
                <div className="link"><a href="https://www.youtube.com/watch?v=nfs8NYg7yQM">Listen</a></div>
            </div>
        </div>
    );
};

export default DonationMainContent;