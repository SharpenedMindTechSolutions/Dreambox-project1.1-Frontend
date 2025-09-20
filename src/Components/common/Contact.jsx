import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bgcontact from '../../assets/bgcontact.jpg';

const Contact = () => {
    const [status, setStatus] = useState({ success: '', error: '' });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().required('Message is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/contactform', values);
                setStatus({ success: response.data.message || 'Message sent successfully!', error: '' });
                resetForm();
                setTimeout(() => setStatus({ success: '', error: '' }), 3000);
            } catch (error) {
                console.error(error);
                setStatus({ success: '', error: 'Something went wrong. Please try again.' });
                setTimeout(() => setStatus({ success: '', error: '' }), 3000);
            }
        }
    });

    return (
        <div
            className='relative w-full bg-cover bg-center py-24'
            style={{
                backgroundImage: `url(${bgcontact})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            id="contact"
        >
            {/* Notification Toast */}
            {(status.success || status.error) && (
                <div className="fixed top-4 right-4 z-50 animate-slideIn">
                    <div className={`flex items-center gap-3 px-4 py-4 rounded shadow-md text-white transition-all duration-300 ${status.error ? 'bg-red-600' : 'bg-green-500'}`}>
                        {status.error ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 19c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        <span className="text-sm">{status.error || status.success}</span>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 relative z-20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white text-center p-2">
                    Contact Us
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-lg text-center mt-3 mb-10 text-white max-w-xl mx-auto">
                    Have questions or need assistance? Fill out the form below. We'll get back to you soon.
                </p>

                {/* Form with White Card Style */}
                <div className="rounded-xl shadow-lg p-8 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20">
                    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-6">
                            <label className="block text-sm sm:text-base md:text-lg font-medium text-black mb-2">
                                Name <span className='text-red-600'> *</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                {...formik.getFieldProps('name')}
                                className={`w-full border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300`}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        <div className="md:col-span-6">
                            <label className="block text-sm sm:text-base md:text-lg font-medium text-black mb-2">
                                Email <span className='text-red-600'> *</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                {...formik.getFieldProps('email')}
                                className={`w-full border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300`}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        <div className="md:col-span-12">
                            <label className="block text-sm sm:text-base md:text-lg font-medium text-black mb-2">
                                Message <span className='text-red-600'> *</span>
                            </label>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="5"
                                {...formik.getFieldProps('message')}
                                className={`w-full border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:outline-none resize-none focus:ring-2 focus:ring-gray-300`}
                            ></textarea>
                            {formik.touched.message && formik.errors.message && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-12 flex justify-center">
                            <button type="submit" className="text-white px-8 py-3.5 rounded-full btn-gradient transition">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
