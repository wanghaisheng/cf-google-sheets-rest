import { Router } from 'express';
import routeSheet from './sheet.routes';

const route = Router();

route.use(routeSheet);

export default route;