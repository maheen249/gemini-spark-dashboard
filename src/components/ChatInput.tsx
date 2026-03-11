import { Send } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-border bg-card p-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Gemini anything..."
        className="min-h-[44px] max-h-[120px] resize-none border-input bg-background"
        rows={1}
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        size="icon"
        className="shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
