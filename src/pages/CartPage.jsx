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

    // Подсчёт суммы
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = appliedPromo ? total * PROMO_CODES[appliedPromo] : 0
    const finalTotal = total - discount

    // Применить промокод
    const applyPromo = () => {
        if (promoInput.trim() === '') return
        if (PROMO_CODES[promoInput.trim().toUpperCase()]) {
            setAppliedPromo(promoInput.trim().toUpperCase())
            setPromoError('')
        } else {
            setPromoError('Неверный промокод')
            setAppliedPromo(null)
        }
    }

    // Пустая корзина
    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Корзина пуста</h2>
                <p className="text-gray-400 mb-8">Добавьте что-нибудь вкусное!</p>
                <Link
                    to="/"
                    className="px-8 py-3 bg-amber-800 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
                >
                    Вернуться в каталог
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-amber-800 mb-8">Корзина</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Список товаров */}
                <div className="flex-1 flex flex-col gap-4">
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4"
                        >
                            {/* Фото */}
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                            />

                            {/* Инфо */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-400">{item.subtitle}</p>
                                <p className="text-amber-800 font-bold mt-1">{item.price} ₽</p>
                            </div>

                            {/* Количество */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-800 hover:text-amber-800 transition-colors cursor-pointer text-lg"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-800 hover:text-amber-800 transition-colors cursor-pointer text-lg"
                                >
                                    +
                                </button>
                            </div>

                            {/* Сумма за позицию */}
                            <div className="w-20 text-right font-bold text-gray-800">
                                {item.price * item.quantity} ₽
                            </div>

                            {/* Удалить */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer text-xl ml-2"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Итог */}
                <div className="lg:w-72">
                    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

                        <h2 className="text-lg font-bold text-gray-800 mb-4">Итого</h2>

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

                        <div className="border-t border-gray-100 my-4" />

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
                                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-800"
                                />
                                <button
                                    onClick={applyPromo}
                                    className="px-3 py-2 bg-amber-800 text-white rounded-xl text-sm hover:bg-amber-700 transition-colors cursor-pointer"
                                >
                                    ОК
                                </button>
                            </div>

                            {/* Ошибка */}
                            {promoError && (
                                <p className="text-red-400 text-xs mt-1">{promoError}</p>
                            )}

                            {/* Успех */}
                            {appliedPromo && (
                                <p className="text-green-500 text-xs mt-1">Промокод применён ✓</p>
                            )}
                        </div>

                        {/* Кнопка оформить */}
                        <button className="w-full py-3 bg-amber-800 text-white rounded-xl font-semibold hover:bg-amber-700 active:scale-95 transition-all cursor-pointer">
                            Оформить заказ
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartPage