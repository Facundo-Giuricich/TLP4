interface PaymentMethod {
  pay(amount: number): void;
}

class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con tarjeta`);
  }
}

class CashPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} en efectivo`);
  }
}

class TransferPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} por transferencia`);
  }
}

class PaymentProcessor{ 
  pay(method: PaymentMethod, amount: number): void {
    method.pay(amount);
  }
}

new PaymentProcessor().pay(new CardPayment(), 100);
new PaymentProcessor().pay(new CashPayment(), 500);
new PaymentProcessor().pay(new TransferPayment(), 400);

