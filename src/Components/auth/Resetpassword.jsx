import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext.jsx';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [show, setShow] = useState({ password: false, confirm: false });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      password: Yup.string().min(6).required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: async ({ password }) => {
      setStatus({ loading: true, error: '', success: '' });
      try {
        const res = await resetPassword(token, password);
        setStatus({
          loading: false,
          success: res.data.message || 'Password reset successful!',
          error: '',
        });
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        setStatus({
          loading: false,
          error: err.response?.data?.message || 'Reset failed',
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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
       {(status.error || status.success) && (
                <div className="fixed top-4 right-4 z-50 animate-slideIn">
                    <div
                        className={`flex items-center gap-3 px-4 py-4 rounded shadow-md text-white transition-all duration-300 ${status.error ? 'bg-red-600' : 'bg-green-600'
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
        <h2 className="text-3xl text-black text-center font-special-gothic">Reset Password</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Password */}
          <div className="relative">
            <label className="text-black block text-sm mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={show.password ? 'text' : 'password'}
                name="password"
                placeholder="Enter new password"
                {...formik.getFieldProps('password')}
                className="pl-10 pr-10 w-full py-2 bg-white border border-gray-700 text-black rounded-md placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShow((p) => ({ ...p, password: !p.password }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {show.password ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-black block text-sm mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={show.confirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter password"
                {...formik.getFieldProps('confirmPassword')}
                className="pl-10 pr-10 w-full py-2 bg-white border border-gray-700 text-black rounded-md placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full btn-gradient text-white hover:bg-transparent  hover:text-white border    hover:scale-95 rounded-full py-2.5 text-lg font-medium flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {status.loading ? <><Loader2 className="animate-spin" size={18} /> Resetting...</> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
