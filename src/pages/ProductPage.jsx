import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { StarRating } from '../components/ProductCard/ProductCard'

function ProductPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const product = products.find(p => p.id === Number(id))
    const { addToCart, cart } = useCart()
    const [currentImage, setCurrentImage] = useState(0)
    const [accordionOpen, setAccordionOpen] = useState(true)
    const [quantity, setQuantity] = useState(1)

    if (!product) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 text-xl mb-4">Товар не найден</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                >
                    Вернуться в каталог
                </button>
            </div>
        )
    }

    const inCart = cart.some(item => item.id === product.id)

    const prevImage = () => {
        setCurrentImage(i => (i === 0 ? product.images.length - 1 : i - 1))
    }

    const nextImage = () => {
        setCurrentImage(i => (i === product.images.length - 1 ? 0 : i + 1))
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
    }

    const specs = product.specs || []

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* Хлебные крошки */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-orange-500 transition-colors">Products</Link>
                <span>/</span>
                <span className="text-gray-900">{product.name}</span>
            </div>

            {/* Основной блок */}
            <div className="flex flex-col lg:flex-row gap-10 mb-12">

                {/* Левая часть — слайдер */}
                <div className="lg:w-1/2">

                    {/* Главное фото со стрелками */}
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-4">
                        <img
                            src={product.images[currentImage]}
                            alt={product.name}
                            className="w-full h-96 object-cover transition-all duration-500"
                        />

                        {/* Стрелка влево */}
                        <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-600 font-bold text-lg"
                        >
                            ‹
                        </button>

                        {/* Стрелка вправо */}
                        <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-600 font-bold text-lg"
                        >
                            ›
                        </button>
                    </div>

                    {/* Миниатюры */}
                    <div className="flex gap-3">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer
                  ${currentImage === index
                                    ? 'border-orange-500'
                                    : 'border-gray-200 hover:border-gray-400'
                                }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                </div>

                {/* Правая часть */}
                <div className="lg:w-1/2">

                    {/* Название */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    {/* Рейтинг */}
                    <div className="flex items-center gap-2 mb-4">
                        <StarRating rating={product.rating} />
                    </div>

                    {/* Цена */}
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-gray-500 text-sm">/unit</span>
                    </div>

                    {/* Иконки преимуществ */}
                    <div className="flex items-center gap-6 py-4 border-t border-b border-gray-100 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 text-orange-500">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-gray-900">Quality Assured</p>
                                <p className="text-xs text-gray-500">Premium grade</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 text-orange-500">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-gray-900">Fast Delivery</p>
                                <p className="text-xs text-gray-500">2-5 business days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 text-orange-500">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-gray-900">Warranty</p>
                                <p className="text-xs text-gray-500">30-day guarantee</p>
                            </div>
                        </div>
                    </div>

                    {/* Выбор количества */}
                    <div className="mb-4">
                        <p className="font-semibold text-gray-900 mb-2">Quantity</p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer text-lg font-medium"
                            >
                                -
                            </button>
                            <div className="w-14 h-10 border border-gray-200 rounded-lg flex items-center justify-center font-semibold">
                                {quantity}
                            </div>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer text-lg font-medium"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Кнопки */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 active:scale-95 transition-all cursor-pointer shadow-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to Cart
                        </button>
                        <button
                            onClick={() => { handleAddToCart(); navigate('/cart') }}
                            className="w-full py-3 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 active:scale-95 transition-all cursor-pointer"
                        >
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Аккордеон — Technical Specifications */}
            <div className="border border-gray-200 rounded-xl overflow-hidden max-w-3xl">
                <button
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
                    <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${accordionOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${accordionOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="border-t border-gray-200 bg-gray-50">
                        <div className="grid grid-cols-2 divide-y divide-gray-200">
                            {specs.map((spec, i) => (
                                <div key={i} className={`px-6 py-4 ${i % 2 === 0 ? 'border-r border-gray-200' : ''}`}>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{spec.label}</p>
                                    <p className="font-semibold text-gray-900">{spec.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductPage