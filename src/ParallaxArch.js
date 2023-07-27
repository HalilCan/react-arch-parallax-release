import React, { useEffect, useRef, useState } from 'react';
import ArchMask from './ArchMask';

const ParallaxArch = () => {
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [isFixed, setIsFixed] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setScrollY(-rect.top);

                // This is the part that switches things from parallax to normal scrolling.
                // If you change the height of the content within the parallax region, you might have to change this (-790).
                // to that end, the console.log can help you. 
                console.log(rect.top);
                setIsFixed(rect.top > -790);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // This is where you change the relative zoom speeds of the arch and the content
    // As it is, the arch (mask) zooms in far faster, as parallax would work in real life.
    const scaleContent = scrollY / 1200 + 1; 
    const scaleMask = scrollY / 300 + 1;

    return (
        <div style={{ height: "100vh" }}>
            <div ref={containerRef} style={{ height: "100vh", position: "relative", overflow: "hidden", width:"100%" }}>
                <div style={{
                    position: isFixed ? "fixed" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    // This is where you set the image to be seen through the arch
                    background: `url(/Pharos-Alexandria.webp) center / cover no-repeat`,
                    transform: `scale(${scaleContent})`,
                    transformOrigin: '50% 50%',
                    zIndex: 1
                }} />

                {/* This is the arch/mask component. As we use SVG, you can use different shapes as you please. */}
                <ArchMask scale={scaleMask} isFixed={isFixed} />
            </div>
        </div>
    );
};

export default ParallaxArch;
