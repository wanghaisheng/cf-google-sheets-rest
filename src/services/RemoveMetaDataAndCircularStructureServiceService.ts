import { GoogleSpreadsheetRow } from "google-spreadsheet";

interface requestDTO {
    object: GoogleSpreadsheetRow | GoogleSpreadsheetRow[];
}

class RemoveMetaDataAndCircularStructureServiceService {
    
    public execute ({ object }: requestDTO): Object {

        const stringJson = JSON.stringify(object, this.removerMetaDatasAndCircularStructure());

        const objectJson = JSON.parse(stringJson);

        return objectJson;
    }

    private removerMetaDatasAndCircularStructure = () => {
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
}

export default RemoveMetaDataAndCircularStructureServiceService;