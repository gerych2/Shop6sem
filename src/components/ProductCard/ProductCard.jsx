import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function ProductCard({ product }) {
    const { addToCart, cart } = useCart()
    const inCart = cart.some(item => item.id === product.id)

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">

            {/* Картинка */}
            <Link to={`/product/${product.id}`}>
                <div className="overflow-hidden h-56">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            {/* Контент */}
            <div className="p-4">

                {/* Рейтинг */}
                <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-500">{product.rating}</span>
                </div>

                {/* Название */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-amber-800 transition-colors cursor-pointer">
                        {product.name}
                    </h3>
                </Link>

                {/* Подзаголовок */}
                <p className="text-sm text-gray-400 mt-1">{product.subtitle}</p>

                {/* Цена и кнопка */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-amber-800">{product.price} ₽</span>
                    <button
                        onClick={() => addToCart(product)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
              ${inCart
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-amber-800 text-white hover:bg-amber-700 active:scale-95'
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