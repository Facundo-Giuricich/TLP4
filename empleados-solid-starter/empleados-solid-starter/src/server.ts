import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { EmployeeController } from './controllers/employee.controller.js';
import { errorHandler } from './middleware/error-handler.js';
import { MongoEmployeeRepository } from './repository/employee.repository.js';
import { createEmployeeRoutes } from './routes/employee.routes.js';
import { EmployeeService } from './services/employee.service.js';

const app = express();
app.use(express.json());

const service = new EmployeeService(new MongoEmployeeRepository());
const controller = new EmployeeController(service);

app.use('/employees', createEmployeeRoutes(controller));
app.use(errorHandler);

const PORT = Number(process.env.PORT ?? 3000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/employees_db';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a MongoDB', error);
    process.exit(1);
  });
