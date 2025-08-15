import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart3, TrendingUp, Users, Brain, Sparkles } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function InsightsScreen() {
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(50), []);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const insights = [
    {
      icon: TrendingUp,
      title: "Engagement Rising",
      value: "+23%",
      description: "Community participation increased this week",
      color: "#10B981",
      gradient: ["#10B981", "#059669"],
    },
    {
      icon: Brain,
      title: "Synthesis Success",
      value: "87%",
      description: "Contradictions resolved through ACMM",
      color: "#6366F1",
      gradient: ["#6366F1", "#4F46E5"],
    },
    {
      icon: Users,
      title: "Collective IQ",
      value: "142",
      description: "Community intelligence index",
      color: "#8B5CF6",
      gradient: ["#8B5CF6", "#7C3AED"],
    },
    {
      icon: Sparkles,
      title: "Innovation Rate",
      value: "4.2x",
      description: "Ideas generated vs baseline",
      color: "#F59E0B",
      gradient: ["#F59E0B", "#D97706"],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BarChart3 color="#6366F1" size={28} />
        <Text style={styles.headerTitle}>Community Insights</Text>
        <Text style={styles.headerSubtitle}>
          Collective intelligence metrics
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.insightsGrid,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <View key={index} style={styles.insightCard}>
                <LinearGradient
                  colors={insight.gradient as [string, string]}
                  style={styles.insightGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon color="#FFFFFF" size={24} />
                </LinearGradient>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={[styles.insightValue, { color: insight.color }]}>
                  {insight.value}
                </Text>
                <Text style={styles.insightDescription}>
                  {insight.description}
                </Text>
              </View>
            );
          })}
        </Animated.View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Consensus Evolution</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartBars}>
              {[65, 72, 68, 85, 92, 87, 95].map((height, index) => (
                <View key={index} style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar,
                      { height: `${height}%` }
                    ]}
                  />
                  <Text style={styles.barLabel}>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.patternSection}>
          <Text style={styles.sectionTitle}>Emerging Patterns</Text>
          <View style={styles.patternCard}>
            <View style={styles.patternHeader}>
              <Sparkles color="#6366F1" size={20} />
              <Text style={styles.patternTitle}>
                Environmental Initiatives Gaining Momentum
              </Text>
            </View>
            <Text style={styles.patternText}>
              Analysis shows 78% of recent proposals relate to sustainability.
              Community consensus on green initiatives has increased by 34%.
            </Text>
          </View>
          <View style={styles.patternCard}>
            <View style={styles.patternHeader}>
              <Brain color="#8B5CF6" size={20} />
              <Text style={styles.patternTitle}>
                Synthesis Opportunities Detected
              </Text>
            </View>
            <Text style={styles.patternText}>
              3 decision clusters show potential for ACMM synthesis.
              Resolving these could increase overall consensus by 15%.
            </Text>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  content: {
    flex: 1,
  },
  insightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
  insightCard: {
    width: (width - 44) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  insightGradient: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    color: "#94A3B8",
    lineHeight: 16,
  },
  chartSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
  },
  bar: {
    width: "60%",
    backgroundColor: "#6366F1",
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: "#94A3B8",
  },
  patternSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  patternCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  patternHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  patternTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
  patternText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
});