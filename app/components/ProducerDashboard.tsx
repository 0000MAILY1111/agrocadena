"use client";

import React, { useState} from 'react';
import { 
  Leaf, Plus, Edit3, Trash2, DollarSign, Star, 
  Shield, Users, Camera, Upload, CheckCircle, Award, BarChart3, 
  TrendingUp, Package, AlertCircle, Eye, ArrowLeft, Save, X
} from 'lucide-react';

const ProducerDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomates Cherry Orgánicos",
      category: "Verduras",
      price: "25",
      stock: 150,
      unit: "kg",
      status: "active",
      image: "🍅",
      description: "Tomates cherry cultivados de forma orgánica sin pesticidas",
      certifications: ["Orgánico Certificado", "Sin Pesticidas"]
    },
    {
      id: 2,
      name: "Lechuga Hidropónica",
      category: "Verduras",
      price: "18",
      stock: 80,
      unit: "kg",
      status: "active",
      image: "🥬",
      description: "Lechuga fresca cultivada en sistema hidropónico",
      certifications: ["Hidropónico", "Sin Pesticidas"]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    unit: 'kg',
    description: '',
    certifications: []
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeForm();
    }
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      unit: 'kg',
      description: '',
      certifications: []
    });
    setSelectedImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  ////new verification  certifi onchage
  const handleCertificationChange = (certification) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter(c => c !== certification)
        : [...prev.certifications, certification]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          file,
          preview: e.target.result
        });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setSelectedImages(prev => [...prev, ...images]);
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const productData = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now(),
      status: 'active',
      image: selectedImages.length > 0 ? selectedImages[0].preview : "📦"
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts(prev => [...prev, productData]);
    }

    closeForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      unit: product.unit,
      description: product.description || '',
      certifications: product.certifications || []
    });
    setShowAddForm(true);
  };

  const handleDelete = (productId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const availableCertifications = [
    { name: "Orgánico Certificado", icon: <Leaf className="w-6 h-6" />, color: "green", verified: true },
    { name: "Fair Trade", icon: <Award className="w-6 h-6" />, color: "blue", verified: true },
    { name: "Sin Pesticidas", icon: <CheckCircle className="w-6 h-6" />, color: "emerald", verified: true },
    { name: "Hidropónico", icon: <Shield className="w-6 h-6" />, color: "cyan", verified: true },
    { name: "Comercio Justo", icon: <Users className="w-6 h-6" />, color: "purple", verified: true }
  ];

  const categories = [
    "Verduras", "Frutas", "Tubérculos", "Granos", "Hierbas", "Legumbres"
  ];

  const stats = [
    { label: "Productos Activos", value: products.filter(p => p.status === 'active').length, icon: <Package className="w-6 h-6" />, color: "blue" },
    { label: "Stock Total", value: products.reduce((acc, p) => acc + parseInt(p.stock), 0), icon: <BarChart3 className="w-6 h-6" />, color: "green" },
    { label: "Valor Inventario", value: `Bs. ${products.reduce((acc, p) => acc + (parseInt(p.price) * parseInt(p.stock)), 0)}`, icon: <DollarSign className="w-6 h-6" />, color: "orange" },
    { label: "Categorías", value: [...new Set(products.map(p => p.category))].length, icon: <TrendingUp className="w-6 h-6" />, color: "purple" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-40">
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
              <button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Producto</span>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Hola, Juan Pérez!</h2>
          <p className="text-gray-600">Gestiona tus productos y ventas desde tu panel de control</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Mis Productos</h3>
          </div>
          
          <div className="p-6">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No tienes productos registrados</h4>
                <p className="text-gray-600 mb-6">Comienza agregando tu primer producto para vender</p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Agregar Producto</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <span className="text-6xl">{product.image}</span>
                      </div>
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors"
                        >
                          <Edit3 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-gray-900">Bs. {product.price}</span>
                          <span className="text-sm text-gray-500">/{product.unit}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{product.stock} {product.unit}</p>
                          <p className="text-xs text-gray-500">en stock</p>
                        </div>
                      </div>
                      
                      {product.certifications && product.certifications.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.certifications.slice(0, 2).map((cert, index) => (
                            <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              {cert}
                            </span>
                          ))}
                          {product.certifications.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                              +{product.certifications.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          <Eye className="w-4 h-4 inline mr-1" />
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleOverlayClick}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={handleFormClick}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button 
                  onClick={closeForm}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Producto 
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    placeholder="Ej: Tomates Cherry Orgánicos"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría 
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio (Bs.) 
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    placeholder="25"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    placeholder="100"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unidad
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                  >
                    <option value="kg">Kilogramo (kg)</option>
                    <option value="g">Gramo (g)</option>
                    <option value="unidad">Unidad</option>
                    <option value="docena">Docena</option>
                    <option value="litro">Litro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none resize-none"
                  placeholder="Describe tu producto, métodos de cultivo, características especiales..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Certificaciones
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableCertifications.map((certification, index) => (
                    <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.certifications.includes(certification.name)}
                        onChange={() => handleCertificationChange(certification.name)}
                        className="rounded text-green-600 focus:ring-green-600"
                      />
                      <div className={`p-1 rounded-lg bg-${certification.color}-100 text-${certification.color}-600`}>
                        {certification.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{certification.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Imágenes del Producto
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Arrastra imágenes aquí o haz clic para seleccionar</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Seleccionar Imágenes
                  </label>
                </div>
                
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Actualizar' : 'Crear'} Producto</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProducerDashboard;