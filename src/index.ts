import express,{Request, Response} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config  from './config/app';
// import db from './config/database';
import routes from './routes';

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  config() {
    this.app.set('port',config.PORT);
    //middelwares
    this.app.use(express.json());
    this.app.use(morgan('common'));
    this.app.use(helmet());
    this.app.use(RateLimit({
      windowMs: 60 * 1000, //15 min
      max:100, //Limit each ip to 100 requests per 'window' here pear 15 min
      standardHeaders:true,
      legacyHeaders:false
    }));
  }
  routes(){
    this.app.get('/',(req:Request,res:Response)=>{
        //throw new Error('ali error');
        res.json({message:'Hello World'}); 
    });

    // this.app.post('/',(req:Request,res:Response)=>{
    //   res.json({message:'Hello World',data:req.body}); 
    // });
    this.app.use('/api',routes);
    this.app.use(errorMiddleware);
    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({
        message:
          'Ohh you are lost, read the API documentation to find your way back home 😂',
      });
    });
    // db.connect().then((client)=>{
    //   return client
    //   .query('SELECT NOW()')
    //   .then((res)=>{
    //     console.log(res.rows);
    //     client.release();
    //   }).catch((err)=>{
    //     console.warn(err.message);
    //   });
    // }).catch((err)=>{
    //   console.warn(err.message);
    // })

  }
  //start app
  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on Port', this.app.get('port'));
    });
  }
}

const server = new Server();
server.start();

export default server;
