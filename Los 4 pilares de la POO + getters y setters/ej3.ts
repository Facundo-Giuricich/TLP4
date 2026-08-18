// Esta es la clase base, o sea el padre
class Empleado {
    // protected significa que las clases hijas lo pueden usar, pero de afuera no
    protected nombre: string;
    protected antiguedad: number;

    constructor(nombre: string, antiguedad: number) {
        this.nombre = nombre;
        this.antiguedad = antiguedad;
    }

    // la base devuelve 0, después las hijas deciden cómo hacer la cuenta
    calcularSueldo(): number {
        return 0;
    }

    // este metodo sirve para cualquier empleado gracias al polimorfismo
    describir(): string {
        // uso this.calcularSueldo() y va a llamar al de la clase hija correspondiente
        return `${this.nombre} (${this.antiguedad} años) - sueldo: $${this.calcularSueldo()}`;
    }
}

// extends significa que hereda de Empleado
class EmpleadoFijo extends Empleado {
    private sueldoBase: number;

    constructor(nombre: string, antiguedad: number, sueldoBase: number) {
        // super llama al constructor del padre, osea Empleado
        super(nombre, antiguedad);
        this.sueldoBase = sueldoBase;
    }

    // acá sobreescribo el metodo del padre para que haga la cuenta real
    calcularSueldo(): number {
        // saco el bono: 2% del sueldo por cada año
        let bono = (this.sueldoBase * 0.02) * this.antiguedad;
        return this.sueldoBase + bono;
    }
}

// Pruebas
console.log("Ejercicio 3");
let empleado1 = new EmpleadoFijo("Juan", 3, 100000);
// Juan tiene 3 años, su bono es 6% (2% * 3), o sea 6000. Total = 106000
console.log(empleado1.describir());
