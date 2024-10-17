import { useState } from "react";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name] : value
        })
    }

    const validate = () => {
        const newErrors = {};
    

        if (!values.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (/\s/.test(values.username)) {
            newErrors.username = 'Username cannot contain spaces';
        }
    
        if (!values.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
            newErrors.email = 'Email is invalid';
        } 
        
        if (!values.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(values.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
    
        if (!values.password) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    }
    return {
        values,
        errors,
        handleChange,
        validate,
        setErrors
    };
}