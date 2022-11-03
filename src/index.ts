import express,{Request, Response} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  config() {
    this.app.set('port', process.env.PORT || 3000);
    //middelwares
    this.app.use(morgan('common'));
    this.app.use(helmet());
  }
  routes(){
    this.app.get('/',(req:Request,res:Response)=>{
        res.json({message:'Hello World'}); 
    });

    this.app.post('/',(req:Request,res:Response)=>{
      res.json({message:'Hello World',data:req.body}); 
  });
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
