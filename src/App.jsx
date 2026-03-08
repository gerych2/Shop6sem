import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import { useCart } from './context/CartContext'

function App() {
    const { cartCount } = useCart()

    return (
        <div className="min-h-screen bg-gray-50">
            <Header cartCount={cartCount} />
            <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </div>
    )
}

export default App