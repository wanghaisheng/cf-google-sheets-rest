import { GoogleSpreadsheet } from 'google-spreadsheet';

interface constructorDTO {
    doc: GoogleSpreadsheet;
}

interface requestDTO {
    client_email: string;
    
    private_key: string;
}

class AuthDocService {

    private doc: GoogleSpreadsheet;

    constructor({ doc }: constructorDTO) {
        this.doc = doc;
    }
    
    public async execute ({ client_email, private_key }: requestDTO): Promise<GoogleSpreadsheet> {

        await this.doc.useServiceAccountAuth({
            client_email: client_email,
            private_key: private_key,
        });

        return this.doc;
    }
}

export default AuthDocService;