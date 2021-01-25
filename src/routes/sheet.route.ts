import { Router } from 'express';
import SheetRepository from '../repositories/SheetRepository';
import WriteSheetService from '../services/WriteSheetService';

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

routeSheet.post('/sheets/:index', async (request, response) => {
    const {
        sheetId,
        client_email,
        private_key,
        rowValues,
    } = request.body;

    const { index } = request.params;

    const sheetRepository = new SheetRepository({
        sheetId,
        auth: {
            client_email,
            private_key,
        }
    });

    const row = await sheetRepository.add({ 
        sheetIndex: Number(index), 
        rowValues
    });

    response.json({ row });
});

routeSheet.patch('/sheets/:index', async (request, response) => {
    const {
        sheetId,
        client_email,
        private_key,
        rowIndex,
        columnsValues,
    } = request.body;

    const { index } = request.params;

    const sheetRepository = new SheetRepository({
        sheetId,
        auth: {
            client_email,
            private_key,
        }
    });

    const row = await sheetRepository.alter({ 
        sheetIndex: Number(index), 
        rowIndex, 
        columnsValues,
    });

    response.json({ row });
});

export default routeSheet;