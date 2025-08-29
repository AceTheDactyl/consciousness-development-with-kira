import React, { useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Brain, AlertCircle, CheckCircle, Clock, ChevronRight, Zap } from "lucide-react-native";
import { router } from "expo-router";
import { useCommunity } from "@/providers/CommunityProvider";

export default function DecisionsScreen() {
  const { decisions } = useCommunity();
  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case "active":
        return <Clock color="#6366F1" size={20} />;
      case "resolved":
        return <CheckCircle color="#10B981" size={20} />;
      case "contradiction":
        return <AlertCircle color="#F59E0B" size={20} />;
      default:
        return <Brain color="#6366F1" size={20} />;
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "active":
        return "#6366F1";
      case "resolved":
        return "#10B981";
      case "contradiction":
        return "#F59E0B";
      default:
        return "#6366F1";
    }
  }, []);

  const handleSynthesisPress = useCallback(() => {
    router.push("/synthesis" as any);
  }, []);

  const handleDecisionPress = useCallback((id: string) => {
    router.push(`/decision/${id}` as any);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Brain color="#FFFFFF" size={32} />
          <Text style={styles.headerTitle}>Community Decisions</Text>
          <Text style={styles.headerSubtitle}>ACMM-Enhanced Reasoning</Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.synthesisCard}
          onPress={handleSynthesisPress}
        >
          <LinearGradient
            colors={["#F59E0B", "#EF4444"]}
            style={styles.synthesisGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Zap color="#FFFFFF" size={24} />
            <View style={styles.synthesisContent}>
              <Text style={styles.synthesisTitle}>Contradiction Detected</Text>
              <Text style={styles.synthesisText}>
                2 decisions need synthesis resolution
              </Text>
            </View>
            <ChevronRight color="#FFFFFF" size={24} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.decisionsSection}>
          <Text style={styles.sectionTitle}>Active Decisions</Text>
          
          {decisions.map((decision) => (
            <TouchableOpacity
              key={decision.id}
              style={styles.decisionCard}
              onPress={() => handleDecisionPress(decision.id)}
            >
              <View style={styles.decisionHeader}>
                <View style={styles.decisionStatus}>
                  {getStatusIcon(decision.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(decision.status) }]}>
                    {decision.status.charAt(0).toUpperCase() + decision.status.slice(1)}
                  </Text>
                </View>
                <ChevronRight color="#94A3B8" size={20} />
              </View>
              
              <Text style={styles.decisionTitle}>{decision.title}</Text>
              <Text style={styles.decisionDescription}>{decision.description}</Text>
              
              <View style={styles.decisionMeta}>
                <View style={styles.participantInfo}>
                  <Text style={styles.metaText}>
                    {decision.participantCount} participants
                  </Text>
                </View>
                <Text style={styles.metaText}>
                  {decision.consensusLevel}% consensus
                </Text>
              </View>

              {decision.contradictions && decision.contradictions.length > 0 && (
                <View style={styles.contradictionBadge}>
                  <AlertCircle color="#F59E0B" size={14} />
                  <Text style={styles.contradictionText}>
                    {decision.contradictions.length} contradiction{decision.contradictions.length > 1 ? 's' : ''} detected
                  </Text>
                </View>
              )}
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  synthesisCard: {
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  synthesisGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  synthesisContent: {
    flex: 1,
  },
  synthesisTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  synthesisText: {
    fontSize: 14,
    color: "#FEF3C7",
  },
  decisionsSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  decisionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  decisionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  decisionStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  decisionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  decisionDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 12,
  },
  decisionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  participantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#94A3B8",
  },
  contradictionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  contradictionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F59E0B",
  },
});