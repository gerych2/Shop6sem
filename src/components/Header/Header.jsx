import { Link } from 'react-router-dom'

function Header({ cartCount = 0 }) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Логотип */}
                <Link to="/" className="text-2xl font-bold text-amber-800 hover:text-amber-600 transition-colors">
                    🍫 ChocoShop
                </Link>

                {/* Навигация */}
                <nav className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-amber-800 font-medium transition-colors"
                    >
                        Каталог
                    </Link>

                    {/* Корзина с Badge */}
                    <Link to="/cart" className="relative">
                        <div className="text-gray-700 hover:text-amber-800 transition-colors text-2xl">
                            🛒
                        </div>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
                        )}
                    </Link>
                </nav>

            </div>
        </header>
    )
}

export default Header