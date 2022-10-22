import express,{Request, Response} from 'express';

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  config() {
    this.app.set('port', process.env.PORT || 3000);
  }
  routes(){
    this.app.get('/',(req:Request,res:Response)=>{
        res.json({message:'Hello World'}); 
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
