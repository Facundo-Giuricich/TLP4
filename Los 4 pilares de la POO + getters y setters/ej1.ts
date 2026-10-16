class Producto {
    nombre: string;
    precio: number;
    categoria: string;
    stock: number;

    constructor(nombre: string, precio: number, categoria: string, stock: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    describir(): string {
        return `${this.nombre} ($${this.categoria}): $${this.precio} - ${this.stock} unidades`;
    }

    hayStock(cantidad: number): boolean {
        return cantidad <= this.stock;
    }

    venderUnidades(cantidad: number): void {
        if (this.hayStock(cantidad)) {
            this.stock = this.stock - cantidad;
        } else {
            throw new Error("No hay suficiente stock para vender esa cantidad");
        }
    }

    aplicarDescuento(porcentaje: number): number {
        let descuento = (this.precio * porcentaje) / 100;
        return this.precio - descuento;
    }
}

let miProducto = new Producto("Teclado", 10000, "electrónica", 5);
console.log("Descripción:", miProducto.describir());

console.log("¿Hay stock de 3?:", miProducto.hayStock(3));
miProducto.venderUnidades(3);
console.log("Stock después de vender 3:", miProducto.stock);

console.log("Precio con 10% de descuento:", miProducto.aplicarDescuento(10));
console.log("Precio original sigue siendo:", miProducto.precio);