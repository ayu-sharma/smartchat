import { MessageSquare, Send } from 'lucide-react';
import Button from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReplyComposer({ 
  replyText, 
  setReplyText, 
  onSendReply, 
  onShowAiPanel,
  showSuggestions,
  smartSuggestions 
}) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 border-t border-gray-200/30 bg-gradient-to-r from-white/50 to-gray-50/50 backdrop-blur-sm"
    >
      <AnimatePresence>
        {showSuggestions && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-3 flex flex-wrap gap-2 overflow-hidden"
          >
            {smartSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setReplyText(replyText + "\n\n" + suggestion)}
                  className="bg-white/30 hover:bg-white/50 border border-gray-200/40 rounded-full transition-all"
                >
                  + {suggestion}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="flex items-start"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex-1 border border-gray-200/40 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className="w-full p-2 focus:outline-none min-h-[80px] resize-none bg-transparent placeholder-gray-400 text-sm text-gray-700"
            rows={2}
          />
          
          <div className="flex justify-between items-center px-3 py-2 bg-gradient-to-r from-gray-50/50 to-gray-100/50 backdrop-blur-sm border-t border-gray-200/30">
            <div className="flex">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={MessageSquare}
                  onClick={onShowAiPanel}
                  className="mr-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-full transition-all"
                >
                  Ask AI Copilot
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ 
                opacity: replyText.trim() ? 1 : 0.7,
                scale: replyText.trim() ? 1 : 0.95
              }}
            >
              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={onSendReply}
                disabled={!replyText.trim()}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md transition-all"
              >
                Send Reply
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 