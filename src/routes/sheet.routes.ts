import { Router } from 'express';
import ensureConfiguration from '../middlewares/ensureConfiguration';
import SheetRepository from '../repositories/SheetRepository';

const routeSheet = Router();

routeSheet.use(ensureConfiguration);

routeSheet.get('/sheets/:docId', async (request, response) => {
    const { client_email, private_key } = request.config;

    const { docId } = request.params;

    const sheetRepository = new SheetRepository({
        docId,
        auth: {
            client_email,
            private_key,
        }
    });

    const sheets = await sheetRepository.all();

    response.set('X-Total-Count', sheets.length.toString());

    response.json({ sheets });
});

routeSheet.get('/sheets/:docId/:index', async (request, response) => {
    const { client_email, private_key } = request.config;

    const { docId, index } = request.params;

    const sheetRepository = new SheetRepository({
        docId,
        auth: {
            client_email,
            private_key,
        }
    });

    const sheet = await sheetRepository.find(Number(index));

    response.set('X-Total-Count', Object.keys(sheet.data).length.toString());

    response.json({ sheet });
});

routeSheet.post('/sheets/:docId/:index', async (request, response) => {
    const { client_email, private_key } = request.config;
    
    const { rowValues } = request.body;

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
    const {  client_email, private_key } = request.config;

    const { rowIndex, columnsValues } = request.body;

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
    const { client_email, private_key } = request.config;

    const { sheetId, rowIndex } = request.body;

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