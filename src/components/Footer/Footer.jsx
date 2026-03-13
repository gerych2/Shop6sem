import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-amber-900 text-white mt-16">
            <div className="max-w-6xl mx-auto px-4 py-10">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

                    {/* Логотип и описание */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-3xl">🍫</span>
                            <span className="text-xl font-bold">ChocoShop</span>
                        </div>
                        <p className="text-amber-200 text-sm leading-relaxed">
                            Магазин шоколада ручной работы. Только натуральные ингредиенты и настоящий вкус.
                        </p>
                    </div>

                    {/* Навигация */}
                    <div>
                        <h3 className="font-semibold mb-3 text-amber-200">Навигация</h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-amber-300 transition-colors">
                                    Каталог
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="hover:text-amber-300 transition-colors">
                                    Корзина
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Промокод подсказка */}
                    <div>
                        <h3 className="font-semibold mb-3 text-amber-200">Скидки</h3>
                        <div className="bg-amber-800 rounded-xl p-4 text-sm">
                            <p className="text-amber-200 mb-1">Ваш первый заказ</p>
                            <div className="flex items-center gap-2">
                <span className="bg-white text-amber-800 font-bold px-3 py-1 rounded-lg tracking-widest">
                  SAVE10
                </span>
                                <span className="text-amber-300 text-xs">= скидка 10%</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Нижняя строка */}
                <div className="border-t border-amber-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-amber-300">
                    <p>© 2026 ChocoShop. Все права защищены.</p>
                    <p>Сделано с ❤️ и шоколадом</p>
                </div>

            </div>
        </footer>
    )
}

export default Footer