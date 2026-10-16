interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(protected width: number, protected height: number) {}

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(protected side: number) {}

  setSide(side: number): void {
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}

function printArea(shape: Shape): void {
  console.log(`Área obtenida: ${shape.area()}`);
}

printArea(new Rectangle(5, 10));
printArea(new Square(5));

