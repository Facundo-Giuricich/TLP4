interface Notifier {
  send(to: string, message: string): void;
}

class EmailSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`Correo para ${to}: ${message}`);
  }
}

class SmsSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`SMS para ${to}: ${message}`);
  }
}

class OrderService {
  private notifier: Notifier;

  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }

  createOrder(customerEmail: string): void {
    console.log("Pedido creado");

    this.notifier.send(
      customerEmail,
      "Tu pedido fue creado"
    );
  }
}

const notifier: Notifier = new SmsSender();
const orderService = new OrderService(notifier);

orderService.createOrder("facundogiuricich@example.com");

