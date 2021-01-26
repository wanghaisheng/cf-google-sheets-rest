import { GoogleSpreadsheet } from 'google-spreadsheet';
import RemoveMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface requestDTO {
    doc: GoogleSpreadsheet;
    sheetIndex: number;
    rowIndex: number;
}

class DeleteRowSheetService {
    
    public async execute ({ doc, sheetIndex, rowIndex }: requestDTO): Promise<Object> {
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.getRows();

        const row = rows[rowIndex];

        await row.delete();
        
        const handler = new RemoveMetaDataAndCircularStructureServiceService();

        const objectJson = handler.execute({ object: row });

        return objectJson;
    }
}

export default DeleteRowSheetService;