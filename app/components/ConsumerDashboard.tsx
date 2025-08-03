"use client";

import React, { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingCart, Heart, MapPin, Calendar, DollarSign, Star, Shield, Users, 
  ArrowLeft, Filter, Eye, CheckCircle, Wallet, AlertCircle, Loader, Network, Zap, ArrowRightLeft
} from 'lucide-react';

const ConsumerDashboard = () => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('fuji');
  const [icmEnabled, setIcmEnabled] = useState(false);
  const [crossChainTxs, setCrossChainTxs] = useState([]);

  // Network configurations
  const NETWORKS = {
    fuji: {
      chainId: '0xa869',
      chainName: 'Avalanche Fuji Testnet',
      nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
      },
      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://testnet.snowtrace.io/'],
      marketplaceAddress: '0x1234567890123456789012345678901234567890',
      icmMessenger: '0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf'
    },
    sepolia: {
      chainId: '0xaa36a7',
      chainName: 'Sepolia Test Network',
      nativeCurrency: {
        name: 'Sepolia ETH',
        symbol: 'SEP',
        decimals: 18
      },
      rpcUrls: ['https://sepolia.infura.io/v3/'],
      blockExplorerUrls: ['https://sepolia.etherscan.io/'],
      marketplaceAddress: '0x742d35Cc7861C4532fF56c7b2b4e2A7267b2cf2B',
      icmMessenger: '0x987654321098765432109876543210987654321'
    }
  };

  useEffect(() => {
    checkWalletConnection();
    loadCrossChainHistory();
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
      const network = Object.entries(NETWORKS).find(([_, config]) => config.chainId === chainId);
      
      if (network) {
        setCurrentNetwork(network[0]);
        setNetworkError(false);
      } else {
        setNetworkError(true);
        setCurrentNetwork(null);
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
      await switchNetwork(selectedNetwork);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Error al conectar la billetera');
    }
    setIsConnecting(false);
  };

  const switchNetwork = async (networkKey) => {
    const network = NETWORKS[networkKey];
    if (!network) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
      setCurrentNetwork(networkKey);
      setNetworkError(false);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
          });
          setCurrentNetwork(networkKey);
          setNetworkError(false);
        } catch (addError) {
          console.error('Error adding network:', addError);
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

    if (networkError || !currentNetwork) {
      alert('Por favor conecta a una red soportada');
      return;
    }

    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    setIsProcessing(true);
    try {
      const network = NETWORKS[currentNetwork];
      const totalInBolivianos = getCartTotal();
      
      // Convert to native token (simplified conversion)
      const tokenAmount = currentNetwork === 'fuji' 
        ? (totalInBolivianos * 0.0008).toFixed(6) // AVAX conversion
        : (totalInBolivianos * 0.0001).toFixed(6); // ETH conversion
      
      const weiAmount = Math.floor(parseFloat(tokenAmount) * Math.pow(10, 18));
      const hexValue = '0x' + weiAmount.toString(16);

      // Simple transaction without complex data encoding
      const transactionParameters = {
        to: network.marketplaceAddress,
        from: account,
        value: hexValue,
        // Remove problematic data field for now - simple transfer
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      // If ICM is enabled, trigger cross-chain notification
      if (icmEnabled && currentNetwork !== 'fuji') {
        await sendCrossChainMessage(txHash, cart);
      }

      const explorerUrl = network.blockExplorerUrls[0] + 'tx/' + txHash;
      alert(`¡Compra exitosa en ${network.chainName}!\nHash: ${txHash}\nVer en: ${explorerUrl}`);
      
      setCart([]);
      updateCrossChainHistory(txHash, currentNetwork);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error al procesar el pago: ' + error.message);
    }
    setIsProcessing(false);
  };

  const sendCrossChainMessage = async (txHash, cartItems) => {
    try {
      const network = NETWORKS[currentNetwork];
      
      // Create a simple message payload
      const messageData = {
        purchaseHash: txHash.slice(0, 10), // Shortened hash
        buyer: account.slice(0, 10), // Shortened address
        itemCount: cartItems.length,
        timestamp: Math.floor(Date.now() / 1000) // Unix timestamp
      };

      // For demo purposes, we'll send a simple transaction
      // In real implementation, this would interact with ICM contracts
      const messageValue = '0x' + (1000000000000000).toString(16); // 0.001 ETH/AVAX for messaging

      const icmTransaction = {
        to: network.icmMessenger,
        from: account,
        value: messageValue,
        // Simple transaction without complex data encoding
      };

      const icmTxHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [icmTransaction],
      });

      console.log('Cross-chain message sent:', icmTxHash);
      
      // Simulate cross-chain confirmation
      setTimeout(() => {
        setCrossChainTxs(prev => [...prev, {
          originalTx: txHash,
          icmTx: icmTxHash,
          fromChain: currentNetwork,
          toChain: 'fuji',
          status: 'confirmed',
          timestamp: Date.now()
        }]);
      }, 5000);

    } catch (error) {
      console.error('Error sending cross-chain message:', error);
      // Don't fail the main transaction if ICM fails
    }
  };

  // Removed problematic encoding functions that caused buffer overrun
  // These would be replaced with proper ABI encoding in production

  const loadCrossChainHistory = () => {
    // Load from localStorage or API
    const stored = localStorage.getItem('crossChainTxs');
    if (stored) {
      setCrossChainTxs(JSON.parse(stored));
    }
  };

  const updateCrossChainHistory = (txHash, network) => {
    const newTx = {
      originalTx: txHash,
      fromChain: network,
      timestamp: Date.now(),
      status: 'pending'
    };
    
    const updated = [...crossChainTxs, newTx];
    setCrossChainTxs(updated);
    localStorage.setItem('crossChainTxs', JSON.stringify(updated));
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkIcon = (networkKey) => {
    return networkKey === 'fuji' ? '🔺' : '🔷';
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
                  Marketplace Avalanche
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Network Selector */}
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600"
                >
                  <option value="fuji">🔺 Avalanche Fuji</option>
                  <option value="sepolia">🔷 Sepolia</option>
                </select>
                
                {currentNetwork && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
                    <span>{getNetworkIcon(currentNetwork)}</span>
                    <span>{NETWORKS[currentNetwork].chainName.split(' ')[0]}</span>
                  </div>
                )}
              </div>

              {/* ICM Toggle */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input 
                    type="checkbox" 
                    checked={icmEnabled}
                    onChange={(e) => setIcmEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>ICM</span>
                </label>
              </div>

              {!account ? (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50"
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
              
              {networkError && (
                <button 
                  onClick={() => switchNetwork(selectedNetwork)}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Cambiar Red</span>
                </button>
              )}

              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
                
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
                        <span className="text-sm text-gray-600">
                          ≈ {currentNetwork === 'fuji' 
                            ? (getCartTotal() * 0.0008).toFixed(6) + ' AVAX'
                            : (getCartTotal() * 0.0001).toFixed(6) + ' ETH'
                          }
                        </span>
                      </div>
                      
                      {icmEnabled && (
                        <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                          <div className="flex items-center text-xs text-blue-600">
                            <ArrowRightLeft className="w-3 h-3 mr-1" />
                            <span>ICM habilitado - Notificación cross-chain</span>
                          </div>
                        </div>
                      )}
                      
                      <button 
                        onClick={processPayment}
                        disabled={!account || networkError || isProcessing}
                        className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Procesando...</span>
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4" />
                            <span>Pagar en {currentNetwork === 'fuji' ? 'Avalanche' : 'Sepolia'}</span>
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
          <p className="text-gray-600">Marketplace multi-chain con Avalanche e ICM</p>
          {account && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Billetera conectada - Red: {currentNetwork ? NETWORKS[currentNetwork].chainName : 'No detectada'}</span>
              </div>
              {icmEnabled && (
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>ICM activado - Comunicación cross-chain habilitada</span>
                </div>
              )}
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

            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Network className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-bold">Multi-Chain Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Red actual:</span>
                  <span className="font-bold flex items-center">
                    {currentNetwork ? getNetworkIcon(currentNetwork) : '❓'} 
                    {currentNetwork ? NETWORKS[currentNetwork].chainName.split(' ')[0] : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transacciones:</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cross-chain:</span>
                  <span className="font-bold">{crossChainTxs.length}</span>
                </div>
                <div className="flex items-center">
                  <ArrowRightLeft className="w-5 h-5 mr-2 text-orange-300" />
                  <span className="text-sm">ICM {icmEnabled ? 'Activado' : 'Desactivado'}</span>
                </div>
              </div>
            </div>

            {/* Cross-chain Transaction History */}
            {crossChainTxs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <ArrowRightLeft className="w-5 h-5 mr-2" />
                  Historial ICM
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {crossChainTxs.slice(-3).map((tx, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">
                          {getNetworkIcon(tx.fromChain)} → {getNetworkIcon(tx.toChain || 'fuji')}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          tx.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(tx.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                          <div className="text-xs text-red-600 font-medium">
                            ≈ {currentNetwork === 'fuji' 
                              ? (parseFloat(product.price.replace('Bs. ', '').replace('/kg', '')) * 0.0008).toFixed(6) + ' AVAX'
                              : (parseFloat(product.price.replace('Bs. ', '').replace('/kg', '')) * 0.0001).toFixed(6) + ' ETH'
                            }
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
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600' 
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