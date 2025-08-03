import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogTitle,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField, Typography
} from "@mui/material";
import {useIbanData} from "@/service/Iban";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckIcon from '@mui/icons-material/Check';
import {Iban} from "@/model/iban";

export default function IbanEdit({setIban, onError}: {
    setIban: (value: string) => void,
    onError: (error: boolean) => void
}) {
    const [ibanValue, setIbanValue] = useState<string | null>(null);
    const {ibanData, loading: ibanLoading} = useIbanData(ibanValue);
    const [ibanSelection, openIbanSelection] = useState(false);

    const helperText = Boolean(ibanData?.valid)
        ?  <IbanHelperText ibanData={ibanData!} />
        : ibanData?.messages[0] ?? "IBAN ist nicht valide";
    const error = !Boolean(ibanData?.valid);
    useEffect(() => {
        onError(error);
    }, [error]);

    useEffect(() => {
        if(ibanValue) {
            setIban(ibanValue.replaceAll(/\s/g, ""));
        }
    }, [ibanValue]);

    return (<>
        <Stack direction="row" spacing={1} >
            <TextField
                sx={{ flexGrow: 1 }}
                id="iban"
                label="IBAN"
                value={ibanValue ?? ""}
                error={error}
                onChange={(e) => setIbanValue(e.target.value)}
                helperText={helperText}
            />
            <IconButton onClick={() => openIbanSelection(true)}>
                <ReceiptLongIcon/>
            </IconButton>
        </Stack>
        <IbanSelection openIbanSelection={ibanSelection} onIbanSelected={(iban) => {setIbanValue(iban); openIbanSelection(false)}}
                       onClose={() => openIbanSelection(false)}/>
    </>)
}


function IbanHelperText({ibanData}: {ibanData:Iban}) {

    return <Stack direction={"row"} spacing={1}>
        <Typography variant={"body2"} sx={{fontWeight:700}}>BIC</Typography>
        <Typography variant={"body2"}>{ibanData.bankData.bic}</Typography>
        <Typography variant={"body2"} sx={{fontWeight:700}}>Bank</Typography>
        <Typography variant={"body2"}>{ibanData.bankData.name}</Typography>
    </Stack>
}

function IbanSelection({openIbanSelection, onClose, onIbanSelected}: {
    openIbanSelection: boolean,
    onClose: () => void,
    onIbanSelected: (value: string) => void
}) {
    const usualIbans = [
        "DE8937040044 1234567890",
        "DE9468050101 1234567890",
        "DE89 6035 0130 1234 5678 90",
        "DE47660501011234567890"
    ]
    return <Dialog open={openIbanSelection}>
        <DialogTitle>IBAN Liste</DialogTitle>
        <DialogContent>
            <Table>
                <TableHead>
                    <td>IBAN</td>
                </TableHead>
                <TableBody>
                    {usualIbans.map(iban => (
                        <TableRow key={iban}>
                            <TableCell sx={{cursor:"pointer"}} onClick={() => onIbanSelected(iban)}>{iban}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DialogContent>
        <DialogActions>
            <Button variant={"contained"} onClick={onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
}
