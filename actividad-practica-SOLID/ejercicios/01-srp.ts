interface User {
  username: string;
  email: string;
}

class UserValidator {
    isValidEmail(email: string): boolean {
      if (!email.includes("@")) {
        return false;
      }
      return true;
    }
}

class UserRepository {
  users: User[] = [];

   register(username: string, email: string): void {
    this.users.push ({ username, email });
  }
}

class EmailService {
  sendWelcomeEmail(email: string): string {
    return `Email enviado a ${email}`;
  }
}

class UserRegistrationService {
  constructor(
    public userValidator: UserValidator = new UserValidator(),
    public userRepository: UserRepository = new UserRepository(),
    public emailService: EmailService = new EmailService()
  ) {}

  registerUser(username: string, email: string): void {
    if (!this.userValidator.isValidEmail(email)) {
      throw new Error("Email inválido");
    }
    this.userRepository.register(username, email);
    console.log(this.emailService.sendWelcomeEmail(email));
  }
}


