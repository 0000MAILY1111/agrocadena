// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgroChain {

    // --------- ESTRUCTURAS ---------

    struct Agricultor {
        address id;
        string nombre;
        string ubicacion;
    }

    enum Estado {
        Publicado,    // Producto publicado y esperando financiamiento
        Financiado,   // Producto financiado por un comprador
        Enviado,      // Producto enviado por el agricultor
        Recibido      // Producto recibido y confirmado, pago liberado
    }

    struct Producto {
        uint256 id;
        string nombreProducto;
        uint256 precio;
        address payable agricultor;
        address comprador;
        Estado estado;
        string urlImagen;
        string[] historialTransacciones;
    }

    // --------- VARIABLES DE ESTADO ---------

    mapping(address => Agricultor) public agricultores;
    mapping(uint256 => Producto) public productos;
    uint256 public contadorProductos;

    // --------- EVENTOS ---------

    event AgricultorRegistrado(address indexed id, string nombre, string ubicacion);
    event ProductoRegistrado(uint256 indexed id, address indexed agricultor, string nombreProducto, uint256 precio);
    event ProductoFinanciado(uint256 indexed id, address indexed comprador, uint256 precio);
    event ProductoEnviado(uint256 indexed id);
    event ProductoRecibido(uint256 indexed id);
    event ProductoTransferido(uint256 indexed id, string descripcion);

    // --------- FUNCIONES ---------

    function registrarAgricultor(string memory _nombre, string memory _ubicacion) public {
        require(bytes(agricultores[msg.sender].nombre).length == 0, "Agricultor ya registrado");

        agricultores[msg.sender] = Agricultor(msg.sender, _nombre, _ubicacion);

        emit AgricultorRegistrado(msg.sender, _nombre, _ubicacion);
    }

    function publicarProducto(string memory _nombreProducto, uint256 _precio, string memory _urlImagen) public {
        require(bytes(agricultores[msg.sender].nombre).length > 0, "Solo agricultores registrados pueden publicar productos");
        require(_precio > 0, "El precio debe ser mayor a cero");

        contadorProductos++;
        Producto storage nuevoProducto = productos[contadorProductos];

        nuevoProducto.id = contadorProductos;
        nuevoProducto.nombreProducto = _nombreProducto;
        nuevoProducto.precio = _precio;
        nuevoProducto.agricultor = payable(msg.sender);
        nuevoProducto.comprador = address(0);
        nuevoProducto.estado = Estado.Publicado;
        nuevoProducto.urlImagen = _urlImagen;

        string memory inicial = string(abi.encodePacked("Producto publicado por agricultor ", agricultores[msg.sender].nombre));
        nuevoProducto.historialTransacciones.push(inicial);

        emit ProductoRegistrado(contadorProductos, msg.sender, _nombreProducto, _precio);
    }

    function financiarCompra(uint256 _idProducto) public payable {
        Producto storage p = productos[_idProducto];

        require(p.estado == Estado.Publicado, "El producto no esta disponible para financiamiento");
        require(msg.value == p.precio, "El valor enviado no coincide con el precio");

        p.comprador = msg.sender;
        p.estado = Estado.Financiado;

        p.historialTransacciones.push(
            string(abi.encodePacked("Producto financiado por comprador ", toAsciiString(msg.sender)))
        );

        emit ProductoFinanciado(_idProducto, msg.sender, p.precio);
    }

    function marcarEnviado(uint256 _idProducto) public {
        Producto storage p = productos[_idProducto];
        require(msg.sender == p.agricultor, "Solo el agricultor puede marcar como enviado");
        require(p.estado == Estado.Financiado, "El producto debe estar financiado");

        p.estado = Estado.Enviado;
        p.historialTransacciones.push("Producto marcado como enviado");

        emit ProductoEnviado(_idProducto);
    }

    function confirmarEntrega(uint256 _idProducto) public {
        Producto storage p = productos[_idProducto];
        require(msg.sender == p.comprador, "Solo el comprador puede confirmar la entrega");
        require(p.estado == Estado.Financiado || p.estado == Estado.Enviado, "Estado invalido");

        p.estado = Estado.Recibido;
        p.historialTransacciones.push("Entrega confirmada, pago liberado");

        p.agricultor.transfer(p.precio);

        emit ProductoRecibido(_idProducto);
    }

    function transferirProducto(uint256 _idProducto, address _nuevoPropietario, string memory _descripcion) public {
        Producto storage p = productos[_idProducto];
        require(msg.sender == p.agricultor || msg.sender == p.comprador, "No autorizado para transferir");
        require(_nuevoPropietario != address(0), "Direccion invalida");

        p.comprador = _nuevoPropietario;
        p.historialTransacciones.push(_descripcion);

        emit ProductoTransferido(_idProducto, _descripcion);
    }

    function obtenerHistorial(uint256 _idProducto) public view returns (string[] memory) {
        return productos[_idProducto].historialTransacciones;
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(42);
        s[0] = '0';
        s[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2 ** (8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i + 2] = char(hi);
            s[2*i + 3] = char(lo);
        }
        return string(s);
    }   
    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}