// import React from 'react';
import CountUp from 'react-countup';
import PropTypes from 'prop-types'
import { TypeAnimation } from 'react-type-animation';

export const Stat = ({ heading, text, count }) => {


    return (
        <div className="shadow p-4 rounded">
            <h6 className="text-heading-6">{heading}</h6>
            <h5 className="text-heading-5-bold mt-1">
                {/* Render count if count is defined and text is not available */}
                {count !== undefined && !text && count > 0 ? (
                    <CountUp end={count} />
                ) : null}
                {/* Render "-" if count is 0 and text is not available */}
                {count !== undefined && !text && count === 0 ? "-" : null}
                {/* Render text if text is available and count is not available */}
                {text && !count ? (
                    <TypeAnimation sequence={[`${text}`]} speed={50} cursor={false} />
                ) : null}
                {/* Render "-" if count is not available and text is not available */}
                {!count && !text ? "-" : null}
            </h5>
        </div>

    );
};
export default Stat;

Stat.propTypes = {
    count: PropTypes.number || PropTypes.string,
    text: PropTypes.string,
    heading: PropTypes.string
}


