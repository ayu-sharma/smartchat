import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from './ui/Button';
import { motion } from 'framer-motion';

export default function ConversationHeader({ conversation }) {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-white"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
        <div>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base lg:text-lg font-semibold"
          >
            {conversation.subject}
          </motion.h2>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center text-sm text-gray-500 mt-1"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className={`px-2 py-0.5 rounded-full text-xs mr-3 ${
                conversation.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
              }`}
            >
              {conversation.status}
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className={`px-2 py-0.5 rounded-full text-xs ${
                conversation.priority === 'High' ? 'bg-red-100 text-red-800' : 
                conversation.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'
              }`}
            >
              {conversation.priority} Priority
            </motion.span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 lg:gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              icon={Clock}
              className="text-xs lg:text-sm"
            >
              Follow Up
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              icon={CheckCircle}
              className="text-xs lg:text-sm"
            >
              Resolve
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              icon={AlertTriangle}
              className="text-xs lg:text-sm"
            >
              Escalate
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
} 