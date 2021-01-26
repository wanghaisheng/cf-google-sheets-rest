import { GoogleSpreadsheet } from 'google-spreadsheet';
import removeMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface constructorDTO {
    doc: GoogleSpreadsheet;
}

interface requestDTO {
    sheetIndex: number;
    rowIndex: number;
}

class DeleteRowSheetService {

    private doc: GoogleSpreadsheet;

    constructor({ doc }: constructorDTO) {
        this.doc = doc;
    }
    
    public async execute ({ sheetIndex, rowIndex }: requestDTO): Promise<Object> {
        await this.doc.loadInfo();
        
        const sheet = this.doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.getRows();

        const row = rows[rowIndex];

        await row.delete();

        const objectJson = removeMetaDataAndCircularStructureServiceService
                            .execute({ object: row });

        return objectJson;
    }
}

export default DeleteRowSheetService;