import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";

const formValidationSchema=yup.object({
    email:yup.string().email().min(5,"need a bigger email").required(),
    password:yup.string().min(8,"Need a bigger Password").max(12,"Password too Long").required(),
})

export function BasicForm() {
    const {handleSubmit,handleChange,handleBlur,touched,values,errors}=useFormik({
        initialValues:{email:"Abhay",password:"abahha"},
        validationSchema:formValidationSchema,
        onSubmit:(values)=>{
            console.log("onsubmit", values);
        }
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" 
                placeholder='Enter Email' 
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur} />
                {touched.email && errors.email?errors.email:""}
                <input type="password"
                 placeholder='Enter Password'
                 name='password'
                 value={values.password}
                 onChange={handleChange}
                 onBlur={handleBlur} />
                 {touched.password && errors.password?errors.password:""}
                <button type='submit'>Submit</button>
                {/* {JSON.stringify(formik.values)}
                {JSON.stringify(formik.touched)} */}
            </form>
        </div>
    );
}

export default BasicForm