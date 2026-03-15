import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="text-8xl mb-6">🍫</div>
            <h1 className="text-6xl font-bold text-amber-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-2">Страница не найдена</p>
            <p className="text-gray-400 mb-8">
                Похоже, этот шоколад уже съели...
            </p>
            <Link
                to="/"
                className="px-8 py-3 bg-amber-800 text-white rounded-xl font-semibold hover:bg-amber-700 active:scale-95 transition-all shadow-lg"
            >
                Вернуться в каталог
            </Link>
        </div>
    )
}

export default NotFoundPage