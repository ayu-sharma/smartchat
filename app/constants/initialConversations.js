export const initialConversations = [
  {
    id: 1,
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    subject: "Refund Request for Order #34521",
    lastActivity: "2 hours ago",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Hi, I'd like to request a refund for my recent order. The product didn't meet my expectations.",
        timestamp: "2024-03-20 10:30 AM"
      },
      {
        id: 2,
        sender: "agent",
        content: "Hello John, I'm sorry to hear that. Could you please provide your order number and the reason for the refund?",
        timestamp: "2024-03-20 10:35 AM"
      }
    ]
  },
  {
    id: 2,
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    subject: "Question about recent order #45678",
    lastActivity: "1 hour ago",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Hi there, I placed an order three days ago but haven't received any shipping confirmation yet. Can you help?",
        timestamp: "2024-03-20 11:15 AM"
      }
    ]
  },
  {
    id: 3,
    customer: {
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    subject: "Account Security Concern",
    lastActivity: "30 minutes ago",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "I noticed some suspicious activity on my account. Can you help me secure it?",
        timestamp: "2024-03-20 12:00 PM"
      }
    ]
  }
]; 