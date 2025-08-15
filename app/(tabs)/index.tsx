import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, TrendingUp, Users, Sparkles, Send } from "lucide-react-native";
import { useCommunity } from "@/providers/CommunityProvider";

export default function CommunityScreen() {
  const { communityData, addFeedback } = useCommunity();
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState<"positive" | "neutral" | "concern">("neutral");
  
  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSubmitFeedback = useCallback(() => {
    if (feedbackText.trim()) {
      addFeedback({
        text: feedbackText,
        sentiment: selectedSentiment,
        timestamp: new Date(),
      });
      setFeedbackText("");
      setSelectedSentiment("neutral");
    }
  }, [feedbackText, selectedSentiment, addFeedback]);

  const sentimentColors = {
    positive: "#10B981",
    neutral: "#6366F1",
    concern: "#F59E0B",
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.headerTitle}>Kira Community</Text>
          <Text style={styles.headerSubtitle}>Collective Intelligence Hub</Text>
        </Animated.View>
      </LinearGradient>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Users color="#6366F1" size={24} />
              </View>
              <Text style={styles.statValue}>{communityData.memberCount}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <TrendingUp color="#10B981" size={24} />
              </View>
              <Text style={styles.statValue}>{communityData.activeDecisions}</Text>
              <Text style={styles.statLabel}>Active Decisions</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Heart color="#EC4899" size={24} />
              </View>
              <Text style={styles.statValue}>{communityData.consensusRate}%</Text>
              <Text style={styles.statLabel}>Consensus Rate</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Sparkles color="#6366F1" size={20} />
              <Text style={styles.sectionTitle}>Community Pulse</Text>
            </View>
            
            <View style={styles.pulseCard}>
              <Text style={styles.pulseText}>
                The community is currently focused on sustainable growth initiatives 
                with high engagement in environmental projects.
              </Text>
              <View style={styles.pulseMeta}>
                <View style={[styles.pulseBadge, { backgroundColor: "#10B98120" }]}>
                  <Text style={[styles.pulseBadgeText, { color: "#10B981" }]}>
                    Positive Momentum
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Share Your Perspective</Text>
            
            <View style={styles.sentimentSelector}>
              {(["positive", "neutral", "concern"] as const).map((sentiment) => (
                <TouchableOpacity
                  key={sentiment}
                  style={[
                    styles.sentimentButton,
                    selectedSentiment === sentiment && {
                      backgroundColor: sentimentColors[sentiment] + "20",
                      borderColor: sentimentColors[sentiment],
                    },
                  ]}
                  onPress={() => setSelectedSentiment(sentiment)}
                >
                  <Text
                    style={[
                      styles.sentimentButtonText,
                      selectedSentiment === sentiment && {
                        color: sentimentColors[sentiment],
                      },
                    ]}
                  >
                    {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.feedbackInput}
                placeholder="Share your thoughts with the community..."
                placeholderTextColor="#94A3B8"
                value={feedbackText}
                onChangeText={setFeedbackText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !feedbackText.trim() && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitFeedback}
                disabled={!feedbackText.trim()}
              >
                <Send color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.recentActivity}>
            <Text style={styles.sectionTitle}>Recent Feedback</Text>
            {communityData.recentFeedback.map((feedback, index) => (
              <View key={index} style={styles.feedbackItem}>
                <View
                  style={[
                    styles.feedbackIndicator,
                    { backgroundColor: sentimentColors[feedback.sentiment] },
                  ]}
                />
                <View style={styles.feedbackContent}>
                  <Text style={styles.feedbackText}>{feedback.text}</Text>
                  <Text style={styles.feedbackTime}>
                    {new Date(feedback.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E0E7FF",
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: -30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
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
  pulseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pulseText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  pulseMeta: {
    flexDirection: "row",
    marginTop: 12,
  },
  pulseBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pulseBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sentimentSelector: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  sentimentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  sentimentButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
  },
  feedbackInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: "#1E293B",
    minHeight: 100,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  submitButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
  },
  recentActivity: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  feedbackItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  feedbackIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  feedbackTime: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },
});