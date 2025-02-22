import React, { useRef, useState } from 'react'
import '/src/style.css'

const OtpLogin = () => {
    const length = 4
    const [otpFields, setOtpFields] = useState(Array(length).fill(''))
    const otpRefsArray = useRef([]);

    const handleOnChange = (event, index) => {
        const otpFieldsCopy = [...otpFields]
        if (!isNaN(event.target.value)) {
            switch (event.target.value) {
                // If the no value has entered.
                case '0':
                    otpFieldsCopy[index] = ""
                    setOtpFields(otpFieldsCopy)
                    otpRefsArray.current[index - 1].focus
                    break;
                default:
                    const targetValue = event.target.value.slice(-1)
                    if (targetValue === " ") {
                        alert("Invalid Input.")
                        return
                    }
                    otpFieldsCopy[index] = targetValue
                    setOtpFields(otpFieldsCopy)
                    if (targetValue.length === 1 && index < length - 1) {
                        otpRefsArray.current[index + 1].focus();
                    }

                    // After last field need to remove the focus from the input field.
                    if (index === length - 1) {
                        otpRefsArray.current[index].blur();
                    }
                    break;
            }
        } else {
            alert("Invalid Input.")
        }
    }

    const handleKeyDown = (event, index) => {
        switch (event.key) {
            case 'Backspace':
                if (index > 0) {
                    const otpFieldsCopy = [...otpFields]
                    otpFieldsCopy[index] = ""
                    setOtpFields(otpFieldsCopy)
                    otpRefsArray.current[index - 1].focus();
                }
                break;
            case 'Delete':
                event.preventDefault()
                break;
        }
    }

    return (
        <div>
            <h2 className='title'>Enter your {length} digit OTP.</h2>
            <div className='container'>
                {otpFields.map((fieldValue, index) => (
                    <input
                        key={index}
                        className='otpField'
                        value={fieldValue}
                        onChange={(event) => handleOnChange(event, index)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        ref={(element) => { if (!element) return; otpRefsArray.current[index] = element }}
                    />
                ))}
            </div>
        </div>
    )
}

export default OtpLogin