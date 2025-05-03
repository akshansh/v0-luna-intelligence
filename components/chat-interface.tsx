"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Paperclip, PawPrint } from "lucide-react"
import { SnowParticles } from "@/components/snow-particles"
import { MountainDivider } from "@/components/mountain-divider"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome to Luna Intelligence. I'm your Digital Sherpa, ready to guide you through your data mountains. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm analyzing your request about " +
          inputValue.substring(0, 20) +
          "... Here's what I found in your data mountain. Would you like me to explore deeper into specific areas?",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-luna-navy">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-shadow-slate scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "ai" && index > 0 && (
                <div className="mr-2 mt-2">
                  <PawPrint className="h-4 w-4 text-digital-teal" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-birch-silver text-luna-navy rounded-tr-sm"
                    : "bg-shadow-slate text-white rounded-tl-sm"
                }`}
                style={{
                  clipPath:
                    message.sender === "user"
                      ? "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)"
                      : "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 85%)",
                }}
              >
                <p className="text-sm md:text-base">{message.content}</p>
                <div
                  className={`text-xs mt-1 ${message.sender === "user" ? "text-luna-navy/70" : "text-birch-silver/70"}`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              {message.sender === "user" && (
                <div className="ml-2 mt-2">
                  <PawPrint className="h-4 w-4 text-blood-sunset" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-4 bg-shadow-slate text-white rounded-tl-sm h-16 flex items-center">
                <SnowParticles />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-shadow-slate/30 bg-luna-navy">
        <div className="max-w-3xl mx-auto">
          <MountainDivider />

          <div className="mt-4 flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="text-birch-silver border-shadow-slate/50 hover:bg-shadow-slate/20 hover:text-white"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-birch-silver border-shadow-slate/50 hover:bg-shadow-slate/20 hover:text-white"
            >
              <Mic className="h-4 w-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Ask your Digital Sherpa..."
                className="bg-shadow-slate/20 border-shadow-slate/50 text-white placeholder:text-birch-silver/50 focus-visible:ring-digital-teal"
              />
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-blood-sunset hover:bg-blood-sunset/90 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
