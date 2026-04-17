import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { StarRating } from '../components/ProductCard/ProductCard'
import ProductCard from '../components/ProductCard/ProductCard'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))
  const { addToCart } = useCart()
  const [currentImage, setCurrentImage] = useState(0)
  const [accordionOpen, setAccordionOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl mb-4">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
        >
          Back to catalog
        </button>
      </div>
    )
  }

  const related = products.filter(p => p.id !== product.id).slice(0, 3)
  const specs = product.specs || []

  const prevImage = () => setCurrentImage(i => i === 0 ? product.images.length - 1 : i - 1)
  const nextImage = () => setCurrentImage(i => i === product.images.length - 1 ? 0 : i + 1)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-700 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      {/* Main block */}
      <div className="flex flex-col lg:flex-row gap-12 mb-12">

        {/* Left — image slider */}
        <div className="lg:w-1/2">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-4">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-96 object-cover transition-all duration-500"
            />
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 text-xl font-bold"
            >
              &lt;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 text-xl font-bold"
            >
              &gt;
            </button>
          </div>

          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-28 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer
                  ${currentImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-1/2">

          <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={product.rating} />
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-gray-900">${product.price}</span>
            <span className="text-gray-500">/unit</span>
          </div>

          {/* Feature icons */}
          <div className="flex items-start gap-6 py-4 border-t border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-orange-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Quality Assured</p>
                <p className="text-xs text-gray-500">Premium grade material</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-orange-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Fast Delivery</p>
                <p className="text-xs text-gray-500">2-5 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-orange-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Warranty</p>
                <p className="text-xs text-gray-500">30-day guarantee</p>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <p className="font-semibold text-gray-900 mb-2">Quantity</p>
            <div className="flex items-center gap-0">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-lg font-medium text-gray-700"
              >
                -
              </button>
              <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center font-semibold text-gray-900">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-lg font-medium text-gray-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button
              onClick={() => { handleAddToCart(); navigate('/cart') }}
              className="w-full py-4 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold text-lg hover:bg-orange-50 active:scale-95 transition-all cursor-pointer"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* Description */}
      <div className="mb-2">
        <p className="text-gray-600 leading-relaxed text-base max-w-3xl">{product.description}</p>
      </div>

      {/* Technical Specifications accordion */}
      <div className="border border-gray-200 rounded-xl overflow-hidden max-w-4xl mb-12 mt-6">
        <button
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${accordionOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${accordionOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="bg-gray-50 px-6 py-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-2">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`px-6 py-4
                      ${i % 2 === 0 ? 'border-r border-gray-200' : ''}
                      ${i < specs.length - 2 ? 'border-b border-gray-200' : ''}
                    `}
                  >
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">{spec.label}</p>
                    <p className="font-semibold text-gray-900 text-base">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default ProductPage
