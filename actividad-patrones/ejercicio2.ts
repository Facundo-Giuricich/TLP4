
abstract class EquipoBase {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  abstract detalles(): string;
}

class Notebook extends EquipoBase {
  ram: string;
  procesador: string;

  constructor(nombre: string, ram: string, procesador: string) {
    super(nombre);
    this.ram = ram;
    this.procesador = procesador;
  }

  detalles(): string {
    return `Tipo: Notebook, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
  }
}

class Desktop extends EquipoBase {
  ram: string;
  procesador: string;

  constructor(nombre: string, ram: string, procesador: string) {
    super(nombre);
    this.ram = ram;
    this.procesador = procesador;
  }

  detalles(): string {
    return `Tipo: Desktop, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
  }
}

class Servidor extends EquipoBase {
  ram: string;
  procesador: string;

  constructor(nombre: string, ram: string, procesador: string) {
    super(nombre);
    this.ram = ram;
    this.procesador = procesador;
  }

  detalles(): string {
    return `Tipo: Servidor, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
  }
}

class EquipoFactory {
  crearEquipo(
    tipo: "Notebook" | "Desktop" | "Servidor",
    nombre: string,
    ram: string,
    procesador: string,
  ): EquipoBase {
    if (tipo === "Notebook") {
      return new Notebook(nombre, ram, procesador);
    }
    if (tipo === "Desktop") {
      return new Desktop(nombre, ram, procesador);
    }
    if (tipo === "Servidor") {
      return new Servidor(nombre, ram, procesador);
    }
    throw new Error("Tipo de equipo no reconocido");
  }
}

const factory = new EquipoFactory();
const equipo1 = factory.crearEquipo("Notebook", "Dell XPS", "16GB", "i7");
const equipo2 = factory.crearEquipo("Desktop", "Lenovo ThinkCentre", "8GB", "i5");
const equipo3 = factory.crearEquipo("Servidor", "Dell PowerEdge", "64GB", "Xeon");
console.log(equipo1.detalles());
console.log(equipo2.detalles());
console.log(equipo3.detalles());
