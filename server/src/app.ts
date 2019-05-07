import * as express from 'express';
import api from 'api';
import { config } from 'config';
import { errorHandler } from 'middleware/error-handler';

const port: number = config.port;
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
