import { GoogleSpreadsheet } from 'google-spreadsheet';

interface ColumnsValues {
    column: string;
    value: string;
}

interface requestDTO {
    doc: GoogleSpreadsheet;
    sheetIndex: number;
    rowIndex: number /*| null*/;
    columnsValues: Array<ColumnsValues>;
}

class WriteSheetService {
    
    public async execute ({ doc, sheetIndex, rowIndex, columnsValues }: requestDTO)/*: Promise<Object>*/ {
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.getRows();

        const row = rows[rowIndex];

        columnsValues.forEach((cv) => {
            row[cv.column] = cv.value;
        });
        await row.save();
        
        const removerMetaDatasAndCircularStructure = () => {
            const visited = new WeakSet();
            return (key: any, value: any) => {
                if (key == "_sheet" || key == "_rowNumber" || key == "_rawData") {
                    return undefined
                }
                if (typeof value === "object" && value !== null) {
                    if (visited.has(value)) return;
                    visited.add(value);
                }
                return value;
            };
        };

        const stringJson = JSON.stringify(row, removerMetaDatasAndCircularStructure());

        const objectJson = JSON.parse(stringJson);

        return objectJson;

        return objectJson;
    }
}

export default WriteSheetService;