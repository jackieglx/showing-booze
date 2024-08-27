import React from 'react'
import {Form, redirect, useNavigation} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({request}) => {
    const formData = await request.formData();
    //data的格式是：{key:value}
    const data = Object.fromEntries(formData);
    try {
        const response = await axios.post(newsletterUrl, data);
        toast.success(response.data.msg);
        return redirect('/');
    } catch (e) {
        console.log('error = ')
        console.log(e)
        toast.error(e?.response?.data?.msg);
        return e;
    }
}


const Newsletter = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Form className="form" method='POST'>
            <h4 style={{textAlign: 'center', marginBottom: '2rem'}}>
                our newsletter
            </h4>
            <div className="form-row">
                <label htmlFor="name" className="form-label">first name</label>
                <input type="text" className="form-input" name='name' id='name' required/>
            </div>
            <div className="form-row">
                <label htmlFor="lastName" className="form-label">last name</label>
                <input type="text" className="form-input" name='lastName' id='lastName' required/>
            </div>
            <div className="form-row">
                <label htmlFor="email" className="form-label">email</label>
                <input type="email" className="form-input" name='email' id='ema' defaultValue='test@test.com' required/>
            </div>
            <button type='submit' className="btn btn-block" style={{marginTop: '0.5rem'}}
                    disabled={isSubmitting}
            >
                {isSubmitting ? 'submitting' : 'submit'}
            </button>
        </Form>
    )
}
export default Newsletter
