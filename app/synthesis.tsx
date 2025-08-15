import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { X, Zap, ArrowRight, CheckCircle } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SynthesisScreen() {
  const [selectedSynthesis, setSelectedSynthesis] = useState<number | null>(null);
  const scaleAnim = new Animated.Value(1);

  const handleSelectSynthesis = (index: number) => {
    setSelectedSynthesis(index);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const contradictions = [
    {
      title: "Resource Allocation",
      sideA: "Invest in immediate community needs",
      sideB: "Save for long-term sustainability",
      synthesis: "Create a balanced allocation model: 60% for immediate high-impact needs with measurable outcomes, 40% for sustainability fund with quarterly review cycles",
    },
    {
      title: "Decision Making Speed",
      sideA: "Quick decisions for agility",
      sideB: "Thorough consultation for buy-in",
      synthesis: "Implement tiered decision framework: urgent matters use rapid 48-hour process, strategic decisions use 2-week consultation with clear deadlines",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X color="#64748B" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ACMM Synthesis</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#F59E0B", "#EF4444"]}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Zap color="#FFFFFF" size={32} />
          <Text style={styles.heroTitle}>Contradiction Resolution</Text>
          <Text style={styles.heroSubtitle}>
            Transform either/or tensions into both/and solutions
          </Text>
        </LinearGradient>

        {contradictions.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.contradictionContainer,
              selectedSynthesis === index && {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.contradictionTitle}>{item.title}</Text>
            
            <View style={styles.sidesContainer}>
              <View style={styles.sideCard}>
                <Text style={styles.sideLabel}>Position A</Text>
                <Text style={styles.sideText}>{item.sideA}</Text>
              </View>
              
              <View style={styles.vsContainer}>
                <Text style={styles.vsText}>VS</Text>
              </View>
              
              <View style={styles.sideCard}>
                <Text style={styles.sideLabel}>Position B</Text>
                <Text style={styles.sideText}>{item.sideB}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.synthesisCard}
              onPress={() => handleSelectSynthesis(index)}
            >
              <LinearGradient
                colors={["#6366F1", "#8B5CF6"]}
                style={styles.synthesisGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.synthesisHeader}>
                  <Zap color="#FFFFFF" size={20} />
                  <Text style={styles.synthesisLabel}>Synthesis Solution</Text>
                  {selectedSynthesis === index && (
                    <CheckCircle color="#10B981" size={20} />
                  )}
                </View>
                <Text style={styles.synthesisText}>{item.synthesis}</Text>
                <View style={styles.synthesisAction}>
                  <Text style={styles.actionText}>Apply this synthesis</Text>
                  <ArrowRight color="#E0E7FF" size={16} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How ACMM Works</Text>
          <Text style={styles.infoText}>
            The Advanced Contradiction Metabolization Module identifies apparent 
            either/or choices and generates synthesis solutions that serve all 
            underlying needs, enabling communities to transcend false limitations.
          </Text>
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
  heroSection: {
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 12,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#FEF3C7",
    textAlign: "center",
    lineHeight: 22,
  },
  contradictionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  contradictionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  sidesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sideCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  sideLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 4,
  },
  sideText: {
    fontSize: 14,
    color: "#1E293B",
    lineHeight: 18,
  },
  vsContainer: {
    paddingHorizontal: 12,
  },
  vsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#CBD5E1",
  },
  synthesisCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  synthesisGradient: {
    padding: 16,
  },
  synthesisHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  synthesisLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  synthesisText: {
    fontSize: 15,
    color: "#E0E7FF",
    lineHeight: 22,
    marginBottom: 12,
  },
  synthesisAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    color: "#E0E7FF",
    fontWeight: "500",
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    marginTop: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
});