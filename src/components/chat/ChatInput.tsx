import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { useContext, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { ChatContext, ChatContextProvider } from "./ChatContext";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {

  const {addMessage, handleInputChange, isLoading, message} = useContext(ChatContext)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="absolute border-none bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                rows={1}
                ref ={textareaRef}
                maxRows={4}
                autoFocus
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e)=> {
                  if(e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()

                    addMessage()

                    textareaRef.current?.focus()
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none rounded-xl pr-12 border-[#413f3f] bg-[#030023] text-base text-white py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              />

              <Button
                disabled={isLoading || isDisabled}
                className="bg-teal-400 absolute rounded-xl bottom-1.5 right-[8px]"
                aria-label="send message"
                onClick={()=>{
                  addMessage()
                  textareaRef.current?.focus()
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
