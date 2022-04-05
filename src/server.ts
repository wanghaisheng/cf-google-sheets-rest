import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import route from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(route);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('It\'s running...'));