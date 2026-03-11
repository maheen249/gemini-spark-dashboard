import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const formatContent = (text: string): string => {
  return text
    // Headers: ## text -> bold text on its own line
    .replace(/^#{1,6}\s+(.+)$/gm, '<strong>$1</strong>')
    // Bold: **text** or __text__
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Italic: *text* or _text_
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/(?<!\w)_(.+?)_(?!\w)/g, '<em>$1</em>')
    // Bullet points
    .replace(/^[-*]\s+/gm, '• ');
};

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[hsl(var(--chat-user))] text-[hsl(var(--chat-user-foreground))] rounded-br-md"
            : "bg-[hsl(var(--chat-ai))] text-[hsl(var(--chat-ai-foreground))] rounded-bl-md"
        }`}
        dangerouslySetInnerHTML={{ __html: isUser ? content : formatContent(content) }}
      />
    </div>
  );
};

export default ChatMessage;
