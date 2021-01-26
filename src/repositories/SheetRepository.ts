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
    sheetId: string;
    
    auth: authData;
}

class SheetRepository {

    doc: GoogleSpreadsheet;

    constructor({ sheetId, auth }: requestDTO) {
        this.doc = new GoogleSpreadsheet(sheetId);
        this.authentication({ doc: this.doc, auth });
    }

    private async authentication({ doc, auth }: authRequest) {
        const authService = new AuthDocService();
        await authService.execute({ doc, auth });
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
        const reader = new ReadSheetService();

        const data = await reader.execute({ doc: this.doc, sheetIndex });

        const sheet = new Sheet({ index: sheetIndex, data });

        return sheet;
    }

    public async add({ sheetIndex, rowValues }: addRequest): Promise<Object> {
        const adder = new AddRowsSheetService();

        const rows = await adder.execute({ doc: this.doc, 
            sheetIndex, 
            rowValues,
        });

        return rows;
    }

    public async drop({ sheetIndex, rowIndex }: dropRequest): Promise<Object> {
        const deleter = new DeleteRowSheetService();

        const row = await deleter.execute({ doc: this.doc, 
            sheetIndex, 
            rowIndex: indexConverter.execute(rowIndex), 
        });

        return row;
    }

    public async alter({ sheetIndex, rowIndex, columnsValues }: alterRequest): Promise<Object> {
        const alter = new AlterRowSheetService();

        const row = await alter.execute({ doc: this.doc, 
            sheetIndex, 
            rowIndex: indexConverter.execute(rowIndex), 
            columnsValues 
        });

        return row;
    }
}

export default SheetRepository;