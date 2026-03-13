import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function ProductCard({ product }) {
    const { addToCart, cart } = useCart()
    const inCart = cart.some(item => item.id === product.id)

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">

            {/* Картинка */}
            <Link to={`/product/${product.id}`} className="relative overflow-hidden h-56 block">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Оверлей при наведении */}
                <div className="absolute inset-0 bg-amber-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                {/* Рейтинг поверх картинки */}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                </div>
            </Link>

            {/* Контент */}
            <div className="p-4 flex flex-col flex-1">

                {/* Название */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-amber-800 transition-colors leading-tight mb-1">
                        {product.name}
                    </h3>
                </Link>

                {/* Подзаголовок */}
                <p className="text-sm text-gray-400 mb-4 flex-1">{product.subtitle}</p>

                {/* Цена и кнопка */}
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-amber-800">{product.price} ₽</span>
                    <button
                        onClick={() => addToCart(product)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer active:scale-95
              ${inCart
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-amber-800 text-white hover:bg-amber-700 shadow-md hover:shadow-lg'
                        }`}
                    >
                        {inCart ? '✓ В корзине' : '+ В корзину'}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductCard