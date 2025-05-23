// AI utility functions for Smart Inbox

// Function to generate AI response based on conversation context and query
export const generateResponse = async (conversation, query) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic response generation logic
    let response = '';
    
    if (query.toLowerCase().includes('refund')) {
      response = `Hello ${conversation?.customer.name},\n\nThank you for reaching out about your refund request. I understand your concerns.\n\nAccording to our policy, we offer refunds within 30 days of purchase if you're not satisfied with the product. I've initiated the refund process for you, and you should see the amount credited back to your original payment method within 3-5 business days.\n\nPlease let me know if you have any other questions.\n\nRegards,\n[Your Name]`;
    } else if (query.toLowerCase().includes('security')) {
      response = `Hello ${conversation?.customer.name},\n\nI'm sorry to hear about your account security concerns. Your security is our top priority.\n\nI've placed a temporary lock on your account to prevent any unauthorized access. To secure your account, please:\n\n1. Reset your password immediately\n2. Enable two-factor authentication\n3. Review your recent account activity\n\nWould you like me to guide you through these steps?\n\nRegards,\n[Your Name]`;
    } else {
      response = `Hello ${conversation?.customer.name},\n\nThank you for your inquiry. I understand you're looking for assistance with your recent interaction.\n\nBased on our conversation history, I can help you with this matter. Would you like me to provide more specific information about your query?\n\nBest regards,\n[Your Name]`;
    }

    return response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};

// Function to get AI response for specific queries
export const getAIResponse = async (query, conversation) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let hasInternalContent = false;
    let suggestion = '';

    if (query.toLowerCase().includes('refund') || 
        (conversation && conversation.subject.toLowerCase().includes('refund'))) {
      suggestion = `Hello ${conversation?.customer.name},\n\nThank you for reaching out about your refund request for order #34521. I understand your concerns.\n\nAccording to our policy, we offer refunds within 30 days of purchase if you're not satisfied with the product. I've initiated the refund process for you, and you should see the amount credited back to your original payment method within 3-5 business days.\n\nPlease let me know if you have any other questions.\n\nRegards,\n[Your Name]`;
    } else if (query.toLowerCase().includes('security') || 
               (conversation && conversation.subject.toLowerCase().includes('security'))) {
      suggestion = `Hello ${conversation?.customer.name},\n\nI'm sorry to hear about your account security concerns. Your security is our top priority.\n\nI've placed a temporary lock on your account to prevent any unauthorized access. To secure your account, please:\n\n1. Reset your password immediately\n2. Enable two-factor authentication\n3. Review your recent account activity\n\nWould you like me to guide you through these steps?\n\nRegards,\n[Your Name]`;
      hasInternalContent = true;
    } else {
      suggestion = `Hello ${conversation?.customer.name},\n\nThank you for your inquiry about order #45678. I've checked your order status, and I see that your Premium Package has been processed but the shipping confirmation email wasn't sent due to a system delay.\n\nGood news - your package was shipped yesterday and is currently in transit. You should receive it within the next 1-2 business days. I've also requested our system to send you the tracking information via email shortly.\n\nPlease let me know if you need anything else!\n\nBest regards,\n[Your Name]`;
    }

    return { suggestion, hasInternalContent };
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response');
  }
};

// Function to generate conversation summary
export const generateConversationSummary = (conversation) => {
  let summary = '';
  
  if (conversation.subject.includes('Refund')) {
    summary = "Customer is requesting a refund for order #34521 because the product didn't meet expectations. High priority issue requiring prompt resolution.";
  } else if (conversation.subject.includes('recent order')) {
    summary = "Customer ordered Premium Package three days ago (order #45678) and is inquiring about missing shipping confirmation. Needs status update.";
  } else if (conversation.subject.includes('security')) {
    summary = "Customer reports suspicious activity on their account. Security concern that requires immediate action to secure the account and investigate.";
  }
  
  return summary;
};

// Function to get smart suggestions based on context
export const getSmartSuggestions = (conversation, hasSentMessage = false) => {
  // Return empty array if message has been sent
  if (hasSentMessage) {
    return [];
  }
  
  return [
    "I've also applied a 10% courtesy discount to your next order.",
    "Would you like me to expedite your shipping to overnight delivery at no extra cost?",
    "For additional security, I recommend changing your password on any other sites where you've used the same credentials."
  ];
};
