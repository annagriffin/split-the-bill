import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useReceipt } from "@/context/ReceiptContext";
import { Edit } from "react-native-feather";
import { usePeople } from "@/context/PeopleContext";
import { useRouter } from "expo-router";


const TaxSummaryScreen = () => {
    const { receiptData } = useReceipt();
    const [editMode, setEditMode] = useState(false);
    const router = useRouter();

    const { peopleWithItems } = usePeople(); // Retrieve from context

    const totalTax = receiptData.taxAmount;

    const handleConfirm = () => {
        router.push("/main/TipSummaryScreen");
    };

    // Calculate each person's share of the tax
    const overallItemsTotal = peopleWithItems.reduce(
        (sum, person) => sum + person.items.reduce((itemSum, item) => itemSum + parseFloat(item.sharePrice), 0),
        0
    );

    const peopleWithTaxShare = peopleWithItems.map((person) => {
        const personTotal = person.items.reduce((sum, item) => sum + parseFloat(item.sharePrice), 0);
        const taxShare = overallItemsTotal > 0 ? (personTotal / overallItemsTotal) * totalTax : 0;
        const percentage = overallItemsTotal > 0 ? (personTotal / overallItemsTotal) * 100 : 0;
        return { ...person, taxShare: taxShare.toFixed(2), percentage: percentage.toFixed(2) };
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Tax Breakdown</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Total Tax Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Total Tax</Text>
                        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                            <Edit width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.totalTax}>${totalTax.toFixed(2)}</Text>
                </View>

                {/* Tax Distribution Table */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Tax Distribution</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHead}>Person</Text>
                            <Text style={[styles.tableHead, styles.tableRight]}>Tax Share</Text>
                        </View>
                        {peopleWithTaxShare.map((person) => (
                            <View key={person.name} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{person.name}</Text>
                                <Text style={[styles.tableCell, styles.tableRight]}>${person.taxShare}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleConfirm} style={styles.primaryButton}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
        elevation: 2,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 8,
    },
    content: {
        padding: 16,
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    totalTax: {
        fontSize: 24,
        fontWeight: "bold",
    },
    table: {
        marginTop: 8,
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    tableHead: {
        fontWeight: "600",
    },
    tableCell: {
        fontSize: 16,
    },
    tableRight: {
        textAlign: "right",
    },
    footer: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    primaryButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#1e90ff",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default TaxSummaryScreen;
