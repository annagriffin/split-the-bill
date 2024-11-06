import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Item, ReceiptData } from '@/types/receiptTypes';
import { useReceipt } from '../../context/ReceiptContext';




const EditScreen = ({ route }) => {
    const { receiptData } = useReceipt();

    if (!receiptData) {
        // Show loading placeholder if receiptData is null
        return <ThemedView style={styles.container}><ThemedText>Loading...</ThemedText></ThemedView>;
      }


    const [items, setItems] = useState(receiptData.items);


    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    const handleConfirm = (item, price) => {
        // logic to handle the save
        router.back();
    }

    const subtotal = receiptData.items.reduce((accumulator, item) => {
        return accumulator + item.price;
      }, 0);

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title} type="title">Order Summary</ThemedText>
            </ThemedView>
            {receiptData.items.map((item: Item, index: number) => {
                const isLastItem = index === receiptData.items.length - 1;
                return (
                    <ThemedView style={[styles.itemContainer, !isLastItem && styles.itemWithBorder]} key={item.id}>
                        <ThemedText style={styles.item}>{String(item.name)}</ThemedText>
                        <ThemedText style={styles.item}>${String(item.price)}</ThemedText>
                    </ThemedView>
                );
            })}

            <ThemedView style={styles.divider} />


            <ThemedView style={styles.summary}>
                <ThemedView style={styles.itemContainer}>
                    <ThemedText style={styles.summaryText}>Subtotal</ThemedText>
                    <ThemedText style={[styles.summaryText, styles.boldText]}>${subtotal.toFixed(2)}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <ThemedText style={styles.summaryText}>Tax</ThemedText>
                    <ThemedText style={[styles.summaryText, styles.boldText]}>${receiptData.taxAmount.toFixed(2)}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <ThemedText style={styles.summaryText}>Tip</ThemedText>
                    <ThemedText style={[styles.summaryText, styles.boldText]}>${receiptData.tipAmount.toFixed(2)}</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.itemContainer}>

            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={handleCancel}>
                    <ThemedText style={[styles.buttonText, styles.outlineButtonText]}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={() => handleConfirm}>
                    <ThemedText style={styles.buttonText}>Save</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40,
        paddingHorizontal: 16,

    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 40,
        backgroundColor: 'transparent',
    },
    title: {
        color: 'black',
    },
    item: {
        fontSize: 16,
        color: 'black',
        padding: 16,
    },
    itemContainer: {
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 16,
        backgroundColor: 'transparent',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        width: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 700,
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: 'darkgrey',
    },
    outlineButtonText: {
        color: 'black',
    },
    confirmButton: {
        color: 'white',
        backgroundColor: '#04AA6D',
    },
    summary: {
        backgroundColor: 'transparent',
    },
    summaryText: {
        color: 'black',
    },
    boldText: {
        fontWeight: 700,
    },
    divider: {
        height: 2, // Height of the divider
        backgroundColor: 'lightgray', // Color of the divider
        marginTop: 40,
        marginBottom: 20,
    },
});

export default EditScreen; 