import * as React from "react";
const LineArrowLeft = (props) => (
    <svg
        width={36}
        height={36}
        viewBox="0 0 36 36"
        fill="none"
        {...props}
    >
        <path
            d="M14.355 8.89502L5.25 18L14.355 27.105"
            stroke="#10411B"
            strokeOpacity={0.5}
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            opacity={0.4}
            d="M30.75 18H5.505"
            stroke="#10411B"
            strokeOpacity={0.5}
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default LineArrowLeft;
