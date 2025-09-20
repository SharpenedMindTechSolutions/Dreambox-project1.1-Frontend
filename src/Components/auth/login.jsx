import React, { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState({ loading: false, error: '', success: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            setStatus({ loading: true, error: '', success: '' });
            try {
                try {
                    const response = await login(values);
                    const userId = response?.user?.id || response?.data?.user?.id;
                    const userName = response?.user?.name || response?.data?.user?.name;
                    if (!userId) {
                        throw new Error('User ID not found in login response');
                    }
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('userName', userName);
                    setStatus({ loading: false, success: 'Login successful!', error: '' });
                    setTimeout(() => navigate(`/dashboard/${userId}`), 2000);
                } catch (error) {
                    console.error('Login error:', error);
                    setStatus({ loading: false, success: '', error: error.message || 'Login failed' });
                }

            } catch (err) {
                setStatus({
                    loading: false,
                    error: err.response?.data?.message || 'Login failed',
                    success: '',
                });
            }
        },
    });

    useEffect(() => {
        if (status.error || status.success) {
            const timer = setTimeout(() => setStatus({ ...status, error: '', success: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 ">
            {(status.error || status.success) && (
                <div className="fixed top-4 right-4 z-50 animate-slideIn">
                    <div
                        className={`flex items-center gap-3 px-4 py-4 rounded shadow-md text-white transition-all duration-300 ${status.error ? 'bg-red-600' : 'bg-green-500'
                            }`}
                    >
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


            <div className="max-w-md w-full space-y-6 p-8 border rounded-md shadow-2xl">
                <h2 className="text-3xl text-black text-center font-special-gothic">Sign In</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="relative">
                        <label className="text-black block text-sm mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="e.g. user@example.com"
                                {...formik.getFieldProps('email')}
                                className="pl-10 w-full py-2 bg-white border border-gray-700 text-black rounded-md placeholder-gray-500"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-black block text-sm mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                {...formik.getFieldProps('password')}
                                className="pl-10 pr-10 w-full py-2 bg-white border border-gray-700 text-black rounded-md placeholder-gray-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={status.loading}
                        className="w-full btn-gradient text-white hover:bg-transparent  hover:text-white border    hover:scale-95 rounded-full py-2.5 text-lg font-medium flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                        {status.loading ? <><Loader2 className="animate-spin" size={18} /> Logging in...</> : 'Login'}
                    </button>

                    <p className="text-sm text-center text-gray-300">
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </p>
                    <p className="text-sm text-center text-black">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
