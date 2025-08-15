import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { X, AlertTriangle, Users, TrendingUp, MessageSquare } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCommunity } from "@/providers/CommunityProvider";

export default function DecisionDetailScreen() {
  const { id } = useLocalSearchParams();
  const { decisions } = useCommunity();
  
  const decision = decisions.find(d => d.id === id);

  if (!decision) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Decision not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X color="#64748B" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Decision Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          style={styles.decisionHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.decisionTitle}>{decision.title}</Text>
          <Text style={styles.decisionDescription}>{decision.description}</Text>
        </LinearGradient>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Users color="#6366F1" size={20} />
            <Text style={styles.statValue}>{decision.participantCount}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp color="#10B981" size={20} />
            <Text style={styles.statValue}>{decision.consensusLevel}%</Text>
            <Text style={styles.statLabel}>Consensus</Text>
          </View>
          <View style={styles.statCard}>
            <MessageSquare color="#F59E0B" size={20} />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Comments</Text>
          </View>
        </View>

        {decision.contradictions && decision.contradictions.length > 0 && (
          <View style={styles.contradictionSection}>
            <View style={styles.sectionHeader}>
              <AlertTriangle color="#F59E0B" size={20} />
              <Text style={styles.sectionTitle}>Detected Contradictions</Text>
            </View>
            {decision.contradictions.map((contradiction, index) => (
              <View key={index} style={styles.contradictionCard}>
                <Text style={styles.contradictionText}>{contradiction}</Text>
                <TouchableOpacity style={styles.synthesisButton}>
                  <Text style={styles.synthesisButtonText}>
                    Generate Synthesis
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Current Options</Text>
          {decision.options?.map((option, index) => (
            <View key={index} style={styles.optionCard}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
              <View style={styles.optionMeta}>
                <Text style={styles.optionSupport}>
                  {option.support}% support
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  content: {
    flex: 1,
  },
  decisionHeader: {
    padding: 24,
    marginBottom: 20,
  },
  decisionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  decisionDescription: {
    fontSize: 16,
    color: "#E0E7FF",
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  contradictionSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  contradictionCard: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  contradictionText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
    marginBottom: 12,
  },
  synthesisButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  synthesisButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  optionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 8,
  },
  optionMeta: {
    flexDirection: "row",
  },
  optionSupport: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "600",
  },
});