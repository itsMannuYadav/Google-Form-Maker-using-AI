"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/form";
import { Send, Sparkles, User, Bot, HelpCircle, ArrowRight, Loader2, RefreshCw } from "lucide-react";

interface ChatPanelProps {
  messages: ChatMessage[];
  loading: boolean;
  onSendMessage: (text: string) => void;
  onResetChat?: () => void;
}

export default function ChatPanel({
  messages,
  loading,
  onSendMessage,
  onResetChat,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleChipClick = (suggestion: string) => {
    if (loading) return;
    onSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white border-r border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gov-800 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">AI Form Assistant</h3>
            <p className="text-[11px] text-slate-500">Describe or modify your form in plain English</p>
          </div>
        </div>

        {onResetChat && (
          <button
            onClick={onResetChat}
            title="Start New Form"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Restart</span>
          </button>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gov-100 text-gov-800 text-xs font-semibold">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isUser
                      ? "bg-gov-800 text-white rounded-br-xs"
                      : "bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/70"
                  }`}
                >
                  {msg.content}
                </div>

                {/* Clarification or quick suggestions chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(suggestion)}
                        disabled={loading}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-xs hover:border-gov-400 hover:bg-gov-50 hover:text-gov-900 transition-colors disabled:opacity-50"
                      >
                        <span>{suggestion}</span>
                        <ArrowRight className="h-3 w-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white text-xs">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading state indicator with friendly microcopy */}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gov-100 text-gov-800">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-bl-xs bg-slate-100 px-4 py-2.5 text-sm text-slate-600 border border-slate-200/70 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-gov-700" />
              <span>Thinking and drafting your form questions…</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starting Prompts when chat is empty */}
      {messages.length <= 1 && (
        <div className="shrink-0 px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
            Quick Examples:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Registration form for students and teachers",
              "Feedback survey with ratings 1 to 5",
              "Scholarship application with personal & academic details",
              "Staff leave application form",
            ].map((eg, i) => (
              <button
                key={i}
                onClick={() => handleChipClick(eg)}
                className="text-xs text-left bg-white border border-slate-200 hover:border-gov-300 hover:bg-gov-50 text-slate-700 rounded-md px-2.5 py-1 transition-colors cursor-pointer"
              >
                {eg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="shrink-0 p-3 border-t border-slate-200 bg-white">
        <div className="relative flex items-center">
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Tell AI what to create or change (e.g., 'Make mobile number required', 'Add district question')..."
            className="w-full resize-none rounded-xl border border-slate-300 py-2.5 pl-3.5 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-gov-700 focus:outline-none focus:ring-1 focus:ring-gov-700 leading-normal"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2.5 bottom-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gov-800 text-white shadow-sm hover:bg-gov-900 disabled:opacity-40 transition-colors cursor-pointer"
            title="Send request"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 px-1 flex items-center justify-between">
          <span>Press Enter to send</span>
          <span>Google Forms v1 compatible</span>
        </p>
      </form>
    </div>
  );
}
