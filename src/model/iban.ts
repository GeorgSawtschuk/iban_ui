

export type BankData = {
    bankCode: string;
    name: string;
    zip: string;
    city: string;
    bic: string;
};

export type CheckResults = {
    bankCode: boolean;
};

export type Iban = {
    valid: boolean;
    messages: string[];
    iban: string;
    bankData: BankData;
    checkResults: CheckResults;
};