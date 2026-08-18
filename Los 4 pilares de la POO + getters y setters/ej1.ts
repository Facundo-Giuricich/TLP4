class Producto {
    nombre: string;
    precio: number;
    categoria: string;
    stock: number;

    // Con el constructor le doy los valores iniciales al crear el producto
    constructor(nombre: string, precio: number, categoria: string, stock: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    //  armo el texto que pide la consigna
    describir(): string {
        return `${this.nombre} ($${this.categoria}): $${this.precio} - ${this.stock} unidades`;
    }

    // Devuelve true si la cantidad que pido es menor o igual al stock que tengo
    hayStock(cantidad: number): boolean {
        return cantidad <= this.stock;
    }

    // Vendo unidades, si hay stock lo resto, si no, tira un error 
    venderUnidades(cantidad: number): void {
        if (this.hayStock(cantidad)) {
            // así descuento del stock actual
            this.stock = this.stock - cantidad;
        } else {
            // Lanzo error para que el programa avise que falló y corte
            throw new Error("No hay suficiente stock para vender esa cantidad");
        }
    }

    // Calculo el descuento sin cambiar el precio original
    aplicarDescuento(porcentaje: number): number {
        // saco la cuenta matemática básica para porcentaje
        let descuento = (this.precio * porcentaje) / 100;
        return this.precio - descuento;
    }
}

// Acá las pruebas para ver que todo funcione bien
let miProducto = new Producto("Teclado", 10000, "electrónica", 5);
console.log("Descripción:", miProducto.describir());

console.log("¿Hay stock de 3?:", miProducto.hayStock(3));
miProducto.venderUnidades(3);
console.log("Stock después de vender 3:", miProducto.stock);

console.log("Precio con 10% de descuento:", miProducto.aplicarDescuento(10));
// Verifico que el precio original siga igual
console.log("Precio original sigue siendo:", miProducto.precio);