import React from 'react';
import { Leaf, Search, ShoppingCart, Heart, MapPin, Calendar, DollarSign, Star, Shield, Users, 
  ArrowLeft, Filter, Eye, CheckCircle 
} from 'lucide-react';

const ConsumerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver
              </a>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Marketplace
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">MC</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Hola, María!</h2>
          <p className="text-gray-600">Descubre productos frescos directamente de los productores bolivianos</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar productos, productores o ubicaciones..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </button>
              <button className="flex items-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <MapPin className="w-5 h-5 mr-2" />
                Ubicación
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
              <div className="space-y-2">
                {[
                  { name: "Verduras", count: 45, active: true },
                  { name: "Frutas", count: 32, active: false },
                  { name: "Tubérculos", count: 28, active: false },
                  { name: "Granos", count: 19, active: false },
                  { name: "Hierbas", count: 15, active: false }
                ].map((category, index) => (
                  <button key={index} className={`w-full text-left p-3 rounded-lg transition-colors ${
                    category.active 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Tu Impacto</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Productores apoyados:</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Compras este mes:</span>
                  <span className="font-bold">Bs. 850</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-300" />
                  <span className="text-sm">Apoyando economía local</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Productos Destacados</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Tomates Cherry Orgánicos",
                    producer: "Juan Pérez",
                    location: "Valle Alto, Cochabamba",
                    price: "Bs. 25/kg",
                    rating: 4.8,
                    image: "🍅",
                    certified: true,
                    inStock: true
                  },
                  {
                    name: "Lechuga Hidropónica",
                    producer: "María Quispe",
                    location: "El Alto, La Paz",
                    price: "Bs. 18/kg",
                    rating: 4.9,
                    image: "🥬",
                    certified: true,
                    inStock: true
                  },
                  {
                    name: "Papas Nativas Waycha",
                    producer: "Carlos Mamani",
                    location: "Potosí",
                    price: "Bs. 12/kg",
                    rating: 4.7,
                    image: "🥔",
                    certified: true,
                    inStock: false
                  },
                  {
                    name: "Quinoa Real",
                    producer: "Ana Condori",
                    location: "Oruro",
                    price: "Bs. 35/kg",
                    rating: 4.9,
                    image: "🌾",
                    certified: true,
                    inStock: true
                  },
                  {
                    name: "Zanahorias Baby",
                    producer: "José Vargas",
                    location: "Tarija",
                    price: "Bs. 22/kg",
                    rating: 4.6,
                    image: "🥕",
                    certified: true,
                    inStock: true
                  },
                  {
                    name: "Apio Fresco",
                    producer: "Rosa Flores",
                    location: "Santa Cruz",
                    price: "Bs. 15/kg",
                    rating: 4.5,
                    image: "🌿",
                    certified: true,
                    inStock: true
                  }
                ].map((product, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <span className="text-6xl">{product.image}</span>
                      </div>
                      {product.certified && (
                        <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-lg flex items-center">
                          <Shield className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">Certificado</span>
                        </div>
                      )}
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                        <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">por {product.producer}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {product.location}
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">{product.price}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          product.inStock 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`} disabled={!product.inStock}>
                          {product.inStock ? 'Agregar al carrito' : 'Agotado'}
                        </button>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Productores Destacados</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Juan Pérez",
                    farm: "Finca Valle Verde",
                    location: "Cochabamba",
                    products: 12,
                    rating: 4.8,
                    verified: true,
                    speciality: "Verduras Orgánicas"
                  },
                  {
                    name: "María Quispe",
                    farm: "Hidroponía Los Andes",
                    location: "La Paz",
                    products: 8,
                    rating: 4.9,
                    verified: true,
                    speciality: "Cultivos Hidropónicos"
                  }
                ].map((producer, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 flex items-center">
                            {producer.name}
                            {producer.verified && (
                              <CheckCircle className="w-4 h-4 text-green-600 ml-2" />
                            )}
                          </h4>
                          <p className="text-gray-600 text-sm">{producer.farm}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{producer.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {producer.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">{producer.products} productos disponibles</span>
                      </div>
                      <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {producer.speciality}
                      </div>
                    </div>
                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Ver Perfil  
                    </button>
                  </div>
                ))}
                </div>
                </div>
            </div>
            </div>
            </div>
            </div>
    );

};
export default ConsumerDashboard;
