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

class EmpleadoPorHoras extends Empleado {
    private horasTrabajadas: number;
    private valorHora: number;

    constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
        super(nombre, antiguedad);
        this.horasTrabajadas = horasTrabajadas;
        this.valorHora = valorHora;
    }

    calcularSueldo(): number {
        return this.horasTrabajadas * this.valorHora;
    }
}

class EmpleadoPorComision extends Empleado {
    private ventasDelMes: number;
    private porcentajeComision: number;

    constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
        super(nombre, antiguedad);
        this.ventasDelMes = ventasDelMes;
        this.porcentajeComision = porcentajeComision;
    }

    calcularSueldo(): number {
        return this.ventasDelMes * this.porcentajeComision;
    }
}

function calcularNomina(empleados: Empleado[]): number {
    let total = 0;
    for (let empleado of empleados) {
        total = total + empleado.calcularSueldo();
    }
    return total;
}


console.log("Ejercicio 4");
let emp1 = new EmpleadoFijo("Ana", 5, 100000);
let emp2 = new EmpleadoPorHoras("Luis", 2, 40, 1500);
let emp3 = new EmpleadoPorComision("Marta", 1, 500000, 0.10);

let todosLosEmpleados: Empleado[] = [emp1, emp2, emp3];

for (let empleado of todosLosEmpleados) {
    console.log(empleado.describir());
}

let totalPagar = calcularNomina(todosLosEmpleados);
console.log("El total de la nómina a pagar es: $" + totalPagar);
