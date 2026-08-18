class CuentaBancaria {
    // titular lo pongo readonly así queda fijo como pide la consigna
    readonly titular: string;
    // el saldo lo pongo privado para que no se pueda modificar desde afuera
    private saldo: number;
    // armo un arreglo privado para guardar los movimientos como string
    private historial: string[];

    // el constructor recibe el nombre y el saldo inicial
    constructor(titular: string, saldoInicial: number) {
        this.titular = titular;
        this.saldo = saldoInicial;
        // arranca el historial vacío y con el deposito inicial
        this.historial = [];
        this.historial.push(`depósito inicial: +${saldoInicial}`);
    }

    // método para sumar plata
    depositar(monto: number): void {
        if (monto <= 0) {
            // rechazo tirando error como pide la consigna
            throw new Error("El monto a depositar debe ser mayor a 0");
        }
        this.saldo = this.saldo + monto;
        // guardo el movimiento
        this.historial.push(`depósito: +${monto}`);
    }

    // método para sacar plata
    retirar(monto: number): void {
        if (monto <= 0) {
            throw new Error("El monto a retirar debe ser mayor a 0");
        }
        if (monto > this.saldo) {
            throw new Error("No hay suficiente saldo para retirar ese monto");
        }
        
        this.saldo = this.saldo - monto;
        // guardo el movimiento
        this.historial.push(`retiro: -${monto}`);
    }

    // con esto solo leo el saldo sin poder tocarlo
    consultarSaldo(): number {
        return this.saldo;
    }

    // devuelvo una copia del historial, así si lo modifican afuera no afecta al original
    obtenerHistorial(): string[] {
        return [...this.historial];
    }
}

// pruebas
console.log("Ejercicio 2");
let cuenta = new CuentaBancaria("Facundo", 5000);
console.log("Titular:", cuenta.titular);
console.log("Saldo inicial:", cuenta.consultarSaldo());

cuenta.depositar(2000);
console.log("Saldo después de depositar 2000:", cuenta.consultarSaldo());

cuenta.retirar(1000);
console.log("Saldo después de retirar 1000:", cuenta.consultarSaldo());

console.log("Historial completo:");
console.log(cuenta.obtenerHistorial());
