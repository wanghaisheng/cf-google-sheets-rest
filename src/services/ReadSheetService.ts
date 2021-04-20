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
    
    public async execute ({ sheetIndex }: requestDTO): Promise<[string[], Object]> {
        await this.doc.loadInfo();
        
        const sheet = this.doc.sheetsByIndex[sheetIndex];

        await sheet.loadHeaderRow()
        const columnsNames = sheet.headerValues;

        const rows = await sheet.getRows();

        const objectJson = removeMetaDataAndCircularStructureServiceService
                            .execute({ object: rows });

        return [columnsNames, objectJson];
    }
}

export default ReadSheetService;