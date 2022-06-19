import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import { RegisterRoutes } from "./build/routes";
import * as bodyParser from "body-parser";
import * as swaggerUi from "swagger-ui-express";

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( bodyParser.json() );

app.use(express.static(path.join(__dirname, 'public')));

RegisterRoutes(app);

/**
* start swagger-ui express server and setup the documentation to be served
*/
function startSwagger(): void {
  try {
    const swaggerDoc = require('./build/swagger.json');
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); 
    } catch (error) {
      console.error(error)
    }
}

startSwagger();

export default app;
