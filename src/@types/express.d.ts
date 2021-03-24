declare namespace Express {
    export interface Request {
        config: {
            client_email: string;
            private_key: string;
        }
    }
}