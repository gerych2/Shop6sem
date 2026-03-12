import { useState, useMemo } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard/ProductCard'

function CatalogPage() {
    const [sortBy, setSortBy] = useState('default')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minRating, setMinRating] = useState(0)

    const filtered = useMemo(() => {
        let result = [...products]

        // Фильтр по цене
        if (minPrice !== '') result = result.filter(p => p.price >= Number(minPrice))
        if (maxPrice !== '') result = result.filter(p => p.price <= Number(maxPrice))

        // Фильтр по рейтингу
        if (minRating > 0) result = result.filter(p => p.rating >= minRating)

        // Сортировка
        if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
        if (sortBy === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name))
        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)

        return result
    }, [sortBy, minPrice, maxPrice, minRating])

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-8">Каталог шоколада</h1>

            {/* Панель фильтров */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex flex-wrap gap-4 items-end">

                {/* Сортировка */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500 font-medium">Сортировка</label>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-800 cursor-pointer"
                    >
                        <option value="default">По умолчанию</option>
                        <option value="name-asc">По названию А–Я</option>
                        <option value="name-desc">По названию Я–А</option>
                        <option value="price-asc">Цена: по возрастанию</option>
                        <option value="price-desc">Цена: по убыванию</option>
                    </select>
                </div>

                {/* Цена от */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500 font-medium">Цена от</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-24 focus:outline-none focus:border-amber-800"
                    />
                </div>

                {/* Цена до */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500 font-medium">Цена до</label>
                    <input
                        type="number"
                        placeholder="1000"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-24 focus:outline-none focus:border-amber-800"
                    />
                </div>

                {/* Рейтинг */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500 font-medium">Рейтинг от</label>
                    <select
                        value={minRating}
                        onChange={e => setMinRating(Number(e.target.value))}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-800 cursor-pointer"
                    >
                        <option value={0}>Любой</option>
                        <option value={4}>4.0+</option>
                        <option value={4.5}>4.5+</option>
                        <option value={4.8}>4.8+</option>
                    </select>
                </div>

                {/* Сброс */}
                <button
                    onClick={() => {
                        setSortBy('default')
                        setMinPrice('')
                        setMaxPrice('')
                        setMinRating(0)
                    }}
                    className="px-4 py-2 rounded-xl text-sm text-gray-500 border border-gray-200 hover:border-amber-800 hover:text-amber-800 transition-colors cursor-pointer"
                >
                    Сбросить
                </button>

            </div>

            {/* Сетка товаров */}
            {filtered.length === 0 ? (
                <div className="text-center text-gray-400 py-20 text-lg">
                    Товары не найдены 😔
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default CatalogPage