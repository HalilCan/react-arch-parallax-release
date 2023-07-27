import React, { useRef, useState, useLayoutEffect } from "react";

const ArchMask = ({ scale, isFixed }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        // This is what lets the mask resize itself based on the window and the container sizes
        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div ref={containerRef} style={{ position: isFixed ? "fixed" : "absolute", top: 0, left: 0, width: "100%", height: "100%", transform: `scale(${scale})`, zIndex: 2 }}>
            { dimensions.width !== 0 && dimensions.height !== 0 && (
                <svg style={{ width: "100%", height: "100%" }}>
                    <defs>
                        <mask id="archMask">
                            {/* This is the part you would change if you want a different shape. */}
                            <rect width={dimensions.width} height={dimensions.height} fill="white" />
                            <circle cx={dimensions.width / 2} cy={dimensions.height / 2} r={dimensions.width / 4} fill="black" />
                            <rect x={dimensions.width / 4} y={dimensions.height / 2} width={dimensions.width / 2} height={dimensions.height / 2} fill="black" />
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="white" mask="url(#archMask)" />
                </svg>
            )}
        </div>
    );
};

export default ArchMask;
