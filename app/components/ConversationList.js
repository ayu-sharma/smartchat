import { Search, MessageSquare, Clock, CheckCircle, ChevronDown, X } from 'lucide-react';
import Button from './ui/Button';

export default function ConversationList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation,
  showConversationList,
  onCloseConversationList 
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {showConversationList && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseConversationList}
        />
      )}
      
      <div className={`
        fixed lg:relative lg:w-80
        w-80 h-full lg:h-auto
        bg-white/80 backdrop-blur-xl lg:bg-white/80 lg:backdrop-blur-xl
        border-r border-gray-200/40 lg:border-gray-200/40
        overflow-hidden flex flex-col
        transform transition-all duration-300 ease-out
        ${showConversationList ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0 lg:shadow-none'}
        z-50 lg:z-auto
      `}>
        {/* Header Section */}
        <div className="p-4 lg:p-6 border-b border-gray-100/50 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
                Conversations
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 font-medium">
                {conversations.length} active chats
              </p>
            </div>
            <Button 
              onClick={onCloseConversationList}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 lg:hidden rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-sm bg-white/70 backdrop-blur-xl placeholder-gray-400 transition-all shadow-sm"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="p-2">
            {conversations.map((conversation, index) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`
                  w-full p-4 rounded-xl border transition-all duration-200 mb-2
                  group hover:scale-[1.02] hover:shadow-xl backdrop-blur-xl cursor-pointer
                  ${selectedConversation?.id === conversation.id 
                    ? 'bg-gradient-to-r from-blue-100/80 to-indigo-100/80 border-blue-200/50 shadow-lg backdrop-blur-xl' 
                    : 'bg-white/60 hover:bg-white/80 border-gray-100/40 hover:border-gray-200/50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all shadow-md
                    ${selectedConversation?.id === conversation.id 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-indigo-100'
                    }
                  `}>
                    <MessageSquare className={`
                      h-5 w-5 transition-colors
                      ${selectedConversation?.id === conversation.id 
                        ? 'text-white' 
                        : 'text-gray-600 group-hover:text-blue-600'
                      }
                    `} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-gray-800 text-left">
                        {conversation.customer.name}
                      </h3>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">
                          {conversation.lastActivity}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate mb-2 leading-tight text-left">
                      {conversation.subject}
                    </p>

                    {/* Message Preview */}
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 line-clamp-2 text-left">
                        {conversation.messages[0]?.content || 'No messages yet'}
                      </p>
                    </div>
                    
                    {/* Status Badges */}
                    <div className="flex items-center space-x-2 justify-start">
                      {conversation.unread && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
                          New
                        </span>
                      )}
                      {conversation.status === 'resolved' && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolved
                        </span>
                      )}
                      {conversation.priority === 'high' && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hover Indicator */}
                <div className={`
                  h-0.5 w-full mt-3 rounded-full transition-all duration-200
                  ${selectedConversation?.id === conversation.id 
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500' 
                    : 'bg-transparent group-hover:bg-gradient-to-r group-hover:from-gray-300 group-hover:to-gray-400'
                  }
                `} />
              </button>
            ))}
          </div>
          
          {conversations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-md">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No conversations yet</h3>
              <p className="text-xs text-gray-500 text-center">
                New conversations will appear here when customers reach out.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}