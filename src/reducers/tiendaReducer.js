const estadoInicial = {
    productos:[
        {id: 1, nombre: 'Producto 1'},
		{id: 2, nombre: 'Producto 2'},
		{id: 3, nombre: 'Producto 3'},
		{id: 4, nombre: 'Producto 4'}
    ],
    carrito:[]
}


const reducer = (estado = estadoInicial,accion) => {
    switch(accion.type){
        case 'AGREGAR_AL_CARRITO':
            const {nombre,id} = accion; //Deestructuracion

            if(estado.carrito.length === 0){
                return{
                    ...estado,
                    carrito:[{id: id,nombre:nombre,cantidad:1}]
                }
                
            }else{
                // De otra foma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar.
                // Si ya lo tiene entonces queremos actualizar su valor.
                // Si no tiene el producto entonces lo agregamos.

                // Para poder editar el arreglo tenemos que clonarlo.
                const nuevoCarrito = [...estado.carrito];

                // Comprobamos si el carrito ya tiene el ID del producto a agregar.
                const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
                    return productoDeCarrito.id === id
                }).length > 0;

                    // Si ya tiene el producto entonces lo tenemos que actualizar.
                if(yaEstaEnCarrito){
                    // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
                    // Y en base a su posicion ya actualizamos el valor.
                    nuevoCarrito.forEach((productoDeCarrito, index) => {
                        if(productoDeCarrito.id === id){
                            const cantidad = nuevoCarrito[index].cantidad;
                            nuevoCarrito[index] = {
                                id: id, 
                                nombre: nombre, 
                                cantidad: cantidad + 1
                            }
                        }
                    });
                } else {
                    nuevoCarrito.push(
                        {
                            id: id,
                            nombre: nombre,
                            cantidad: 1
                        }
                    );
                }

                return{...estado,
                          carrito: nuevoCarrito}
            }
        default:
            return estado;
    }
}


 
export default reducer;