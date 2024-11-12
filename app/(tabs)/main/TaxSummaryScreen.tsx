import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useReceipt } from "@/context/ReceiptContext";
import { ChevronLeft, Edit } from "react-native-feather";
import { PieChart } from "react-native-chart-kit";
import { usePeople } from "@/context/PeopleContext";

const TaxSummaryScreen = () => {
    const { receiptData } = useReceipt();
    const [editMode, setEditMode] = useState(false);

    const { peopleWithItems } = usePeople(); // Retrieve from context

    const totalTax = receiptData.taxAmount;
    const chartColors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0'];

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

    const chartData = peopleWithTaxShare.map((person, index) => ({
        name: person.name,
        value: parseFloat(person.percentage),
        color: chartColors[index % chartColors.length],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));

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

                {/* Percentage Split Chart */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Percentage Split</Text>
                    <PieChart
                        data={chartData}
                        width={300}
                        height={200}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2,
                        }}
                        accessor={"value"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        hasLegend={false}
                    />
                    <View style={styles.legendContainer}>
                        {chartData.map((entry) => (
                            <View key={entry.name} style={styles.legendItem}>
                                <View style={[styles.legendColor, { backgroundColor: entry.color }]} />
                                <Text style={styles.legendText}>{entry.name} ({entry.value}%)</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.buttonText}>Looks good!</Text>
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
    legendContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 16,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
        marginBottom: 8,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 4,
    },
    legendText: {
        fontSize: 14,
    },
    footer: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    outlineButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#1e90ff",
        alignItems: "center",
    },
    primaryButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#1e90ff",
        alignItems: "center",
        marginLeft: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default TaxSummaryScreen;
