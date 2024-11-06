// app/(tabs)/index.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Item, ReceiptData } from '@/types/receiptTypes';
import { useReceipt } from '../../context/ReceiptContext';



export default function Next() {
  const router = useRouter();
  const { setReceiptData } = useReceipt();



  const dummyReceiptData: ReceiptData = {
    items: [
      { id: '1', name: 'French Fries', price: 3.87 },
      { id: '2', name: 'Hot Dog', price: 3.59 },
      { id: '3', name: 'Soda', price: 1.56 },
      { id: '4', name: 'Soda', price: 1.56 },
    ],
    taxAmount: 0.07,
    tipAmount: 1.00,
  };

  const handleNext = () => {
    setReceiptData(dummyReceiptData); // Set data in context
    router.push('/home/summary'); // Navigate to Edit screen
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
      <Button
        title="Go to Summary"
        onPress={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
