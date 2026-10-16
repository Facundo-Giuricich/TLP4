class Empleado {
    protected nombre: string;
    protected antiguedad: number;

    constructor(nombre: string, antiguedad: number) {
        this.nombre = nombre;
        this.antiguedad = antiguedad;
    }

    calcularSueldo(): number {
        return 0;
    }

    describir(): string {
        return `${this.nombre} (${this.antiguedad} años) - sueldo: $${this.calcularSueldo()}`;
    }
}

class EmpleadoFijo extends Empleado {
    private sueldoBase: number;

    constructor(nombre: string, antiguedad: number, sueldoBase: number) {
        super(nombre, antiguedad);
        this.sueldoBase = sueldoBase;
    }

    calcularSueldo(): number {
        let bono = (this.sueldoBase * 0.02) * this.antiguedad;
        return this.sueldoBase + bono;
    }
}

console.log("Ejercicio 3");
let empleado1 = new EmpleadoFijo("Juan", 3, 100000);
console.log(empleado1.describir());
