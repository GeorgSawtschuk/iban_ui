import {createContext, ReactNode, useCallback} from "react";
import {OutboundTransfer} from "@/model/transfer";
import {useTransferList} from "@/service/Transfers";


type IbanContextType = {
    transferList: OutboundTransfer[];
    loadingList: boolean;
    onSubmitted: () => void;
}

export const IbanContext = createContext({} as IbanContextType);

export function IbanContextProvider({ children }: { children: ReactNode } ) {

    const {transferList, loading : loadingList, doLoad} = useTransferList();

    const onSubmitted = useCallback(() => {
        doLoad();
    }, []);

    return (
        <IbanContext.Provider value={{
            transferList,
            loadingList,
            onSubmitted,
        }}>
            {children}
        </IbanContext.Provider>

    )

}