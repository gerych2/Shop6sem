import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function Header() {
    const { cartCount } = useCart()
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Логотип */}
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🍫</span>
                    <div>
            <span className="text-xl font-bold text-amber-800 group-hover:text-amber-600 transition-colors">
              ChocoShop
            </span>
                        <p className="text-xs text-gray-400 leading-none">Шоколад ручной работы</p>
                    </div>
                </Link>

                {/* Навигация */}
                <nav className="flex items-center gap-8">
                    <Link
                        to="/"
                        className={`font-medium transition-all duration-200 relative pb-1
              ${isActive('/')
                            ? 'text-amber-800'
                            : 'text-gray-600 hover:text-amber-800'
                        }`}
                    >
                        Каталог
                        {isActive('/') && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 rounded-full" />
                        )}
                    </Link>

                    {/* Корзина */}
                    <Link
                        to="/cart"
                        className={`relative flex items-center gap-2 font-medium transition-all duration-200
              ${isActive('/cart')
                            ? 'text-amber-800'
                            : 'text-gray-600 hover:text-amber-800'
                        }`}
                    >
                        <div className="relative">
                            <span className="text-2xl">🛒</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
                            )}
                        </div>
                        <span className="hidden sm:block">Корзина</span>
                    </Link>
                </nav>

            </div>
        </header>
    )
}

export default Header