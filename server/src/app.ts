import * as express from 'express';
import * as path from 'path';
import api from './api';
import { errorHandler } from './middleware/error-handler';
import config from './config';

const port: number = config.port;
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('../client/build')));
app.use(express.static('public'));
app.use('/sdk', express.static(path.resolve('../sdk/dist')));
app.use('/api', api);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
