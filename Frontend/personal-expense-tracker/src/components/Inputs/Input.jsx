import React from 'react'
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({ value, placeholder, type, label, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <label className='text-[13px] text-slate-800'>{label}</label>
            <div>
                <input
                    tye={type == 'password' ? showPassword ? "text" : "password" : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none'
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {type == 'password' && (
                    <>
                        {showPassword ? (<FaRegEye
                            size={22}
                            className=''
                            onClick={() => togglePassword()}
                        />) : (<FaRegEyeSlash
                            size={22}
                            className=''
                            onClick={() => togglePassword()}
                        />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Input