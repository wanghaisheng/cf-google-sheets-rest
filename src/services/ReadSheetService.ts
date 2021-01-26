import { GoogleSpreadsheet } from 'google-spreadsheet';
import removeMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface constructorDTO {
    doc: GoogleSpreadsheet;
}

interface requestDTO {
    sheetIndex: number;
}

class ReadSheetService {

    private doc: GoogleSpreadsheet;

    constructor({ doc }: constructorDTO) {
        this.doc = doc;
    }
    
    public async execute ({ sheetIndex }: requestDTO): Promise<Object> {
        await this.doc.loadInfo();
        
        const sheet = this.doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.getRows();

        const objectJson = removeMetaDataAndCircularStructureServiceService
                            .execute({ object: rows });

        return objectJson;
    }
}

export default ReadSheetService;