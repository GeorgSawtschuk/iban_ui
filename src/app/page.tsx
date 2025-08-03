"use client"
import TransferForm from "@/components/TransferForm";
import {Container, Stack} from "@mui/material";
import TransferList from "@/components/TransferList";
import {IbanContextProvider} from "@/app/Context";

export default function Home() {
  return (
      <Container maxWidth="md" sx={{mt: 3}}>
        <Stack spacing={2}>
            <IbanContextProvider>
                <TransferForm />
                <TransferList />
            </IbanContextProvider>
        </Stack>
      </Container>
  );
}
