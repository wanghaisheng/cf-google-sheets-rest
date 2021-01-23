import { GoogleSpreadsheet } from 'google-spreadsheet';
import Sheet from '../models/Sheet';
import AuthDocService from '../services/AuthDocService';
import ReadSheetService from '../services/ReadSheetService';

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

    public add() {

    }

    public drop() {

    }

    public alter() {
        
    }
}

export default SheetRepository;