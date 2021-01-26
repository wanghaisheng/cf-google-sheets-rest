import { GoogleSpreadsheet } from 'google-spreadsheet';
import removeMetaDataAndCircularStructureServiceService from './RemoveMetaDataAndCircularStructureServiceService';

interface constructorDTO {
    doc: GoogleSpreadsheet;
}
interface requestDTO {
    sheetIndex: number;
    rowValues: Array<(
        | {
            [header: string]: string | number | boolean;
        }
        | Array<string | number | boolean>
    )>,
}

class AddRowsSheetService {

    private doc: GoogleSpreadsheet;

    constructor({ doc }: constructorDTO) {
        this.doc = doc
    }
    
    public async execute ({ sheetIndex, rowValues }: requestDTO): Promise<Object> {
        await this.doc.loadInfo();
        
        const sheet = this.doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.addRows(rowValues);
        
        const objectJson = removeMetaDataAndCircularStructureServiceService
                            .execute({ object: rows });

        return objectJson;
    }
}

export default AddRowsSheetService;