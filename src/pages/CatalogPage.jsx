import { useState, useMemo } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard/ProductCard'

function Toast({ message }) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 px-5 py-3 flex items-center gap-3 animate-bounce">
            <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span className="font-medium text-gray-900 text-sm">Added {message} to cart</span>
        </div>
    )
}

function CatalogPage() {
    const [sortBy, setSortBy] = useState('name-asc')
    const [showFilters, setShowFilters] = useState(false)
    const [minRating, setMinRating] = useState(0)
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(400)
    const [toast, setToast] = useState(null)

    const handleAddToCart = (name) => {
        setToast(name)
        setTimeout(() => setToast(null), 2500)
    }

    const filtered = useMemo(() => {
        let result = [...products]
        result = result.filter(p => p.price >= priceMin && p.price <= priceMax)
        if (minRating > 0) result = result.filter(p => p.rating >= minRating - 0.5)
        if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
        if (sortBy === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name))
        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
        return result
    }, [sortBy, minRating, priceMin, priceMax])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* Toast уведомление */}
            {toast && <Toast message={toast} />}

            {/* Заголовок */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Building Materials</h1>
                <p className="text-gray-500 mt-1">Premium construction supplies for all your projects</p>
            </div>

            {/* Панель управления */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    <span className="text-sm text-gray-500">Showing {filtered.length} products</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>

            {/* Фильтры */}
            {showFilters && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 flex flex-col sm:flex-row gap-8">

                    {/* Рейтинг */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                        <div className="flex items-center gap-4">
                            {[5, 4, 3].map(r => (
                                <label key={r} className="flex items-center gap-2 cursor-pointer">
                                    <div
                                        onClick={() => setMinRating(minRating === r ? 0 : r)}
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors
                                            ${minRating === r ? 'border-orange-500' : 'border-gray-300'}`}
                                    >
                                        {minRating === r && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                                    </div>
                                    <span className="text-sm text-gray-700">{r}+ Stars</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Цена */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                        <div className="relative h-5 flex items-center">
                            {/* Track background */}
                            <div className="absolute w-full h-1 bg-gray-200 rounded" />
                            {/* Active track */}
                            <div
                                className="absolute h-1 bg-gray-900 rounded"
                                style={{
                                    left: `${(priceMin / 400) * 100}%`,
                                    right: `${100 - (priceMax / 400) * 100}%`
                                }}
                            />
                            {/* Min thumb */}
                            <input
                                type="range"
                                min={0}
                                max={400}
                                value={priceMin}
                                onChange={e => {
                                    const val = Number(e.target.value)
                                    if (val < priceMax) setPriceMin(val)
                                }}
                                className="price-range-slider absolute w-full"
                            />
                            {/* Max thumb */}
                            <input
                                type="range"
                                min={0}
                                max={400}
                                value={priceMax}
                                onChange={e => {
                                    const val = Number(e.target.value)
                                    if (val > priceMin) setPriceMax(val)
                                }}
                                className="price-range-slider absolute w-full"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>${priceMin}</span>
                            <span>${priceMax}</span>
                        </div>
                    </div>

                    {/* Сброс */}
                    <div className="flex items-end">
                        <button
                            onClick={() => { setMinRating(0); setPriceMin(0); setPriceMax(400) }}
                            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors cursor-pointer"
                        >
                            Clear All Filters
                        </button>
                    </div>

                </div>
            )}

            {/* Сетка товаров */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-lg">
                    No products found 😔
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            )}

        </div>
    )
}

export default CatalogPage