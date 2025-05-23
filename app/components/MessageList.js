import { User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessageList({ conversation }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-gray-50/50 to-gray-100/50 backdrop-blur-sm">
      <AnimatePresence>
        {conversation.messages.map((message, index) => (
          <motion.div 
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`max-w-3/4 rounded-xl p-4 shadow-sm ${
                message.sender === 'customer' 
                  ? 'bg-white/50 backdrop-blur-sm border border-gray-200/30' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              }`}
            >
              <div className="flex items-center mb-2">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    message.sender === 'customer' 
                      ? 'bg-gradient-to-br from-gray-100 to-gray-200' 
                      : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                  }`}
                >
                  <User className={`h-4 w-4 ${message.sender === 'customer' ? 'text-gray-600' : 'text-white'}`} />
                </motion.div>
                <div>
                  <p className="text-sm font-medium">
                    {message.sender === 'customer' 
                      ? conversation.customer.name 
                      : 'You'}
                  </p>
                  <p className={`text-xs ${message.sender === 'customer' ? 'text-gray-500' : 'text-blue-100'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
              <p className={`text-sm whitespace-pre-line leading-relaxed ${
                message.sender === 'customer' ? 'text-gray-700' : 'text-white'
              }`}>
                {message.content}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 