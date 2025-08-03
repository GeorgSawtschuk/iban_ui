import {OutboundTransfer, Transfer} from "@/model/transfer";
import {useCallback, useState} from "react";
import {APIURL} from "../../config";

export function useTransfer(): {
    processing: boolean;
    status: number | null;
    transfer: OutboundTransfer | null;
    doTransfer: (transfer: Transfer) => void;
} {
    const [transfer, setTransfer] = useState<OutboundTransfer | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [status, setStatus] = useState<number | null>(null);

    const doTransfer = useCallback((transfer: Transfer) => {
        setProcessing(true);
        fetch(`${APIURL}/transfer`, {
            method: "POST",
            body: JSON.stringify(transfer),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(
            res => {
                setStatus(res.status);
                return res.json()
            }
        )
        .then(res => setTransfer(res))
        .finally(() => setProcessing(false));

    }, []);


    return {transfer, doTransfer, processing, status};
}

export function useTransferList() : {transferList: OutboundTransfer[], loading: boolean, doLoad: () => void} {
    const [transferList, setTransferList] = useState<OutboundTransfer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const doLoad = useCallback(() => {
        setLoading(true);
        fetch(`${APIURL}/transfer`, {

        })
            .then(res => res.json())
            .then(res => setTransferList(res.content))
            .finally(() => setLoading(false));
    }, []);

    return {transferList, loading, doLoad};
}