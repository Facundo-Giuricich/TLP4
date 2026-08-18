class Persona {
    // dni privado y readonly, no se puede cambiar luego de crearlo
    private readonly dni: string;
    
    // nombre público sin restricciones
    public nombre: string;
    
    // El signo de exclamación (!) lo pongo por un error de typescript que me dice que no está inicializado"
    private _edad!: number;
    private _email!: string;

    constructor(dni: string, nombre: string, edad: number, email: string) {
        this.dni = dni;
        this.nombre = nombre;
        // uso los setters que voy a crear abajo, en vez de asignar directo a la propiedad
        // así las validaciones también corren cuando creo la Persona
        this.edad = edad;
        this.email = email;
    }

    // GETTERS Y SETTERS PARA LA EDAD 

    // así pido el dato
    get edad(): number {
        return this._edad;
    }

    // así lo guardo, validando que esté correcto
    set edad(valor: number) {
        // rechazo menores a 0 o mayores a 120
        if (valor < 0 || valor > 120) {
            throw new Error("La edad no puede ser negativa ni mayor a 120");
        }
        // si pasó la validación, lo guardo
        this._edad = valor;
    }

    // GETTERS Y SETTERS PARA EL EMAIL

    get email(): string {
        return this._email;
    }

    set email(valor: string) {
        // incluyo la función .includes() de string para buscar el arroba
        if (!valor.includes("@")) {
            throw new Error("El email debe contener un @");
        }
        this._email = valor;
    }

    //  GETTERS EXTRA 

    // devuelvo true o false dependiendo si la edad da para ser mayor
    get esMayorDeEdad(): boolean {
        // no guardo nada, lo calculo en el momento
        return this._edad >= 18;
    }

    get datosPublicos(): string {
        // armo el string sin mostrar los datos sensibles
        // uso el this.esMayorDeEdad (llama al get de arriba)
        return `Nombre: ${this.nombre}, ¿Es mayor?: ${this.esMayorDeEdad}`;
    }
}

// Pruebas
console.log("Ejercicio 5");

let persona1 = new Persona("12345678", "Facundo", 25, "facu@mail.com");
console.log("Datos públicos:", persona1.datosPublicos);

// Probando el set de edad válido
persona1.edad = 30;
console.log("Nueva edad:", persona1.edad);

// Probando un set inválido de edad (comento el error para que siga el programa)
// persona1.edad = -5; 

// Probando el set de email
console.log("Email actual:", persona1.email);
persona1.email = "facu_nuevo@mail.com";

// Probando un email inválido (sin arroba)
try {
    persona1.email = "email_sin_arroba";
} catch (error: any) {
    console.log("Atrapé un error:", error.message);
}
