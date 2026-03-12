import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const product = products.find(p => p.id === Number(id))
    const { addToCart, cart } = useCart()
    const [currentImage, setCurrentImage] = useState(0)
    const [accordionOpen, setAccordionOpen] = useState(false)

    if (!product) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 text-xl mb-4">Товар не найден</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-amber-800 text-white rounded-xl hover:bg-amber-700 transition-colors cursor-pointer"
                >
                    Вернуться в каталог
                </button>
            </div>
        )
    }

    const inCart = cart.some(item => item.id === product.id)

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            {/* Кнопка назад */}
            <button
                onClick={() => navigate('/')}
                className="text-amber-800 hover:text-amber-600 transition-colors mb-6 flex items-center gap-2 cursor-pointer"
            >
                ← Назад в каталог
            </button>

            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-8">

                {/* Левая часть — слайдер */}
                <div className="md:w-1/2">

                    {/* Главное фото */}
                    <div className="rounded-xl overflow-hidden h-72 md:h-96 mb-4">
                        <img
                            src={product.images[currentImage]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-300"
                        />
                    </div>

                    {/* Миниатюры */}
                    <div className="flex gap-3">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer
                  ${currentImage === index ? 'border-amber-800' : 'border-transparent hover:border-amber-300'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                </div>

                {/* Правая часть — информация */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>

                        {/* Рейтинг */}
                        <div className="flex items-center gap-1 mb-2">
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="text-gray-500">{product.rating}</span>
                        </div>

                        {/* Название */}
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h1>

                        {/* Подзаголовок */}
                        <p className="text-gray-400 mb-6">{product.subtitle}</p>

                        {/* Цена */}
                        <div className="text-3xl font-bold text-amber-800 mb-6">
                            {product.price} ₽
                        </div>

                        {/* Кнопка в корзину */}
                        <button
                            onClick={() => addToCart(product)}
                            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200 cursor-pointer active:scale-95
                ${inCart
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-amber-800 text-white hover:bg-amber-700'
                            }`}
                        >
                            {inCart ? '✓ Уже в корзине' : '+ Добавить в корзину'}
                        </button>

                    </div>

                    {/* Аккордеон */}
                    <div className="mt-6 border-t border-gray-100 pt-4">
                        <button
                            onClick={() => setAccordionOpen(!accordionOpen)}
                            className="w-full flex items-center justify-between text-gray-700 font-medium hover:text-amber-800 transition-colors cursor-pointer py-2"
                        >
                            <span>Расширенное описание</span>
                            <span className={`transition-transform duration-300 ${accordionOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${accordionOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="text-gray-500 text-sm pt-2 pb-4 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductPage