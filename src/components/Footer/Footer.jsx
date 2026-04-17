function Footer() {
    return (
        <footer className="bg-slate-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Колонка 1 — О компании */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">BM</span>
                            </div>
                            <span className="font-bold text-lg">BuildMart</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Your trusted source for premium building materials and construction supplies since 1995.
                        </p>
                        <div className="flex items-center gap-3">
                            {['f', 't', 'in', 'li'].map((icon, i) => (
                                <button key={i} className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors text-xs cursor-pointer">
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Колонка 2 — Quick Links */}
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="flex flex-col gap-2 text-sm text-slate-400">
                            {['About Us', 'Products', 'Delivery Info', 'Returns Policy'].map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Колонка 3 — Customer Service */}
                    <div>
                        <h3 className="font-bold mb-4">Customer Service</h3>
                        <ul className="flex flex-col gap-2 text-sm text-slate-400">
                            {['Contact Us', 'FAQs', 'Shipping & Tracking', 'Privacy Policy'].map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Колонка 4 — Newsletter */}
                    <div>
                        <h3 className="font-bold mb-2">Newsletter</h3>
                        <p className="text-slate-400 text-sm mb-3">Subscribe for updates and exclusive deals.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 text-white placeholder-slate-500"
                            />
                            <button className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Контакты */}
                <div className="border-t border-slate-800 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm text-slate-400">
                    <div>
                        <p className="text-white font-medium mb-1">Phone</p>
                        <p>1-800-BUILD-MART</p>
                    </div>
                    <div>
                        <p className="text-white font-medium mb-1">Email</p>
                        <p>support@buildmart.com</p>
                    </div>
                    <div>
                        <p className="text-white font-medium mb-1">Address</p>
                        <p>123 Construction Ave, Builder City, BC 12345</p>
                    </div>
                </div>

                {/* Копирайт */}
                <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
                    © 2026 BuildMart. All rights reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer