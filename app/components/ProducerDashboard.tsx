"use client";

import React, { useState } from 'react';
import { 
  Leaf, Plus, Package, TrendingUp, Users, Eye, 
  MapPin, Calendar, DollarSign, CheckCircle, 
  BarChart3, Settings, ArrowLeft, Star, Share2,
  Camera, Award, MessageCircle, Bell, Percent,
  TrendingDown, ShoppingCart, Heart, Upload,
  ThumbsUp, Gift, Target, Zap
} from 'lucide-react';

const ProducerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const QualitySection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Certificaciones de Calidad</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 inline mr-2" />
            Agregar Certificación
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Orgánico Certificado", icon: <Leaf className="w-6 h-6" />, color: "green", verified: true },
            { name: "Fair Trade", icon: <Award className="w-6 h-6" />, color: "blue", verified: true },
            { name: "Sin Pesticidas", icon: <CheckCircle className="w-6 h-6" />, color: "emerald", verified: true },
            { name: "Producción Local", icon: <MapPin className="w-6 h-6" />, color: "amber", verified: false }
          ].map((cert, index) => (
            <div key={index} className={`border-2 border-${cert.color}-200 rounded-xl p-4 bg-${cert.color}-50`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-${cert.color}-100 rounded-lg flex items-center justify-center text-${cert.color}-600`}>
                  {cert.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                  <div className="flex items-center">
                    {cert.verified ? (
                      <span className="text-green-600 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verificado
                      </span>
                    ) : (
                      <span className="text-amber-600 text-sm">Pendiente</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Galería de Calidad</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          ))}
        </div>
        <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors">
          <Upload className="w-6 h-6 mx-auto mb-2" />
          <p>Subir fotos del proceso de producción</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Testimonios de Clientes</h3>
        <div className="space-y-4">
          {[
            { name: "María González", rating: 5, comment: "Los mejores tomates orgánicos que he probado. Excelente calidad!", date: "Hace 2 días" },
            { name: "Carlos Ruiz", rating: 5, comment: "Productos frescos y de primera calidad. Muy recomendado.", date: "Hace 1 semana" },
            { name: "Ana López", rating: 4, comment: "Muy buenos productos, entrega rápida.", date: "Hace 2 semanas" }
          ].map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{review.name[0]}</span>
                  </div>
                  <span className="font-semibold">{review.name}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2">"{review.comment}"</p>
              <p className="text-gray-500 text-xs">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SalesSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Promociones Activas</h3>
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Percent className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-red-800">15% OFF</span>
              </div>
              <p className="text-sm text-red-700">Tomates Cherry - Válido hasta mañana</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Gift className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">2x1</span>
              </div>
              <p className="text-sm text-blue-700">Lechugas - Esta semana</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 inline mr-2" />
            Nueva Promoción
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Análisis de Precios</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tomates (kg)</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Bs. 25</span>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Lechugas (kg)</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Bs. 18</span>
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Papas (kg)</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Bs. 12</span>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Metas de Ventas</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Meta Mensual</span>
                <span>Bs. 12,340 / Bs. 15,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '82%'}}></div>
              </div>
              <p className="text-xs text-green-600 mt-1">82% completado</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Clientes Nuevos</span>
                <span>12 / 20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              <p className="text-xs text-blue-600 mt-1">60% completado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Gestión de Inventario</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Producto</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Precio</th>
                <th className="text-left py-3 px-4">Estado</th>
                <th className="text-left py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Tomates Cherry", stock: "45 kg", price: "Bs. 25/kg", status: "stock-alto" },
                { name: "Lechugas", stock: "8 kg", price: "Bs. 18/kg", status: "stock-bajo" },
                { name: "Papas Nativas", stock: "0 kg", price: "Bs. 12/kg", status: "agotado" },
                { name: "Zanahorias", stock: "23 kg", price: "Bs. 15/kg", status: "stock-medio" }
              ].map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold">{item.name}</td>
                  <td className="py-3 px-4">{item.stock}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'stock-alto' ? 'bg-green-100 text-green-800' :
                      item.status === 'stock-medio' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'stock-bajo' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'stock-alto' ? 'Stock Alto' :
                       item.status === 'stock-medio' ? 'Stock Medio' :
                       item.status === 'stock-bajo' ? 'Stock Bajo' : 'Agotado'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const VisibilitySection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Perfil Público</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Información del Productor</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Historia de la Finca</label>
                <textarea className="w-full border border-gray-300 rounded-lg p-3 text-sm" rows={4} 
                  placeholder="Cuéntanos la historia de tu finca y tu experiencia como productor..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Métodos de Producción</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 text-sm" 
                  placeholder="Ej: Agricultura orgánica, hidropónica..." />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Estadísticas Públicas</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600">Visitas al perfil</span>
                <span className="font-bold text-green-600">156 esta semana</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600">Seguidores</span>
                <span className="font-bold text-blue-600">89 (+12 nuevos)</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600">Calificación promedio</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-bold">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Marketing y Promoción</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Redes Sociales</h4>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Compartir productos en Facebook</span>
              </button>
              <button className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Publicar en Instagram</span>
              </button>
              <button className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Programa de Referidos</h4>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-6 h-6 text-green-600" />
                <div>
                  <h5 className="font-semibold text-green-800">5% por cada referido</h5>
                  <p className="text-sm text-green-600">Gana comisión por cada cliente nuevo</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg mb-3">
                <p className="text-xs text-gray-600 mb-1">Tu código de referido:</p>
                <p className="font-mono font-bold text-green-600">JUAN2024</p>
              </div>
              <div className="flex justify-between text-sm">
                <span>Referidos este mes:</span>
                <span className="font-bold">3 personas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Notificaciones y Alertas</h3>
        <div className="space-y-3">
          {[
            { type: "success", message: "¡Nuevo pedido recibido de María González!", time: "Hace 5 min", icon: <ShoppingCart className="w-5 h-5" /> },
            { type: "info", message: "Tu producto 'Tomates Cherry' ha sido visto 23 veces hoy", time: "Hace 1 hora", icon: <Eye className="w-5 h-5" /> },
            { type: "warning", message: "Stock bajo: Lechugas (8 kg restantes)", time: "Hace 2 horas", icon: <Package className="w-5 h-5" /> },
            { type: "success", message: "Nueva reseña 5⭐ de Carlos Ruiz", time: "Ayer", icon: <Star className="w-5 h-5" /> }
          ].map((notification, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${
              notification.type === 'success' ? 'bg-green-50 border-green-500' :
              notification.type === 'info' ? 'bg-blue-50 border-blue-500' :
              'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`${
                  notification.type === 'success' ? 'text-green-600' :
                  notification.type === 'info' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{notification.message}</p>
                  <p className="text-gray-500 text-sm">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
                  Panel Productor Avanzado
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-1 bg-white rounded-xl p-2 border border-gray-200">
          {[
            { id: 'dashboard', label: 'Panel Principal', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'sales', label: 'Ventas', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'visibility', label: 'Visibilidad', icon: <Eye className="w-4 h-4" /> },
            { id: 'quality', label: 'Calidad', icon: <Award className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {activeTab === 'dashboard' && (
          <>
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

            {/* Quick Actions Enhanced */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3">
                  <Plus className="w-6 h-6" />
                  <span className="font-semibold">Agregar Producto</span>
                </button>
                <button className="border-2 border-blue-600 text-blue-600 p-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center space-x-3">
                  <Percent className="w-6 h-6" />
                  <span className="font-semibold">Crear Promoción</span>
                </button>
                <button className="border-2 border-purple-600 text-purple-600 p-4 rounded-xl hover:bg-purple-50 transition-colors flex items-center space-x-3">
                  <Share2 className="w-6 h-6" />
                  <span className="font-semibold">Compartir en Redes</span>
                </button>
                <button className="border-2 border-amber-600 text-amber-600 p-4 rounded-xl hover:bg-amber-50 transition-colors flex items-center space-x-3">
                  <Camera className="w-6 h-6" />
                  <span className="font-semibold">Subir Fotos</span>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'sales' && <SalesSection />}
        {activeTab === 'visibility' && <VisibilitySection />}
        {activeTab === 'quality' && <QualitySection />}
      </div>
    </div>
  );
};

export default ProducerDashboard;