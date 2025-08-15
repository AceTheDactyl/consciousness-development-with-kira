import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Hash, TrendingUp, Send, Heart, Reply } from "lucide-react-native";
import { useCommunity } from "@/providers/CommunityProvider";

export default function DiscussionsScreen() {
  const { discussions, addDiscussionMessage } = useCommunity();
  const [selectedTopic, setSelectedTopic] = useState(discussions[0]?.id || "general");
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = useCallback(() => {
    if (messageText.trim()) {
      addDiscussionMessage(selectedTopic, messageText);
      setMessageText("");
    }
  }, [messageText, selectedTopic, addDiscussionMessage]);

  const currentDiscussion = discussions.find(d => d.id === selectedTopic);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Discussions</Text>
        <Text style={styles.headerSubtitle}>Collaborative dialogue space</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.topicsScroll}
        contentContainerStyle={styles.topicsContent}
      >
        {discussions.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[
              styles.topicChip,
              selectedTopic === topic.id && styles.topicChipActive,
            ]}
            onPress={() => setSelectedTopic(topic.id)}
          >
            <Hash 
              color={selectedTopic === topic.id ? "#FFFFFF" : "#64748B"} 
              size={16} 
            />
            <Text
              style={[
                styles.topicChipText,
                selectedTopic === topic.id && styles.topicChipTextActive,
              ]}
            >
              {topic.name}
            </Text>
            {topic.trending && (
              <TrendingUp 
                color={selectedTopic === topic.id ? "#FFFFFF" : "#10B981"} 
                size={14} 
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.messagesContainer}
      >
        <ScrollView 
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
        >
          {currentDiscussion?.messages.map((message, index) => (
            <View key={index} style={styles.messageCard}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageAuthor}>{message.author}</Text>
                <Text style={styles.messageTime}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </View>
              <Text style={styles.messageText}>{message.text}</Text>
              <View style={styles.messageActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Heart color="#94A3B8" size={16} />
                  <Text style={styles.actionText}>{message.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Reply color="#94A3B8" size={16} />
                  <Text style={styles.actionText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Share your thoughts..."
            placeholderTextColor="#94A3B8"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !messageText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  topicsScroll: {
    maxHeight: 50,
    marginBottom: 8,
  },
  topicsContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  topicChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  topicChipActive: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  topicChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  topicChipTextActive: {
    color: "#FFFFFF",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  messageAuthor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  messageTime: {
    fontSize: 12,
    color: "#94A3B8",
  },
  messageText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 8,
  },
  messageActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#94A3B8",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1E293B",
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#CBD5E1",
  },
});