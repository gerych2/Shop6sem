import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="text-sm text-gray-500 ml-1">({rating})</span>
        </div>
    )
}

function ProductCard({ product, onAddToCart }) {
    const { addToCart, cart } = useCart()
    const inCart = cart.some(item => item.id === product.id)

    const handleAdd = () => {
        addToCart(product)
        if (onAddToCart) onAddToCart(product.name)
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">

            {/* Картинка */}
            <Link to={`/product/${product.id}`} className="block overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* Контент */}
            <div className="p-4 flex flex-col flex-1">

                {/* Название */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 hover:text-orange-500 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Рейтинг */}
                <StarRating rating={product.rating} />

                {/* Цена */}
                <p className="text-2xl font-bold text-gray-900 mt-2 mb-1">
                    ${product.price}
                </p>

                {/* Подзаголовок/категория */}
                <p className="text-sm text-gray-500 mb-4 flex-1">{product.subtitle}</p>

                {/* Кнопка */}
                <button
                    onClick={handleAdd}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95
            ${inCart
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>

            </div>
        </div>
    )
}

export { StarRating }
export default ProductCard