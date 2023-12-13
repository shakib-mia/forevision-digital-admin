import { useState } from "react";
// import arrow from "./../../assets/icons/arrow.svg";
import PropTypes from 'prop-types'

const Button = ({ text, type, disabled, onClick, small, paddingZero, children, className }) => {
    const [focus, setFocus] = useState(false);
    // console.log(className?.includes('px'));
    return (
        <>
            {type !== "submit" && (
                <div
                    className={`border-[2px] w-fit ${className} ${focus ? "border-interactive-light-focus" : "border-transparent"
                        } rounded-full ${paddingZero ? 'p-0' : 'p-[4px]'}`}
                >
                    <button
                        className={`${small ? 'px-2 py-1' : 'px-3 py-2'} disabled:bg-interactive-light-disabled disabled:cursor-not-allowed text-white bg-interactive-light text-button hover:bg-interactive-light-hover focus:bg-interactive-light-focus active:bg-interactive-light-active font-bold rounded-full uppercase flex gap-1`}
                        onClick={() => {
                            onClick && onClick()
                            setFocus(true)
                        }}
                        disabled={disabled}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    >
                        {/* {leftIcon ? <img src={arrow} className="rotate-180" alt="left-icon" /> : <></>}
                        {text && <div>{children}</div>}
                        {rightIcon ? <img src={arrow} alt="right-icon" /> : <></>} */}
                        {children}
                    </button>
                </div>
            )}

            {type === "submit" && (
                <div
                    className={`border-[2px] inline-block w-fit ${className} ${focus ? "border-interactive-light-focus" : "border-transparent"
                        } rounded-full p-[4px]`}
                >
                    <input
                        type="submit"
                        disabled={disabled}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        className="px-[44px] py-[12px] text-white outline-[2px] outline-interactive-light bg-interactive-light text-button hover:bg-interactive-light-hover active:bg-interactive-light-active focus:bg-interactive-light-focus font-bold rounded-full cursor-pointer uppercase disabled:bg-interactive-light-disabled disabled:cursor-not-allowed"
                        value={text}
                    />
                </div>
            )}
        </>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    leftIcon: PropTypes.bool,
    rightIcon: PropTypes.bool,
    small: PropTypes.bool,
    paddingZero: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string
}

export default Button;