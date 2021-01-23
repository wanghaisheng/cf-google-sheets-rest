import { GoogleSpreadsheet } from 'google-spreadsheet';

interface requestDTO {
    doc: GoogleSpreadsheet;
    sheetIndex: number;
}

class ReadSheetService {
    
    public async execute ({ doc, sheetIndex }: requestDTO): Promise<Object> {
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[sheetIndex];

        const rows = await sheet.getRows();

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

        const stringJson = JSON.stringify(rows, removerMetaDatasAndCircularStructure());

        const objectJson = JSON.parse(stringJson);

        return objectJson;
    }
}

export default ReadSheetService;