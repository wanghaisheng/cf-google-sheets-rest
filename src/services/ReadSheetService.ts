import { GoogleSpreadsheet } from 'google-spreadsheet';
import removeMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface requestDTO {
    doc: GoogleSpreadsheet;
    sheetIndex: number;
}

class ReadSheetService {
    
    public async execute ({ doc, sheetIndex }: requestDTO): Promise<Object> {
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.getRows();

        const objectJson = removeMetaDataAndCircularStructureServiceService
                            .execute({ object: rows });

        return objectJson;
    }
}

export default ReadSheetService;