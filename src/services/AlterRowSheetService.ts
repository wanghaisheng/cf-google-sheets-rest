import { GoogleSpreadsheet } from 'google-spreadsheet';
import removeMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface constructorDTO {
    doc: GoogleSpreadsheet;
}

interface ColumnsValues {
    column: string;
    value: string;
}

interface requestDTO {
    sheetIndex: number;
    rowIndex: number;
    columnsValues: Array<ColumnsValues>;
}

class AlterRowSheetService {

    private doc: GoogleSpreadsheet;

    constructor({ doc }: constructorDTO) {
        this.doc = doc;
    }
    
    public async execute ({ sheetIndex, rowIndex, columnsValues }: requestDTO): Promise<Object> {
        await this.doc.loadInfo();
        
        const sheet = this.doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.getRows();

        const row = rows[rowIndex];

        columnsValues.forEach((cv) => {
            row[cv.column] = cv.value;
        });
        await row.save();
        
        const objectJson = removeMetaDataAndCircularStructureServiceService
                            .execute({ object: row });

        return objectJson;
    }
}

export default AlterRowSheetService;