"use client"
import { useState, useEffect } from 'react';
import { MessageSquare, Send, Clock, CheckCircle, AlertTriangle, ChevronDown, Search, PlusCircle, User, Copy, ThumbsUp, CheckSquare, Info, Menu } from 'lucide-react';
import { initialConversations } from './constants/initialConversations';
import { knowledgeBase } from './constants/knowledgeBase';
import ConversationList from './components/ConversationList';
import ConversationHeader from './components/ConversationHeader';
import MessageList from './components/MessageList';
import ReplyComposer from './components/ReplyComposer';
import AiCopilotPanel from './components/AiCopilotPanel';
import { getAIResponse, generateResponse } from './utils/ai';
import Button from './components/ui/Button';

export default function SmartInbox() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [copilotThinking, setCopilotThinking] = useState(false);
  const [hasInternalContent, setHasInternalContent] = useState(false);
  const [conversationSummary, setConversationSummary] = useState("");
  const [timeSaved, setTimeSaved] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showConversationList, setShowConversationList] = useState(false);
  
  useEffect(() => {
    if (selectedConversation) {
      generateConversationSummary(selectedConversation);
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation.id ? {...conv, unread: false} : conv
      ));
    }
  }, [selectedConversation]);

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setReplyText("");
    setAiSuggestion("");
    setShowAiPanel(false);
    setShowConversationList(false);
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastActivity: "Just now",
          messages: [
            ...conv.messages,
            {
              id: conv.messages.length + 1,
              sender: "agent",
              content: replyText,
              timestamp: new Date().toLocaleString()
            }
          ]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(c => c.id === selectedConversation.id));
    setReplyText("");
    setTimeSaved(prev => prev + Math.round(replyText.length / 10));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const askAiCopilot = async () => {
    if (!aiQuery.trim()) return;
    
    setCopilotThinking(true);
    
    try {
      const suggestion = await generateResponse(selectedConversation, aiQuery);
      setAiSuggestion(suggestion);
      
      // Check if the response might contain internal information
      const hasInternalInfo = suggestion.toLowerCase().includes('internal') || 
                             suggestion.toLowerCase().includes('confidential') ||
                             suggestion.toLowerCase().includes('private');
      setHasInternalContent(hasInternalInfo);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setAiSuggestion('Sorry, there was an error generating a response. Please try again.');
    } finally {
      setCopilotThinking(false);
    }
  };

  const insertAiSuggestion = () => {
    setReplyText(aiSuggestion);
    setShowAiPanel(false);
    setShowSuggestions(true);
  };

  const generateAIResponse = (query, conversation) => {
    let hasInternalContent = false;
    let suggestion = "";
    
    if (query.toLowerCase().includes("refund") || 
        (conversation && conversation.subject.toLowerCase().includes("refund"))) {
      suggestion = `Hello ${conversation?.customer.name},\n\nThank you for reaching out about your refund request for order #34521. I understand your concerns.\n\nAccording to our policy, we offer refunds within 30 days of purchase if you're not satisfied with the product. I've initiated the refund process for you, and you should see the amount credited back to your original payment method within 3-5 business days.\n\nPlease let me know if you have any other questions.\n\nRegards,\n[Your Name]`;
    } 
    else if (query.toLowerCase().includes("security") || 
             (conversation && conversation.subject.toLowerCase().includes("security"))) {
      suggestion = `Hello ${conversation?.customer.name},\n\nI'm sorry to hear about your account security concerns. Your security is our top priority.\n\nI've placed a temporary lock on your account to prevent any unauthorized access. To secure your account, please:\n\n1. Reset your password immediately\n2. Enable two-factor authentication\n3. Review your recent account activity\n\nWould you like me to guide you through these steps?\n\nRegards,\n[Your Name]`;
      hasInternalContent = true;
    } 
    else {
      suggestion = `Hello ${conversation?.customer.name},\n\nThank you for your inquiry about order #45678. I've checked your order status, and I see that your Premium Package has been processed but the shipping confirmation email wasn't sent due to a system delay.\n\nGood news - your package was shipped yesterday and is currently in transit. You should receive it within the next 1-2 business days. I've also requested our system to send you the tracking information via email shortly.\n\nPlease let me know if you need anything else!\n\nBest regards,\n[Your Name]`;
    }
    
    return { suggestion, hasInternalContent };
  };

  const generateConversationSummary = (conversation) => {
    let summary = "";
    if (conversation.subject.includes("Refund")) {
      summary = "Customer is requesting a refund for order #34521 because the product didn't meet expectations. High priority issue requiring prompt resolution.";
    } else if (conversation.subject.includes("recent order")) {
      summary = "Customer ordered Premium Package three days ago (order #45678) and is inquiring about missing shipping confirmation. Needs status update.";
    } else if (conversation.subject.includes("security")) {
      summary = "Customer reports suspicious activity on their account. Security concern that requires immediate action to secure the account and investigate.";
    }
    
    setConversationSummary(summary);
  };

  const smartSuggestions = [
    "I've also applied a 10% courtesy discount to your next order.",
    "Would you like me to expedite your shipping to overnight delivery at no extra cost?",
    "For additional security, I recommend changing your password on any other sites where you've used the same credentials."
  ];

  const getSmartSuggestions = (conversation, hasMessage) => {
    if (hasMessage) {
      return smartSuggestions;
    } else if (conversation && conversation.subject.toLowerCase().includes("refund")) {
      return ["Would you like to know more about the refund process?"];
    } else if (conversation && conversation.subject.toLowerCase().includes("security")) {
      return ["Would you like to know more about account security?"];
    } else {
      return ["Would you like to know more about your order?"];
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <ConversationList 
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={selectConversation}
        showConversationList={showConversationList}
        onCloseConversationList={() => setShowConversationList(false)}
      />
      
      <div className="flex-1 flex flex-col relative w-full">
        {/* Mobile Header - Always visible */}
        <div className="flex items-center px-4 py-2 border-b border-gray-200 bg-white lg:hidden">
          <Button
            onClick={() => setShowConversationList(true)}
            variant="ghost"
            size="icon"
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">Smart Inbox</h1>
      </div>
      
        {selectedConversation ? (
          <>
            <ConversationHeader conversation={selectedConversation} />
            
            {conversationSummary && (
              <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-700">AI Summary</h4>
                  <p className="text-sm text-blue-600">{conversationSummary}</p>
                </div>
              </div>
            )}
            
            <MessageList conversation={selectedConversation} />
            
            <ReplyComposer 
              replyText={replyText}
              setReplyText={setReplyText}
              onSendReply={sendReply}
              onShowAiPanel={() => setShowAiPanel(true)}
              showSuggestions={showSuggestions}
              smartSuggestions={getSmartSuggestions(selectedConversation, replyText.length > 0)}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No conversation selected</h3>
              <p className="text-gray-500 mt-2">Select a conversation from the list to view it</p>
            </div>
          </div>
        )}
      </div>
      
      <AiCopilotPanel
        onClose={() => setShowAiPanel(false)}
        aiQuery={aiQuery}
        setAiQuery={setAiQuery}
        onAskAiCopilot={askAiCopilot}
        copilotThinking={copilotThinking}
        aiSuggestion={aiSuggestion}
        hasInternalContent={hasInternalContent}
        onInsertAiSuggestion={insertAiSuggestion}
        timeSaved={timeSaved}
        showAiPanel={showAiPanel}
      />
      
      {/* Overlay for mobile */}
      {(showAiPanel || showConversationList) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => {
            setShowAiPanel(false);
            setShowConversationList(false);
          }}
        />
      )}
      
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
          <CheckSquare className="h-5 w-5 mr-2" />
          <p>Reply sent successfully!</p>
        </div>
      )}
    </div>
  );
}