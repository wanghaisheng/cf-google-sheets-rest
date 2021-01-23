import { Router } from 'express';
import routeSheet from './sheet.route';

const route = Router();

route.use(routeSheet);

export default route;