import { ChevronRight, MessageSquare, Send, Copy, ThumbsUp, PlusCircle, AlertTriangle } from 'lucide-react';
import Button from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AiCopilotPanel({
  onClose,
  aiQuery,
  setAiQuery,
  onAskAiCopilot,
  copilotThinking,
  aiSuggestion,
  hasInternalContent,
  onInsertAiSuggestion,
  timeSaved,
  showAiPanel
}) {
  const [metrics, setMetrics] = useState({
    timeSaved: 0,
    efficiencyBoost: 0,
    suggestionsUsed: 0
  });

  // Update metrics when suggestions are used
  useEffect(() => {
    if (aiSuggestion) {
      setMetrics(prev => ({
        timeSaved: Math.floor(Math.random() * 15) + 5, // Random time between 5-20 minutes
        efficiencyBoost: Math.floor(Math.random() * 40) + 20, // Random boost between 20-60%
        suggestionsUsed: prev.suggestionsUsed + 1
      }));
    }
  }, [aiSuggestion]);

  return (
    <AnimatePresence>
      {showAiPanel && (
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            absolute right-0 top-0
            w-1/2
            h-full
            border-l border-gray-200/30 bg-white
            overflow-y-auto flex flex-col
            z-50
          `}
        >
          <div className="p-4 border-b border-gray-200/30 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-blue-700">AI Copilot</h3>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-1">Ask me anything about this conversation</p>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-blue-700">AI Copilot</p>
                <p className="text-sm mt-1">
                  How can I help with this conversation? Ask me for suggestions or recommendations.
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex mb-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask something like 'How should I respond?'"
                  className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-sm bg-white"
                />
                <Button
                  onClick={onAskAiCopilot}
                  disabled={!aiQuery.trim() || copilotThinking}
                  variant="primary"
                  size="icon"
                  className="ml-2 px-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  {copilotThinking ? (
                    <span className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    </span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 flex justify-between">
                <Button variant="link" size="sm">What's our refund policy?</Button>
                <Button variant="link" size="sm">How should I handle this?</Button>
              </div>
            </div>
            
            {aiSuggestion && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Suggested Response</h4>
                  <div className="flex">
                    <Button 
                      onClick={onInsertAiSuggestion}
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      title="Insert into reply"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                      title="Thumbs up"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {hasInternalContent && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-3 flex items-center bg-gradient-to-r from-amber-50 to-orange-50 p-2 rounded text-xs text-amber-800"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Contains internal knowledge. Review before sending.
                  </motion.div>
                )}
                
                <p className="text-sm whitespace-pre-line">{aiSuggestion}</p>
                
                <div className="mt-3 flex justify-end">
                  <Button
                    onClick={onInsertAiSuggestion}
                    variant="secondary"
                    size="sm"
                    className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                  >
                    <PlusCircle className="h-3 w-3 mr-1" />
                    Insert into Reply
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Efficiency metrics */}
          <div className="p-4 border-t border-gray-200/30 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h4 className="text-xs font-medium text-blue-700">Efficiency Metrics</h4>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-xs text-gray-500">Time Saved</p>
                <p className="text-sm font-medium">{metrics.timeSaved} min</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Efficiency Boost</p>
                <p className="text-sm font-medium">{metrics.efficiencyBoost}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Suggestions Used</p>
                <p className="text-sm font-medium">{metrics.suggestionsUsed}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 