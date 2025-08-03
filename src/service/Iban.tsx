'use client'
import {Iban} from "@/model/iban";
import {useCallback, useEffect, useState} from "react";
import {APIURL} from "../../config";

export function useIbanData(iban: string | null) :
    {
        ibanData: Iban | null,
        loading: boolean
    } {

    const [ibanData, setIbanData] = useState<Iban | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const getIbanData = useCallback((iban: string) => {

        const url = `${APIURL}/iban/${iban}`;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(json => setIbanData(json))
            .finally(() => setLoading(false));

    }, []);

    useEffect(() => {
        if(iban) {
            getIbanData(iban.replaceAll(/\s+/g, ''));
        }
    }, [iban])

    return {ibanData, loading};
}