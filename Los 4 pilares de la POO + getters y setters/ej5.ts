class Persona {
    private readonly dni: string;
    
    public nombre: string;
    
    private _edad!: number;
    private _email!: string;

    constructor(dni: string, nombre: string, edad: number, email: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
    }

    get edad(): number {
        return this._edad;
    }

    set edad(valor: number) {
        if (valor < 0 || valor > 120) {
            throw new Error("La edad no puede ser negativa ni mayor a 120");
        }
        this._edad = valor;
    }

    get email(): string {
        return this._email;
    }

    set email(valor: string) {
        if (!valor.includes("@")) {
            throw new Error("El email debe contener un @");
        }
        this._email = valor;
    }

    get esMayorDeEdad(): boolean {
        return this._edad >= 18;
    }

    get datosPublicos(): string {
        return `Nombre: ${this.nombre}, ¿Es mayor?: ${this.esMayorDeEdad}`;
    }
}

console.log("Ejercicio 5");

let persona1 = new Persona("12345678", "Facundo", 25, "facu@mail.com");
console.log("Datos públicos:", persona1.datosPublicos);

persona1.edad = 30;
console.log("Nueva edad:", persona1.edad);

console.log("Email actual:", persona1.email);
persona1.email = "facu_nuevo@mail.com";

try {
    persona1.email = "email_sin_arroba";
} catch (error: any) {
    console.log("Atrapé un error:", error.message);
}
