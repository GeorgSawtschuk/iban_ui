import {Button, Dialog, DialogActions, DialogContent, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Transfer} from "@/model/transfer";
import {useContext, useEffect, useState} from "react";
import IbanEdit from "@/components/IbanEdit";
import {useTransfer} from "@/service/Transfers";
import {IbanContext} from "@/app/Context";


export default function TransferForm() {

    const [transfer, setTransfer] = useState<Transfer>({
        iban: "", amount: "", currency: "EUR"
    } as Transfer);
    const [ibanError, setIbanError] = useState(false);
    const {transfer : transferResult, doTransfer, processing, status} = useTransfer();

    const {onSubmitted} = useContext(IbanContext)

    const updateTransfer = (attr: keyof Transfer, val: string) => {
        setTransfer(prev => ({ ...prev, [attr]: val }));
    }

    useEffect(() => {
        if(!processing && Boolean(transferResult) && status === 200) {
            onSubmitted();
        }
    }, [processing, transferResult]);

    const isTransferValid = !ibanError && /^-?\d+(\.\d+)?$/.test(transfer.amount) && Boolean(transfer.currency);

    return(<>
        <Stack spacing={2}>
            <Stack spacing={2}>
                <IbanEdit
                    setIban={(iban) => updateTransfer("iban", iban)}
                    onError={(error: boolean) => setIbanError(error)}/>

                <Amount transfer={transfer} updateTransfer={updateTransfer}/>

                <CurrencySelect transfer={transfer} updateTransfer={updateTransfer}/>

            </Stack>
            <Stack spacing={2} direction="row-reverse">
                <Button variant={"contained"} disabled={!isTransferValid} onClick={() => {
                    doTransfer(transfer)
                }}>Create transaction</Button>
            </Stack>
        </Stack>
    </>);
}

function CurrencySelect({transfer, updateTransfer}:
                        {transfer: Transfer, updateTransfer: (attr: keyof Transfer, val: string) => void}) {
    return <Select id="currency" label="Currency" value={transfer.currency}
                   onChange={event => updateTransfer("currency", event.target.value)}>
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
    </Select>;
}

function Amount({transfer, updateTransfer}:
                { transfer: Transfer, updateTransfer: (attr: keyof Transfer, val: string) => void}) {
    return <TextField id="amount" label="Amount" value={transfer.amount}
                      onChange={event => updateTransfer("amount", event.target.value)}/>;
}
