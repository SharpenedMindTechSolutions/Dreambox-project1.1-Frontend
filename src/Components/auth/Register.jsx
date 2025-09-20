import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ type: '', message: '' });

    const validationSchema = Yup.object({
        name: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone number is required'),
        password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setToast({ type: '', message: '' });
        setIsLoading(true);
        try {
            await register(values);
            setToast({ type: 'success', message: 'Registration successful! ' });
            setTimeout(() => navigate('/login'), 2000);
            resetForm();
        } catch (err) {
            setToast({ type: 'error', message: err.response?.data?.message || 'Registration failed' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => setToast({ type: '', message: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            {toast.message && (
                <div className="fixed top-4 right-4 z-50 animate-slideIn">
                    <div
                        className={`flex items-center gap-3 px-4 py-4 rounded-md text-white shadow-md ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
                            }`}
                        role="alert"
                    >
                        {toast.type === 'error' ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 19c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        <span className="text-sm">{toast.message}</span>
                    </div>
                </div>
            )}


            <div className="max-w-xl w-full space-y-6 p-8 border rounded-md shadow-2xl">
                <h2 className="text-center text-3xl font-special-gothic text-black">Create your account</h2>

                <Formik
                    initialValues={{ name: '', email: '', phone: '', password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form className="space-y-4">
                            {/* Name */}
                            <div className="relative">
                                <label className="text-black block text-sm mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Field
                                        name="name"
                                        placeholder="e.g. John Doe"
                                        className="pl-10 w-full py-2 border bg-white text-black rounded-md border-gray-700 placeholder-gray-500"
                                    />
                                </div>
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <label className="text-black block text-sm mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="e.g. johndoe@example.com"
                                        className="pl-10 w-full py-2 border bg-white text-black rounded-md border-gray-700 placeholder-gray-500"
                                    />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <label className="text-black block text-sm mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Field
                                        name="phone"
                                        type="tel"
                                        placeholder="e.g. 9876543210"
                                        className="pl-10 w-full py-2 border bg-white text-black rounded-md border-gray-700 placeholder-gray-500"
                                    />
                                </div>
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label className="text-black block text-sm mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Field
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter a strong password"
                                        className="pl-10 pr-10 w-full py-2 border bg-white text-black rounded-md border-gray-700 placeholder-gray-500"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label className="text-black block text-sm mb-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Field
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Re-enter password"
                                        className="pl-10 pr-10 w-full py-2 border bg-white text-black rounded-md border-gray-700 placeholder-gray-500"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 py-2.5 text-lg font-medium btn-gradient text-white hover:bg-transparent  hover:text-white border     hover:scale-95 rounded-full disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Registering...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Redirect */}
                            <p className="mt-2 text-center text-sm text-black">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-400 hover:underline font-medium">
                                    Login
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
