import { Router } from 'express';
import SheetRepository from '../repositories/SheetRepository';

const routeSheet = Router();

routeSheet.get('/sheets/:docId', async (request, response) => {
    const {
        client_email,
        private_key,
    } = request.body;

    const { docId } = request.params;

    const sheetRepository = new SheetRepository({
        docId,
        auth: {
            client_email,
            private_key,
        }
    });

    const sheets = await sheetRepository.all();

    response.json({ sheets });
});

routeSheet.get('/sheets/:docId/:index', async (request, response) => {
    const {
        client_email,
        private_key,
    } = request.body;

    const { docId, index } = request.params;

    const sheetRepository = new SheetRepository({
        docId,
        auth: {
            client_email,
            private_key,
        }
    });

    const sheet = await sheetRepository.find(Number(index));

    response.json({ sheet });
});

routeSheet.post('/sheets/:docId/:index', async (request, response) => {
    const {
        client_email,
        private_key,
        rowValues,
    } = request.body;

    const { docId, index } = request.params;

    const sheetRepository = new SheetRepository({
        docId,
        auth: {
            client_email,
            private_key,
        }
    });

    const rows = await sheetRepository.add({ 
        sheetIndex: Number(index), 
        rowValues
    });

    response.json({ rows });
});

routeSheet.patch('/sheets/:docId/:index', async (request, response) => {
    const {
        client_email,
        private_key,
        rowIndex,
        columnsValues,
    } = request.body;

    const { docId, index } = request.params;

    const sheetRepository = new SheetRepository({
        docId,
        auth: {
            client_email,
            private_key,
        }
    });

    const rows = await sheetRepository.alter({ 
        sheetIndex: Number(index), 
        rowIndex, 
        columnsValues,
    });

    response.json({ rows });
});

routeSheet.delete('/sheets/:docId/:index', async (request, response) => {
    const {
        sheetId,
        client_email,
        private_key,
        rowIndex,
    } = request.body;

    const { docId, index } = request.params;

    const sheetRepository = new SheetRepository({
        docId,
        auth: {
            client_email,
            private_key,
        }
    });

    const row = await sheetRepository.drop({ 
        sheetIndex: Number(index), 
        rowIndex,
    });

    response.json({ row });
});

export default routeSheet;