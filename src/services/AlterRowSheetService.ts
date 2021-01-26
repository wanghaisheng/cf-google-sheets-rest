import { GoogleSpreadsheet } from 'google-spreadsheet';
import removeMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface ColumnsValues {
    column: string;
    value: string;
}

interface requestDTO {
    doc: GoogleSpreadsheet;
    sheetIndex: number;
    rowIndex: number;
    columnsValues: Array<ColumnsValues>;
}

class AlterRowSheetService {
    
    public async execute ({ doc, sheetIndex, rowIndex, columnsValues }: requestDTO): Promise<Object> {
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[sheetIndex];

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