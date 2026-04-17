import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const PROMO_CODES = { 'SAVE10': 0.10 }

function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart()
    const navigate = useNavigate()
    const [promoInput, setPromoInput] = useState('')
    const [appliedPromo, setAppliedPromo] = useState(null)
    const [promoError, setPromoError] = useState('')

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = appliedPromo ? Math.round(subtotal * PROMO_CODES[appliedPromo]) : 0
    const tax = Math.round((subtotal - discount) * 0.08)
    const total = subtotal - discount + tax

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

    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Start shopping to add items to your cart</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 active:scale-95 transition-all shadow-md"
                >
                    Browse Products →
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Левая часть — таблица товаров */}
                <div className="flex-1">

                    {/* Таблица */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">

                        {/* Заголовок таблицы */}
                        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-gray-100 text-sm text-gray-500 font-medium">
                            <span>Product</span>
                            <span className="w-20 text-center">Price</span>
                            <span className="w-32 text-center">Quantity</span>
                            <span className="w-20 text-center">Total</span>
                            <span className="w-8"></span>
                        </div>

                        {/* Строки товаров */}
                        {cart.map(item => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                            >
                                {/* Товар */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                                    </div>
                                </div>

                                {/* Цена */}
                                <div className="w-20 text-center text-gray-700 font-medium">
                                    ${item.price}
                                </div>

                                {/* Количество */}
                                <div className="w-32 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer font-medium"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer font-medium"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Итого */}
                                <div className="w-20 text-center font-bold text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                {/* Удалить */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="w-8 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Промокод */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-4">Have a promo code?</h3>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                value={promoInput}
                                onChange={e => { setPromoInput(e.target.value); setPromoError('') }}
                                onKeyDown={e => e.key === 'Enter' && applyPromo()}
                                disabled={!!appliedPromo}
                                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-400"
                            />
                            <button
                                onClick={applyPromo}
                                disabled={!!appliedPromo}
                                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Apply
                            </button>
                        </div>
                        {promoError && <p className="text-red-500 text-sm mt-2">❌ {promoError}</p>}
                        {appliedPromo && <p className="text-green-500 text-sm mt-2">✓ Промокод применён! Скидка 10%</p>}
                    </div>

                </div>

                {/* Правая часть — Order Summary */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">

                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        <div className="flex justify-between text-gray-600 mb-3">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>

                        {appliedPromo && (
                            <div className="flex justify-between text-green-600 mb-3">
                                <span>Discount (10%)</span>
                                <span>-${discount}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-gray-600 mb-3">
                            <span>Tax (8%)</span>
                            <span>${tax}</span>
                        </div>

                        <div className="border-t border-gray-200 my-4" />

                        <div className="flex justify-between font-bold text-xl text-gray-900 mb-6">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>

                        <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 active:scale-95 transition-all cursor-pointer shadow-md mb-3">
                            Proceed to Checkout →
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
                        >
                            Continue Shopping
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartPage