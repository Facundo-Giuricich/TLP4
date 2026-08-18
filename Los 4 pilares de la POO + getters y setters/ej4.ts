// Copio las clases del ej3 para que funcione todo junto acá (otra forma sería exportar/importar, pero así es más facil por ahora)
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

// Ahora agrego lo nuevo que pide el ejercicio 4

// Empleado por horas
class EmpleadoPorHoras extends Empleado {
    private horasTrabajadas: number;
    private valorHora: number;

    constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
        super(nombre, antiguedad);
        this.horasTrabajadas = horasTrabajadas;
        this.valorHora = valorHora;
    }

    // su propia forma de calcular el sueldo (horas * valor)
    calcularSueldo(): number {
        return this.horasTrabajadas * this.valorHora;
    }
}

// Empleado por comisión
class EmpleadoPorComision extends Empleado {
    private ventasDelMes: number;
    private porcentajeComision: number;

    constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
        super(nombre, antiguedad);
        this.ventasDelMes = ventasDelMes;
        // lo pido como decimal
        this.porcentajeComision = porcentajeComision;
    }

    // sueldo es ventas por el porcentaje
    calcularSueldo(): number {
        return this.ventasDelMes * this.porcentajeComision;
    }
}

// función suelta (fuera de las clases) para sumar todos los sueldos
function calcularNomina(empleados: Empleado[]): number {
    let total = 0;
    // recorro el arreglo con un for...of para que TypeScript no me diga undefined
    for (let empleado of empleados) {
        // gracias al polimorfismo no me importa qué tipo de empleado es, 
        // cada uno sabe como calcular su propio sueldo
        total = total + empleado.calcularSueldo();
    }
    return total;
}


// Pruebas
console.log("Ejercicio 4");
// armo las instancias
let emp1 = new EmpleadoFijo("Ana", 5, 100000);
let emp2 = new EmpleadoPorHoras("Luis", 2, 40, 1500); // 40hs a 1500 = 60000
let emp3 = new EmpleadoPorComision("Marta", 1, 500000, 0.10); // 10% de 500k = 50000

// las guardo en un arreglo
let todosLosEmpleados: Empleado[] = [emp1, emp2, emp3];

// recorro para mostrar descripciones con un for...of
for (let empleado of todosLosEmpleados) {
    console.log(empleado.describir());
}

// pruebo la funcion de la nómina
let totalPagar = calcularNomina(todosLosEmpleados);
console.log("El total de la nómina a pagar es: $" + totalPagar);
