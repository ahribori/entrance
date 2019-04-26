import * as express from 'express';
import { config } from './config';

const port: number = config.port;
const app: express.Application = express();

app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
