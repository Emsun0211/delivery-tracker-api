import 'reflect-metadata';
import express, { Router } from 'express';
import { AuthRoute } from './routes/authRoute';
import connectDB  from './server';
import { Routes } from './utils/interfaces';
import { ErrorMIddleware } from './middleware/errorMiddleware';
const PORT = 5000 || process.env.PORT;

// const app = express();

// // parsing request body and parameters

// app.use(express.json());



// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
//  connectDB();

// app.use('/api/auth', authRoute)

// app.post('/', (req, res) => {
//   console.log(req.body);
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

class App {
  public app: express.Application;
  public env: string;
  public  PORT: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.PORT = PORT || 5000;
    this.connectToDB();
    this.initialiseMiddleware()
    this.initialiseRouter(routes);
    this.intializeErrorMiddleware() 
    // this.listen();
  }

  private connectToDB(){
    connectDB();
  }

  public initialiseRouter(routes: Routes[]){
    routes.forEach(route => {
      this.app.use(route.path, route.router);
    });
  }

  public initialiseMiddleware(){
    this.app.use(express.json())
  }

  public listen(){
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    })
  }


  public intializeErrorMiddleware(){
    this.app.use(ErrorMIddleware)
  }
}

const app = new App([new AuthRoute()]);

app.listen()


