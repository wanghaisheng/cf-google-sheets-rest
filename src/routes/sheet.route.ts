import { Router } from 'express';
import SheetRepository from '../repositories/SheetRepository';

const routeSheet = Router();

routeSheet.get('/sheets', async (request, response) => {
    const {
        sheetId,
        client_email,
        private_key,
    } = request.body;

    const sheetRepository = new SheetRepository({
        sheetId,
        auth: {
            client_email,
            private_key,
        }
    });

    const sheets = await sheetRepository.all();

    response.json({ sheets });
});

routeSheet.get('/sheets/:index', async (request, response) => {
    const {
        sheetId,
        client_email,
        private_key,
    } = request.body;

    const { index } = request.params;

    const sheetRepository = new SheetRepository({
        sheetId,
        auth: {
            client_email,
            private_key,
        }
    });

    const sheets = await sheetRepository.find(Number(index));

    response.json({ sheets });
});

export default routeSheet;