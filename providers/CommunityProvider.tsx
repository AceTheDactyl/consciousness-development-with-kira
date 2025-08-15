import { useState, useEffect, useMemo, useCallback } from "react";
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Feedback {
  text: string;
  sentiment: "positive" | "neutral" | "concern";
  timestamp: Date;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  status: "active" | "resolved" | "contradiction";
  participantCount: number;
  consensusLevel: number;
  contradictions?: string[];
  options?: {
    title: string;
    description: string;
    support: number;
  }[];
}

interface Discussion {
  id: string;
  name: string;
  trending?: boolean;
  messages: {
    author: string;
    text: string;
    timestamp: Date;
    likes: number;
  }[];
}

interface CommunityData {
  memberCount: number;
  activeDecisions: number;
  consensusRate: number;
  recentFeedback: Feedback[];
}

export const [CommunityProvider, useCommunity] = createContextHook(() => {
  const [communityData, setCommunityData] = useState<CommunityData>({
    memberCount: 142,
    activeDecisions: 5,
    consensusRate: 87,
    recentFeedback: [
      {
        text: "The new sustainability initiative aligns perfectly with our values",
        sentiment: "positive",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        text: "We should consider the budget implications more carefully",
        sentiment: "concern",
        timestamp: new Date(Date.now() - 7200000),
      },
    ],
  });

  const [decisions] = useState<Decision[]>([
    {
      id: "1",
      title: "Community Garden Expansion",
      description: "Proposal to expand the community garden to include educational programs",
      status: "active",
      participantCount: 89,
      consensusLevel: 78,
      options: [
        {
          title: "Full Expansion",
          description: "Expand garden and add weekly educational workshops",
          support: 45,
        },
        {
          title: "Phased Approach",
          description: "Start with garden expansion, add programs later",
          support: 55,
        },
      ],
    },
    {
      id: "2",
      title: "Resource Allocation Strategy",
      description: "Determining how to balance immediate needs vs long-term sustainability",
      status: "contradiction",
      participantCount: 124,
      consensusLevel: 62,
      contradictions: [
        "Immediate community needs require 80% of resources, but sustainability requires 50% savings",
      ],
      options: [
        {
          title: "Immediate Focus",
          description: "Allocate 80% to current needs",
          support: 48,
        },
        {
          title: "Future Planning",
          description: "Save 50% for sustainability",
          support: 52,
        },
      ],
    },
    {
      id: "3",
      title: "Digital Infrastructure Upgrade",
      description: "Modernizing community communication platforms",
      status: "resolved",
      participantCount: 156,
      consensusLevel: 92,
    },
  ]);

  const [discussions] = useState<Discussion[]>([
    {
      id: "general",
      name: "general",
      messages: [
        {
          author: "Alex Chen",
          text: "Excited about the new community initiatives!",
          timestamp: new Date(Date.now() - 1800000),
          likes: 12,
        },
        {
          author: "Sarah Johnson",
          text: "The ACMM framework is really helping us find common ground",
          timestamp: new Date(Date.now() - 3600000),
          likes: 24,
        },
      ],
    },
    {
      id: "sustainability",
      name: "sustainability",
      trending: true,
      messages: [
        {
          author: "Maria Garcia",
          text: "Solar panel installation could reduce costs by 40%",
          timestamp: new Date(Date.now() - 900000),
          likes: 18,
        },
      ],
    },
    {
      id: "innovation",
      name: "innovation",
      messages: [],
    },
  ]);

  const addFeedback = useCallback((feedback: Feedback) => {
    setCommunityData(prev => ({
      ...prev,
      recentFeedback: [feedback, ...prev.recentFeedback].slice(0, 10),
    }));
  }, []);

  const addDiscussionMessage = useCallback((topicId: string, text: string) => {
    // In a real app, this would update the discussions state
    console.log(`Adding message to ${topicId}: ${text}`);
  }, []);

  useEffect(() => {
    // Load persisted data
    AsyncStorage.getItem("communityData").then(data => {
      if (data) {
        const parsed = JSON.parse(data);
        setCommunityData(prev => ({ ...prev, ...parsed }));
      }
    });
  }, []);

  useEffect(() => {
    // Persist data changes
    AsyncStorage.setItem("communityData", JSON.stringify(communityData));
  }, [communityData]);

  return useMemo(() => ({
    communityData,
    decisions,
    discussions,
    addFeedback,
    addDiscussionMessage,
  }), [communityData, decisions, discussions, addFeedback, addDiscussionMessage]);
});