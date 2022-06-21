import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import { RegisterRoutes } from "./build/routes";
import * as bodyParser from "body-parser";
import * as swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import * as cors from 'cors'

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( bodyParser.json() );
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
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

app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.status || 500;
  const body: any = {
    fields: err.fields || undefined,
    message: err.message || 'An error occurred during the request.',
    name: err.name,
    status
  };
  res.status(status).json(body);
  next();
});

export default app;
