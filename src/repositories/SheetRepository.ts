import { GoogleSpreadsheet } from 'google-spreadsheet';
import Sheet from '../models/Sheet';
import AddRowsSheetService from '../services/AddRowsSheetService';
import AuthDocService from '../services/AuthDocService';
import DeleteRowSheetService from '../services/DeleteRowSheetService';
import indexConverter from '../services/IndexConverter';
import ReadSheetService from '../services/ReadSheetService';
import AlterRowSheetService from '../services/AlterRowSheetService';


interface dropRequest {
    sheetIndex: number; 
    rowIndex: number;
}

interface addRequest {
    sheetIndex: number;
    rowValues: Array<(
        | {
            [header: string]: string | number | boolean;
        }
        | Array<string | number | boolean>
    )>,
}

interface ColumnsValues {
    column: string;
    value: string;
}

interface alterRequest {
    sheetIndex: number; 
    rowIndex: number;
    columnsValues: Array<ColumnsValues>;
}

interface authRequest {
    doc: GoogleSpreadsheet;

    auth: authData;
}

interface authData {
    client_email: string;
    
    private_key: string;
}

interface requestDTO {
    docId: string;
    
    auth: authData;
}

class SheetRepository {

    doc: GoogleSpreadsheet;

    constructor({ docId, auth }: requestDTO) {
        this.doc = new GoogleSpreadsheet(docId);
        this.authentication({ doc: this.doc, auth });
    }

    private async authentication({ doc, auth: { client_email, private_key } }: authRequest) {
        const authService = new AuthDocService({ doc });
        await authService.execute({ client_email, private_key });
    }

    public async all(): Promise<Sheet[]> {
        await this.doc.loadInfo();
        const sheetCount = this.doc.sheetCount;
        const sheets = [];

        for (let i=0; i<sheetCount; i++) {
            const sheet = await this.find(i);
            sheets.push(sheet);
        }

        return sheets;
    }

    public async find(sheetIndex: number): Promise<Sheet> {
        const reader = new ReadSheetService({ doc: this.doc });

        const data = await reader.execute({ sheetIndex });

        const sheet = new Sheet({ index: sheetIndex, data });

        return sheet;
    }

    public async add({ sheetIndex, rowValues }: addRequest): Promise<Object> {
        const adder = new AddRowsSheetService({ doc: this.doc });

        const rows = await adder.execute({
            sheetIndex, 
            rowValues,
        });

        return rows;
    }

    public async drop({ sheetIndex, rowIndex }: dropRequest): Promise<Object> {
        const deleter = new DeleteRowSheetService({ doc: this.doc });

        const row = await deleter.execute({ 
            sheetIndex, 
            rowIndex: indexConverter.execute(rowIndex), 
        });

        return row;
    }

    public async alter({ sheetIndex, rowIndex, columnsValues }: alterRequest): Promise<Object> {
        const alter = new AlterRowSheetService({ doc: this.doc });

        const row = await alter.execute({ 
            sheetIndex, 
            rowIndex: indexConverter.execute(rowIndex), 
            columnsValues 
        });

        return row;
    }
}

export default SheetRepository;