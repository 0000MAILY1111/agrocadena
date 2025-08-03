"use client";

import React, { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingCart, Heart, MapPin, Calendar, DollarSign, Star, Shield, Users, 
  ArrowLeft, Filter, Eye, CheckCircle, Wallet, AlertCircle, Loader
} from 'lucide-react';

const ConsumerDashboard = () => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sepolia network configuration
  const SEPOLIA_CHAIN_ID = '0xaa36a7';
  const SEPOLIA_NETWORK = {
    chainId: SEPOLIA_CHAIN_ID,
    chainName: 'Sepolia Test Network',
    nativeCurrency: {
      name: 'Sepolia ETH',
      symbol: 'SEP',
      decimals: 18
    },
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/']
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await checkNetwork();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const checkNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== SEPOLIA_CHAIN_ID) {
        setNetworkError(true);
      } else {
        setNetworkError(false);
      }
    } catch (error) {
      console.error('Error checking network:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Por favor instala MetaMask para continuar');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      await switchToSepolia();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Error al conectar la billetera');
    }
    setIsConnecting(false);
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
      setNetworkError(false);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SEPOLIA_NETWORK],
          });
          setNetworkError(false);
        } catch (addError) {
          console.error('Error adding Sepolia network:', addError);
        }
      }
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => 
          item.name === product.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName) => {
    setCart(prev => prev.filter(item => item.name !== productName));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('Bs. ', '').replace('/kg', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const processPayment = async () => {
    if (!account) {
      alert('Por favor conecta tu billetera primero');
      return;
    }

    if (networkError) {
      alert('Por favor cambia a la red Sepolia');
      return;
    }

    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    setIsProcessing(true);
    try {
      // Convert total to ETH (simplified conversion for demo)
      const totalInBolivianos = getCartTotal();
      const ethAmount = (totalInBolivianos * 0.0001).toFixed(6); // Demo conversion rate
      const weiAmount = (parseFloat(ethAmount) * Math.pow(10, 18)).toString(16);

      // Marketplace contract address (demo address for Sepolia)
      const marketplaceAddress = '0x742d35Cc7861C4532fF56c7b2b4e2A7267b2cf2B';

      const transactionParameters = {
        to: marketplaceAddress,
        from: account,
        value: '0x' + weiAmount,
        data: '0x' // Simple payment, no contract interaction for this demo
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      alert(`¡Compra exitosa! Hash de transacción: ${txHash}\nPuedes verificar tu transacción en: https://sepolia.etherscan.io/tx/${txHash}`);
      setCart([]);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error al procesar el pago: ' + error.message);
    }
    setIsProcessing(false);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const products = [
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
  ];

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
                  Marketplace Web3
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Wallet Connection */}
              {!account ? (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                >
                  {isConnecting ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wallet className="w-4 h-4" />
                  )}
                  <span>{isConnecting ? 'Conectando...' : 'Conectar MetaMask'}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatAddress(account)}</span>
                </div>
              )}
              
              {/* Network Warning */}
              {networkError && (
                <button 
                  onClick={switchToSepolia}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Cambiar a Sepolia</span>
                </button>
              )}

              {/* Shopping Cart */}
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
                
                {/* Cart Dropdown */}
                {cart.length > 0 && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                    <h3 className="font-bold text-gray-900 mb-3">Carrito de Compras</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold">{item.price}</span>
                            <button 
                              onClick={() => removeFromCart(item.name)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold">Total: Bs. {getCartTotal().toFixed(2)}</span>
                        <span className="text-sm text-gray-600">≈ {(getCartTotal() * 0.0001).toFixed(6)} ETH</span>
                      </div>
                      <button 
                        onClick={processPayment}
                        disabled={!account || networkError || isProcessing}
                        className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Procesando...</span>
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4" />
                            <span>Pagar con MetaMask</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

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
          {account && (
            <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Billetera conectada - Listo para comprar con crypto</span>
            </div>
          )}
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

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Wallet className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-bold">Web3 Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Transacciones:</span>
                  <span className="font-bold">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ETH gastado:</span>
                  <span className="font-bold">0.045 ETH</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-300" />
                  <span className="text-sm">Compras verificadas on-chain</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Productos Destacados</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
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
                        <div>
                          <span className="text-lg font-bold text-gray-900">{product.price}</span>
                          <div className="text-xs text-purple-600 font-medium">
                            ≈ {(parseFloat(product.price.replace('Bs. ', '').replace('/kg', '')) * 0.0001).toFixed(6)} ETH
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => addToCart(product)}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            product.inStock 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`} 
                          disabled={!product.inStock}
                        >
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