import { GoogleSpreadsheet } from 'google-spreadsheet';

interface authData {
    client_email: string;
    
    private_key: string;
}

interface requestDTO {
    doc: GoogleSpreadsheet;

    auth: authData;
}

class AuthDocService {
    
    public async execute ({ doc, auth: { client_email, private_key } }: requestDTO): Promise<GoogleSpreadsheet> {

        await doc.useServiceAccountAuth({
            client_email: client_email,
            private_key: private_key,
        });

        return doc;
    }
}

export default AuthDocService;