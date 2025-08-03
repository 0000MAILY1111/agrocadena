import React from 'react';
import { 
  Leaf, Plus, Package, TrendingUp, Users, Eye, 
  MapPin, Calendar, DollarSign, CheckCircle, 
  BarChart3, Settings, ArrowLeft 
} from 'lucide-react';

const ProducerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver
              </a>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Panel Productor
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">JP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido, Juan!</h2>
          <p className="text-gray-600">Gestiona tu producción y conecta directamente con tus consumidores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">24</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Productos Activos</h3>
            <p className="text-green-600 text-xs mt-1">+3 este mes</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Bs. 12,340</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Ventas del Mes</h3>
            <p className="text-blue-600 text-xs mt-1">+15% vs mes anterior</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">89</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Clientes</h3>
            <p className="text-amber-600 text-xs mt-1">+12 nuevos</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">156</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Visitas Perfil</h3>
            <p className="text-purple-600 text-xs mt-1">Esta semana</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3">
                  <Plus className="w-6 h-6" />
                  <span className="font-semibold">Agregar Producto</span>
                </button>
                <button className="border-2 border-green-600 text-green-600 p-4 rounded-xl hover:bg-green-50 transition-colors flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6" />
                  <span className="font-semibold">Ver Estadísticas</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Productos Recientes</h3>
              <div className="space-y-4">
                {[
                  { name: "Tomates Cherry Orgánicos", price: "Bs. 25/kg", status: "Disponible", location: "La Paz", date: "Hoy" },
                  { name: "Lechuga Hidropónica", price: "Bs. 18/kg", status: "Disponible", location: "Cochabamba", date: "Ayer" },
                  { name: "Papas Nativas", price: "Bs. 12/kg", status: "Agotado", location: "Potosí", date: "2 días" }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {product.price}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {product.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {product.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Disponible' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mi Finca</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ubicación:</span>
                  <span className="font-medium">Valle Alto, Cochabamba</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hectáreas:</span>
                  <span className="font-medium">2.5 ha</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificación:</span>
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Orgánico
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pedidos Recientes</h3>
              <div className="space-y-3">
                {[
                  { customer: "María R.", product: "Tomates", amount: "Bs. 150", status: "Entregado" },
                  { customer: "Carlos M.", product: "Lechugas", amount: "Bs. 90", status: "En tránsito" },
                  { customer: "Ana L.", product: "Papas", amount: "Bs. 180", status: "Preparando" }
                ].map((order, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.product} - {order.amount}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                      order.status === 'En tránsito' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Certificación Blockchain</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Productos certificados:</span>
                  <span className="font-bold">24/24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transacciones:</span>
                  <span className="font-bold">156</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm">100% Trazabilidad verificada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;