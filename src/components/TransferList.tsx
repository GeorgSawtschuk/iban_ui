import {Box, IconButton} from "@mui/material";
import {useContext, useMemo} from "react";
import {IbanContext} from "@/app/Context";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function TransferList() {

    const {transferList, loadingList, onSubmitted} = useContext(IbanContext);

    const columns = useMemo(() => [
        { field: 'iban', headerName: 'IBAN', width: 300 },
        { field: 'bic', headerName: 'BIC', width: 100 },
        { field: 'amount', headerName: 'Amount', width: 200 },
        { field: 'currency', headerName: 'Currency', width: 100 },
    ] as GridColDef[], []);
    return (
        <Box>
            <IconButton onClick={() => onSubmitted()}><RefreshIcon/></IconButton>
            <DataGrid columns={columns} loading={loadingList} rows={transferList} />
        </Box>
    );
}