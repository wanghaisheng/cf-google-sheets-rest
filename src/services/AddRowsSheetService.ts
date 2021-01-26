import { GoogleSpreadsheet } from 'google-spreadsheet';
import removeMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface requestDTO {
    doc: GoogleSpreadsheet;
    sheetIndex: number;
    rowValues: Array<(
        | {
            [header: string]: string | number | boolean;
        }
        | Array<string | number | boolean>
    )>,
}

class AddRowsSheetService {
    
    public async execute ({ doc, sheetIndex, rowValues }: requestDTO): Promise<Object> {
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.addRows(rowValues);
        
        const objectJson = removeMetaDataAndCircularStructureServiceService
                            .execute({ object: rows });

        return objectJson;
    }
}

export default AddRowsSheetService;