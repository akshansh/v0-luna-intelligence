"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Paperclip, AtSign, Sparkles } from "lucide-react"
import { ThinkingIndicator } from "@/components/thinking-indicator"
import { RidgelineDivider } from "@/components/ridgeline-divider"
import { useTime } from "@/components/time-provider"
import { cn } from "@/lib/utils"
import { PawPrintTrail } from "@/components/paw-print-trail"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  mastermind?: string
  timestamp: Date
  thinking?: boolean
}

export function ConversationSpace() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to Luna Intelligence. I'm your guide in this digital wilderness. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { timeOfDay, timeSegment } = useTime()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Check if message references a mastermind
    const mastermindMatch = inputValue.match(/@(\w+)/)
    const mastermind = mastermindMatch ? mastermindMatch[1] : undefined

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      mastermind,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsThinking(true)

    // Simulate AI response after delay
    setTimeout(() => {
      const thinkingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        sender: "ai",
        mastermind,
        timestamp: new Date(),
        thinking: true,
      }

      setMessages((prev) => [...prev, thinkingMessage])

      // Simulate full response after thinking
      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = [...prev]
          const thinkingIndex = newMessages.findIndex((msg) => msg.thinking)

          if (thinkingIndex !== -1) {
            newMessages[thinkingIndex] = {
              ...newMessages[thinkingIndex],
              content: mastermind
                ? `As ${mastermind}, I've analyzed your request about "${inputValue.replace(`@${mastermind}`, "")}". Here's what I found in the data you've provided. Would you like me to explore specific aspects in more detail?`
                : `I've analyzed your request about "${inputValue}". Here's what I found in the digital wilderness. Would you like me to guide you deeper into this territory?`,
              thinking: false,
            }
          }

          return newMessages
        })

        setIsThinking(false)
      }, 2000)
    }, 1000)
  }

  return (
    <div
      className="flex-1 flex flex-col h-[calc(100vh-64px)] time-transition"
      style={{
        background: "var(--conversation-bg)",
        borderLeft: "1px solid var(--conversation-border)",
      }}
    >
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto space-y-6">
          <PawPrintTrail messages={messages} />

          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
              {message.mastermind && message.sender === "ai" && (
                <div className="mr-2 mt-1 flex-shrink-0">
                  <div className="h-6 w-6 rounded-md flex items-center justify-center bg-[rgb(var(--time-primary))] time-transition">
                    <AtSign className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-4 backdrop-blur-sm time-transition border-adaptive",
                  message.sender === "user" ? "bg-adaptive-card text-adaptive-card border" : "text-adaptive-card",
                  message.thinking && "min-h-[60px] min-w-[200px]",
                )}
                style={{
                  background: message.sender === "ai" ? "var(--card-bg)" : "",
                  borderColor: message.sender === "ai" ? "var(--conversation-border)" : "",
                  boxShadow:
                    message.sender === "ai" ? "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
                }}
              >
                {message.thinking ? (
                  <ThinkingIndicator />
                ) : (
                  <>
                    <p className="text-sm md:text-base">{message.content}</p>
                    <div className="text-xs mt-2 text-adaptive-card-muted">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      {message.mastermind && (
                        <span className="ml-2 text-[rgb(var(--time-primary))] time-transition">
                          @{message.mastermind}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {message.mastermind && message.sender === "user" && (
                <div className="ml-2 mt-1 flex-shrink-0">
                  <div className="h-6 w-6 rounded-md flex items-center justify-center bg-[rgb(var(--time-primary))]/80 time-transition">
                    <AtSign className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div
        className="p-4 backdrop-blur-sm time-transition"
        style={{
          borderTop: "1px solid var(--conversation-border)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <RidgelineDivider />

          <div className="mt-4 flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="text-adaptive border-adaptive bg-adaptive-hover hover:text-adaptive"
            >
              <Paperclip className="h-4 w-4 icon-adaptive" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-adaptive border-adaptive bg-adaptive-hover hover:text-adaptive"
            >
              <Mic className="h-4 w-4 icon-adaptive" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-adaptive border-adaptive bg-adaptive-hover hover:text-adaptive"
            >
              <AtSign className="h-4 w-4 icon-adaptive" />
            </Button>

            <div className="flex-1 relative group">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Ask Luna Intelligence..."
                className="bg-adaptive-input border-adaptive text-adaptive placeholder:text-adaptive-secondary/60 focus-visible:ring-[rgb(var(--time-primary))] focus-visible:border-[rgb(var(--time-primary))]/50 transition-all group-hover:bg-adaptive-input/80"
              />
              {inputValue.includes("@") && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Sparkles className="h-4 w-4 text-[rgb(var(--time-primary))] animate-pulse time-transition" />
                </div>
              )}
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isThinking}
              className="bg-[rgb(var(--time-primary))] hover:bg-[rgb(var(--time-primary))]/90 text-white group time-transition"
            >
              <Send className="h-4 w-4 group-hover:animate-pulse" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
