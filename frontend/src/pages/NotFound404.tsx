import React from 'react';
import { Lock, Home, ArrowLeft } from 'lucide-react';

const NotFound404 = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-[#f9fafb] text-[#1f2937]'>
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <img width={100} src='/Logo.png'/>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-lime-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

        {/* Description */}
        <p className='text-base mb-8 text-gray-600'>
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-white font-semibold rounded-lg"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-lime-500 text-lime-600 font-semibold rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Brand */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <img width={30} src='/Logo.png'/>
          <span className="text-sm font-medium text-lime-600">CipherKeep</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;