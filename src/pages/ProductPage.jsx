import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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

    // Похожие товары — 3 случайных кроме текущего
    const related = products.filter(p => p.id !== product.id).slice(0, 3)

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            {/* Хлебные крошки */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link to="/" className="hover:text-amber-800 transition-colors">Каталог</Link>
                <span>›</span>
                <span className="text-gray-600">{product.name}</span>
            </div>

            {/* Основной блок */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-8 mb-10">

                {/* Левая часть — слайдер */}
                <div className="md:w-1/2">

                    {/* Главное фото */}
                    <div className="rounded-xl overflow-hidden h-72 md:h-96 mb-4 bg-gray-50">
                        <img
                            src={product.images[currentImage]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                    </div>

                    {/* Миниатюры */}
                    <div className="flex gap-3">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer hover:scale-105
                  ${currentImage === index
                                    ? 'border-amber-800 shadow-md'
                                    : 'border-transparent hover:border-amber-300'
                                }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                </div>

                {/* Правая часть */}
                <div className="md:w-1/2 flex flex-col">

                    {/* Рейтинг */}
                    <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(star => (
                            <span
                                key={star}
                                className={`text-lg ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                            >
                ★
              </span>
                        ))}
                        <span className="text-gray-400 text-sm ml-1">{product.rating} из 5</span>
                    </div>

                    {/* Название */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h1>

                    {/* Подзаголовок */}
                    <p className="text-gray-400 mb-6">{product.subtitle}</p>

                    {/* Цена */}
                    <div className="text-3xl font-bold text-amber-800 mb-2">
                        {product.price} ₽
                    </div>
                    <p className="text-sm text-gray-400 mb-6">Цена за 1 плитку (100г)</p>

                    {/* Кнопка в корзину */}
                    <button
                        onClick={() => addToCart(product)}
                        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200 cursor-pointer active:scale-95 mb-3
              ${inCart
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-amber-800 text-white hover:bg-amber-700 shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {inCart ? '✓ Уже в корзине' : '+ Добавить в корзину'}
                    </button>

                    {/* Ссылка на корзину если уже добавлен */}
                    {inCart && (
                        <Link
                            to="/cart"
                            className="text-center text-sm text-amber-800 hover:underline transition-all"
                        >
                            Перейти в корзину →
                        </Link>
                    )}

                    {/* Аккордеон */}
                    <div className="mt-auto border-t border-gray-100 pt-4">
                        <button
                            onClick={() => setAccordionOpen(!accordionOpen)}
                            className="w-full flex items-center justify-between text-gray-700 font-medium hover:text-amber-800 transition-colors cursor-pointer py-2"
                        >
                            <span>Расширенное описание</span>
                            <span className={`transition-transform duration-300 text-sm ${accordionOpen ? 'rotate-180' : ''}`}>
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

            {/* Похожие товары */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Вам может понравиться</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map(item => (
                        <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                            onClick={() => setCurrentImage(0)}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex items-center gap-3 p-3"
                        >
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                            />
                            <div>
                                <p className="font-medium text-gray-800 text-sm group-hover:text-amber-800 transition-colors">
                                    {item.name}
                                </p>
                                <p className="text-amber-800 font-bold text-sm">{item.price} ₽</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProductPage