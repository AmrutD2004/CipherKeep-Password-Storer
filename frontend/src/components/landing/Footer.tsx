import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img width={50} src="/Logo.png" alt="" />
              <span className="text-white font-semibold text-xl tracking-tight">CipherKeep</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm">
              Secure password management built for the modern world. Your vault, encrypted, organized, and always accessible.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-300">Subscribe to our newsletter</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all"
                />
                <button className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-200">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Features</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-neutral-400 text-sm hover:text-lime-400 transition-colors">features</a></li>
            </ul>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">How It Works</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-neutral-400 text-sm hover:text-lime-400 transition-colors">how-it-works</a></li>
            </ul>
          </div>

          {/* What We Offer */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">What We Offer</h3>
            <ul className="space-y-2">
              <li><a href="#what-we-offer" className="text-neutral-400 text-sm hover:text-lime-400 transition-colors">what-we-offer</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © {currentYear} CipherKeep. All rights reserved.
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
            <span>256-bit AES Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
            <span>Zero-Knowledge Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
            <span>SOC 2 Type II Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer