
export type Transfer = {
    iban: string;
    amount: string;
    currency: string;
};

export type OutboundTransfer = {
    bic: string;
    id: string;
} & Transfer;