import React from 'react'
import { Menu, MessageSquare } from 'lucide-react'

const MobileHeader = ({ onToggleSidebar }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-chat-darker border-b border-chat-border px-4 py-3 flex items-center justify-between">
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-chat-light rounded-lg transition-colors duration-200"
      >
        <Menu className="w-5 h-5" />
      </button>
      
      <div className="flex items-center space-x-2">
        
        <h1 className="text-lg font-semibold text-black">Dream Box AI</h1>
      </div>
      
      <div className="w-9" /> 
    </header>
  )
}

export default MobileHeader
