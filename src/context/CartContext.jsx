import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Добавить товар в корзину
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // Удалить товар
    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    // Изменить количество
    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return
        setCart(prev =>
            prev.map(item => item.id === id ? { ...item, quantity } : item)
        )
    }

    // Общее количество товаров для Badge
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}