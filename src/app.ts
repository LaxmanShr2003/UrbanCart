import { initializeExpressServer } from "./config/express.config";
import { intializeDatasource } from "./config/orm.config";
import express,{Express} from 'express'



(function main(){
    intializeDatasource();
    const app:Express = express();
    initializeExpressServer(app);
})();
