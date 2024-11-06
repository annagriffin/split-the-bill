import { Stack } from 'expo-router';
import { ReceiptProvider } from '../../context/ReceiptContext'; 


export default function HomeLayout() {
  return (
    <ReceiptProvider>
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Index', headerShown: false }} />
            <Stack.Screen name="summary" options={{ title: 'Summary', headerShown: false }} />
             <Stack.Screen name="edit" options={{ title: 'Edit', headerShown: false, animation: 'none' }} />
        </Stack>
    </ReceiptProvider>
  );
}