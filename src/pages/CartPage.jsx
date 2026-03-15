import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const PROMO_CODES = {
    'SAVE10': 0.10,
}

function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart()
    const [promoInput, setPromoInput] = useState('')
    const [appliedPromo, setAppliedPromo] = useState(null)
    const [promoError, setPromoError] = useState('')

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = appliedPromo ? Math.round(total * PROMO_CODES[appliedPromo]) : 0
    const finalTotal = total - discount

    const applyPromo = () => {
        const code = promoInput.trim().toUpperCase()
        if (code === '') return
        if (PROMO_CODES[code]) {
            setAppliedPromo(code)
            setPromoError('')
        } else {
            setPromoError('Неверный промокод')
            setAppliedPromo(null)
        }
    }

    const handlePromoKeyDown = (e) => {
        if (e.key === 'Enter') applyPromo()
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="text-8xl mb-6">🛒</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Корзина пуста</h2>
                <p className="text-gray-400 mb-8">Добавьте что-нибудь вкусное из каталога!</p>
                <Link
                    to="/"
                    className="px-8 py-3 bg-amber-800 text-white rounded-xl font-semibold hover:bg-amber-700 active:scale-95 transition-all shadow-lg inline-block"
                >
                    Вернуться в каталог
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">

            {/* Заголовок */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-amber-800">Корзина</h1>
                <span className="text-gray-400 text-sm">{cart.length} позиций</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Список товаров */}
                <div className="flex-1 flex flex-col gap-4">
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Фото */}
                            <Link to={`/product/${item.id}`}>
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0 hover:scale-105 transition-transform duration-200"
                                />
                            </Link>

                            {/* Инфо */}
                            <div className="flex-1 min-w-0">
                                <Link to={`/product/${item.id}`}>
                                    <h3 className="font-semibold text-gray-800 hover:text-amber-800 transition-colors truncate">
                                        {item.name}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-400">{item.subtitle}</p>
                                <p className="text-amber-800 font-bold mt-1">{item.price} ₽ / шт</p>
                            </div>

                            {/* Количество */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-800 hover:text-amber-800 hover:bg-amber-50 transition-all cursor-pointer text-lg font-medium"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-800 hover:text-amber-800 hover:bg-amber-50 transition-all cursor-pointer text-lg font-medium"
                                >
                                    +
                                </button>
                            </div>

                            {/* Сумма за позицию */}
                            <div className="w-24 text-right font-bold text-gray-800 flex-shrink-0">
                                {item.price * item.quantity} ₽
                            </div>

                            {/* Удалить */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer text-xl ml-1 flex-shrink-0 hover:scale-110"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* Продолжить покупки */}
                    <Link
                        to="/"
                        className="text-amber-800 hover:text-amber-600 transition-colors text-sm flex items-center gap-1 mt-2"
                    >
                        ← Продолжить покупки
                    </Link>
                </div>

                {/* Итог */}
                <div className="lg:w-72 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

                        <h2 className="text-lg font-bold text-gray-800 mb-4">Итого</h2>

                        {/* Список позиций */}
                        <div className="flex flex-col gap-2 mb-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm text-gray-500">
                                    <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                                    <span className="flex-shrink-0">{item.price * item.quantity} ₽</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 my-3" />

                        {/* Сумма */}
                        <div className="flex justify-between text-gray-600 mb-2">
                            <span>Сумма</span>
                            <span>{total} ₽</span>
                        </div>

                        {/* Скидка */}
                        {appliedPromo && (
                            <div className="flex justify-between text-green-600 mb-2">
                                <span>Скидка (10%)</span>
                                <span>−{discount} ₽</span>
                            </div>
                        )}

                        <div className="border-t border-gray-100 my-3" />

                        {/* Итоговая сумма */}
                        <div className="flex justify-between font-bold text-xl text-amber-800 mb-6">
                            <span>К оплате</span>
                            <span>{finalTotal} ₽</span>
                        </div>

                        {/* Промокод */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-500 font-medium mb-1 block">
                                Промокод
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Введите код"
                                    value={promoInput}
                                    onChange={e => {
                                        setPromoInput(e.target.value)
                                        setPromoError('')
                                    }}
                                    onKeyDown={handlePromoKeyDown}
                                    disabled={!!appliedPromo}
                                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-800 disabled:bg-gray-50 disabled:text-gray-400"
                                />
                                <button
                                    onClick={applyPromo}
                                    disabled={!!appliedPromo}
                                    className="px-3 py-2 bg-amber-800 text-white rounded-xl text-sm hover:bg-amber-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ОК
                                </button>
                            </div>

                            {promoError && (
                                <p className="text-red-400 text-xs mt-1">❌ {promoError}</p>
                            )}
                            {appliedPromo && (
                                <p className="text-green-500 text-xs mt-1">✓ Промокод применён!</p>
                            )}
                        </div>

                        {/* Кнопка оформить */}
                        <button className="w-full py-3 bg-amber-800 text-white rounded-xl font-semibold hover:bg-amber-700 active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-lg">
                            Оформить заказ
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage