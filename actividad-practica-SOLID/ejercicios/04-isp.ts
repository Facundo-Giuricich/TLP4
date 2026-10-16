interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(document: string): void;
}

interface Fax {
  fax(document: string): void;
}

class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }
}

class MultifunctionDevice implements Printer, Scanner, Fax {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }

  scan(document: string): void {
    console.log(`Escaneando: ${document}`);
  }

  fax(document: string): void {
    console.log(`Enviando fax: ${document}`);
  }
}

new SimplePrinter().print("tarea.txt");


