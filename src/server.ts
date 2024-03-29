import 'reflect-metadata';
import express from 'express';
import { routes } from './core/routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => { console.log('Server running') })