import React, { useEffect } from 'react';
import "./OneCoin.css";
import gsap, { Power2, Elastic, Bounce } from 'gsap';


const OneCoinOneHeart = () => {
    useEffect(() => {
        const tm = gsap.timeline({
            onComplete: function () {
                tm.reverse();
            },
            onReverseComplete: function () {
                tm.play();
            }
        });

        tm.to('#coin', .25, { y: 120, ease: Power2.easeInOut, transformOrigin: '50% 50%', rotation: 360 }, '+=.5')
            .to("#unbend", .25, { morphSVG: "#bend", ease: Elastic.easeInOut }, '-=.13')
            .to('#slit', .25, { scaleX: 0, ease: Power2.easeInOut, transformOrigin: '50% 50%' }, '-=.25')
            .to('#phone', .25, { y: 10, ease: Bounce.easeInOut }, '-=.13')
            .to('#hole', .25, { scale: .95, transformOrigin: '50% 50%', ease: Bounce.easeInOut }, '-=.25')
            .to('#heart', .25, { scale: .9, transformOrigin: '50% 50%', ease: Bounce.easeInOut })
            .to('#heart', .25, { scale: 1, transformOrigin: '50% 50%', ease: Bounce.easeInOut })
            .to('#heart', .25, { scale: .9, transformOrigin: '50% 50%', ease: Bounce.easeInOut })
            .to('#heart', .25, { scale: 1, transformOrigin: '50% 50%', ease: Bounce.easeInOut });

        // Cleanup function
        return () => {
            tm.kill(); // Cleanup GSAP animation
        };
    }, []); // Run only once on component mount
    return (
        <div>
            <svg width="auto" height="auto" viewBox="0 0 800 600">
                <ellipse id="hole" fill="#127795" cx="400" cy="455.2" rx="53" ry="14.8"/>
                <g id="phone">
                    <path fill="none" stroke="#127795" strokeWidth="5" d="M260.4,253.1c-6.7,5-8.1,9.1-3.1,9.1h284.4c5,0,4.5-4.1-1-9.1l-18.9-18.2
            c-4.9-5-11.8-9.1-15.4-9.1H300.9c-3.6,0-11.4,4.1-17.4,9.1L260.4,253.1z"/>
                    <path fill="#FFFFFF"
                          d="M249.7,381.4c0,5,4,9,9,9H540c5,0,9-4,9-9V260.6c0-5-4-9-9-9H258.7c-5,0-9,4-9,9V381.4z"/>
                    <path id="unbend" fill="#127795" d="M534,249.3H266c-8,0-14.5,6.5-14.5,14.5v114c0,8,6.5,14.5,14.5,14.5h107.4h4.5H388h11.1h1.8
            h12.2h10.1h6.3H534c8,0,14.5-6.5,14.5-14.5v-114C548.5,255.8,542,249.3,534,249.3z M543.5,377.8c0,5.2-4.3,9.5-9.5,9.5H433.2h-13.5
            h-9.9h-10h-8.3h-10h-12.4H266c-5.2,0-9.5-4.3-9.5-9.5v-114c0-5.2,4.3-9.5,9.5-9.5h268c5.2,0,9.5,4.3,9.5,9.5V377.8z"/>
                    <path id="bend" fill="#127795" d="M534,249.3H266c-8,0-14.5,6.5-14.5,14.5v114c0,8,6.5,14.5,14.5,14.5l107.4,0
            c2.2,0.3,3.5,1.9,4.5,3.8c2.7,5.4,9.5,16.7,10.1,17.8c0.4,0.9,3.9,7.2,11.1,8.5c0.6,0.1,1.2,0.2,1.8,0.2c7,0,12-7.4,12.2-7.8
            l10.1-16.2c0-0.1,2.3-4.3,6.3-6.3H534c8,0,14.5-6.5,14.5-14.5v-114C548.5,255.8,542,249.3,534,249.3z M543.5,377.8
            c0,5.2-4.3,9.5-9.5,9.5l-100.8,0c-9.3-0.6-13.5,8.2-13.5,8.2l-9.9,16.1c0,0.1-4.6,6.9-10,5.9c-5.6-1-8.3-6.4-8.3-6.4
            c0,0-7.3-12.4-10-17.8c-3.2-6.5-12.4-6-12.4-6H266c-5.2,0-9.5-4.3-9.5-9.5v-114c0-5.2,4.3-9.5,9.5-9.5h268c5.2,0,9.5,4.3,9.5,9.5
            V377.8z"/>
                    <circle fill="none" stroke="#127795" strokeWidth="4" cx="277" cy="323" r="12"/>
                    <path id="heart" fill="#F05F66" d="M435,324.5c2.8-4.1,3.8-8.7,3.8-14c0-12.7-10.3-23-23-23c-6.1,0-11.6,2.4-15.8,6.2
            c-4.1-3.9-9.7-6.2-15.8-6.2c-12.7,0-23,10.3-23,23c0,5.3,1.8,10.1,4.8,14h0c0,0,4.8,8,11.8,14.9c9.4,9.4,22.2,19.1,22.2,19.1
            s12.5-9.9,22.5-19.3C429.8,332.4,435,324.5,435,324.5z"/>
                    <line fill="none" stroke="#127795" strokeWidth="4" strokeLinecap="round" x1="527.8" y1="310.5"
                          x2="527.8" y2="335.5"/>
                    <circle fill="#127795" cx="527.8" cy="300.5" r="3.8"/>
                    <circle fill="#127795" cx="536.3" cy="323" r="2.8"/>
                    <rect x="299.3" y="250" fill="#127795" width="4" height="140"/>
                    <rect x="511.3" y="249.7" fill="#127795" width="4" height="141.3"/>
                    <line id="slit" fill="none" stroke="#127795" strokeWidth="4" strokeLinecap="round" x1="355.8"
                          y1="238.1" x2="444.2" y2="238.1"/>
                </g>
                <g clipPath="url(#SVGID_2_)">
                    <defs>
                        <rect id="SVGID_1_" x="339.3" y="72.7" width="119.3" height="165.7"/>
                    </defs>
                    <clipPath id="SVGID_2_">
                        <use xlinkHref="#SVGID_1_" overflow="visible"/>
                    </clipPath>
                    <g id="coin">
                        <circle fill="#6DC182" stroke="#127795" strokeWidth="4" cx="400" cy="152.8" r="32.2"/>
                        <circle fill="#6DC182" stroke="#127795" strokeWidth="4" cx="400" cy="159.2" r="32.2"/>
                        <line fill="none" stroke="#127795" strokeWidth="2" x1="395" y1="120.5" x2="395" y2="129"/>
                        <line fill="none" stroke="#127795" strokeWidth="2" x1="387.5" y1="122.5" x2="387.5" y2="131"/>
                        <line fill="none" stroke="#127795" strokeWidth="2" x1="402.5" y1="120.5" x2="402.5" y2="128"/>
                        <line fill="none" stroke="#127795" strokeWidth="2" x1="411" y1="121.5" x2="411" y2="130"/>
                        <path fill="none" stroke="#127795" strokeWidth="2" strokeLinecap="round"
                              d="M380,143c0,0-4,4.5-5.2,11.3"/>
                        <path fill="none" stroke="#127795" strokeWidth="2" strokeLinecap="round"
                              d="M373.9,161.6c0,0,0.4,8.6,7.8,15.5"/>
                        <circle fill="#127795" cx="383" cy="140.8" r="1"/>
                        <path fill="#127795" d="M397,184.3v-5.3c-3.8-0.2-7.4-1.2-9.6-2.4l1.7-6.6c2.4,1.3,5.7,2.5,9.3,2.5c3.3,0,5.5-1.3,5.5-3.5
                c0-2.1-1.8-3.5-6-4.9c-6-2-10.1-4.8-10.1-10.3c0-5,3.5-8.9,9.5-10v-5.3h5.5v4.9c3.7,0.1,6.2,1,8.2,1.9l-1.7,6.4
                c-1.4-0.7-4-2-8.1-2c-3.7,0-4.8,1.6-4.8,3.2c0,1.8,2,3,6.8,4.8c6.7,2.4,9.3,5.5,9.3,10.6c0,5-3.5,9.3-10,10.3v5.8H397z"/>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default OneCoinOneHeart;