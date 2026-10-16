interface Equipo {
  nombre: string;
  tipo: string;
  estado: string;
}

class Inventario {
  private static instancia: Inventario | undefined;
  private equipos: Equipo[] = [];

 
  private constructor() {}

  static obtenerInstancia(): Inventario {
    if (Inventario.instancia === undefined) {
      Inventario.instancia = new Inventario();
    }
    return Inventario.instancia;
  }

  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.equipos.push({ nombre: nombre, tipo: tipo, estado: estado });
  }

  listarEquipos(): Equipo[] {
    return this.equipos;
  }
}


const inventario = Inventario.obtenerInstancia();
inventario.agregarEquipo("Notebook HP", "Portátil", "disponible");
console.log(inventario.listarEquipos());
console.log(`Misma instancia: ${inventario === Inventario.obtenerInstancia()}`);
