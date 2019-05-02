import * as express from 'express';
import api from './api';
import { config } from './config';

const port: number = config.port;
const app: express.Application = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
