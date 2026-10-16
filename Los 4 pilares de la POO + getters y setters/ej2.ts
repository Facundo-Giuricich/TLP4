class CuentaBancaria {
    readonly titular: string;
    private saldo: number;
    private historial: string[];

    constructor(titular: string, saldoInicial: number) {
        this.titular = titular;
        this.saldo = saldoInicial;
        this.historial = [];
        this.historial.push(`depósito inicial: +${saldoInicial}`);
    }

    depositar(monto: number): void {
        if (monto <= 0) {
            throw new Error("El monto a depositar debe ser mayor a 0");
        }
        this.saldo = this.saldo + monto;
        this.historial.push(`depósito: +${monto}`);
    }

    retirar(monto: number): void {
        if (monto <= 0) {
            throw new Error("El monto a retirar debe ser mayor a 0");
        }
        if (monto > this.saldo) {
            throw new Error("No hay suficiente saldo para retirar ese monto");
        }
        
        this.saldo = this.saldo - monto;
        this.historial.push(`retiro: -${monto}`);
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    obtenerHistorial(): string[] {
        return [...this.historial];
    }
}

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
