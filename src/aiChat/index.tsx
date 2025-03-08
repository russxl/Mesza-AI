import {
  ConvexProvider,
  ConvexReactClient,
  useMutation,
  useQuery,
} from "convex/react";
import { FaMinus } from "react-icons/fa";
import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { api } from "../../convex/_generated/api.js";
import { CloseIcon } from "./CloseIcon.js";
import { SendIcon } from "./SendIcon.js";
import { TrashIcon } from "./TrashIcon.js";
import { Button } from "@/components/ui/button.js";

export function ConvexAiChat({
  convexUrl,
  infoMessage,
  name,
  welcomeMessage,
  renderTrigger,
  onHideChat,
}: {
  convexUrl: string;
  infoMessage: ReactNode;
  name: string;
  welcomeMessage: string;
  renderTrigger: (onClick: () => void) => ReactNode;
  onHideChat: () => void;
}) {
  const [hasOpened, setHasOpened] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    onHideChat();
  }, [onHideChat]);

  return (
    <>
      {renderTrigger(() => {
        setHasOpened(true);
        setDialogOpen(true);
      })}
      {hasOpened &&
        createPortal(
          <ConvexAiChatDialog
            convexUrl={convexUrl}
            isOpen={dialogOpen}
            name={name}
            welcomeMessage={welcomeMessage}
            onClose={handleCloseDialog}
          />,
          document.body
        )}
    </>
  );
}

export function ConvexAiChatDialog({
  convexUrl,
  isOpen,
  name,
  welcomeMessage,
  onClose,
}: {
  convexUrl: string;
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}) {
  const client = useMemo(
    () => new ConvexReactClient(convexUrl),
    [convexUrl]
  );

  return (
    <ConvexProvider client={client}>
      <Dialog
        isOpen={isOpen}
        name={name}
        welcomeMessage={welcomeMessage}
        onClose={onClose}
      />
    </ConvexProvider>
  );
}

export function Dialog({
  isOpen,
  name,
  welcomeMessage,
  onClose,
}: {
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}) {
  const sessionId = useSessionId();
  const remoteMessages = useQuery(api.messages.list, { sessionId });

  const messages = useMemo(() => {
    interface ProcessedMessage {
      isViewer: boolean;
      text: string;
      _id: string;
      isStreaming?: boolean;
      timestamp?: number;
    }
    
    const welcomeMsg: ProcessedMessage[] = [{ 
      isViewer: false, 
      text: welcomeMessage, 
      _id: "0",
      timestamp: Date.now() - 100000 // Make welcome message appear older
    }];
    
    const processedMessages = (remoteMessages || []).map((message: any) => ({
      isViewer: message.isUser === true, 
      text: message.text || "",
      _id: message._id,
      isStreaming: message.isStreaming === true,
      timestamp: message.timestamp
    }));
    
    return welcomeMsg.concat(processedMessages);
  }, [remoteMessages, welcomeMessage]);

  const sendMessage = useMutation(api.messages.send);
  const clearMessages = useMutation(api.messages.clear);

  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();
    if (input.trim() === "" || submitting) return;

    setSubmitting(true);
    const messageText = input;
    setInput(""); 

    try {
      await sendMessage({ message: messageText, sessionId });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClearMessages = async () => {
    await clearMessages({ sessionId });
  };

  const handleEndChat = () => {
    handleClearMessages();
    onClose();
  };

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }, [messages]);

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={
        (isOpen ? "fixed" : "hidden") +
        " rounded-xl flex flex-col bg-white dark:bg-black text-black dark:text-white " +
        "m-4 right-4 bottom-4 z-50 w-96 h-[500px] overflow-hidden transition-all " +
        "shadow-[0px_5px_40px_rgba(0,0,0,0.16),0_20px_25px_-5px_rgb(0,0,0,0.1)] " +
        "dark:shadow-[0px_5px_40px_rgba(0,0,0,0.36),0_20px_25px_-5px_rgb(0,0,0,0.3)]"
      }
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
          <h3 className="font-bold">{name}</h3>
        </div>
        <Button
          onClick={onClose}
          className="text-white focus:outline-none "
          variant="ghost"
        >
         <FaMinus />  
        </Button>
      </div>
      
      <div
        className="flex-grow overflow-auto gap-3 flex flex-col p-4 pb-4"
        ref={listRef}
      >
        {remoteMessages === undefined ? (
          <>
            <div className="animate-pulse rounded-md bg-black/10 h-5" />
            <div className="animate-pulse rounded-md bg-black/10 h-9" />
          </>
        ) : (
          messages.map((message) => (
            <div key={message._id} className={`max-w-[85%] ${message.isViewer ? 'self-end' : 'self-start'}`}>
              <div className="flex items-end gap-2 mb-1">
                {!message.isViewer && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {name.charAt(0)}
                  </div>
                )}
                <div className={`flex flex-col ${message.isViewer ? 'items-end' : 'items-start'}`}>
                  <div className="text-xs text-gray-500 mb-1">
                    {message.isViewer ? 'You' : name} • {formatTime(message.timestamp)}
                  </div>
                  {message.text === "" ? (
                    <div className="animate-pulse rounded-md bg-black/10 h-9 w-32" />
                  ) : (
                    <div
                      className={`rounded-2xl px-4 py-2 whitespace-pre-wrap ${message.isViewer 
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-900 rounded-tl-none'}
                        ${message.isStreaming ? 'border-2 border-green-400' : ''}`}
                    >
                      {message.text}
                      {message.isStreaming && (
                        <span className="inline-block ml-1 h-4 w-2 bg-green-500 animate-[pulse_0.8s_ease-in-out_infinite] rounded-sm"></span>
                      )}
                    </div>
                  )}
                </div>
                {message.isViewer && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                    You
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <form
        className="border-t border-gray-200 p-3 bg-gray-50 flex gap-2 items-center"
        onSubmit={(event) => void handleSend(event)}
      >
        <input
          className="w-full bg-white border border-gray-300 rounded-full text-[1rem] px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
          name="message"
          placeholder={submitting ? "Generating response..." : "Type your message here..."}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={submitting}
        />
        <button
          type="button"
          onClick={handleClearMessages}
          className="p-2 text-gray-500 hover:text-gray-700"
          title="Clear conversation"
        >
          <TrashIcon className="w-5 w-5" />
        </button>
        <button
          type="submit"
          disabled={input.trim() === "" || submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send message"
        >
          <SendIcon className="w-5 h-5" />
        </button>
        <button 
          type="button" 
          onClick={handleEndChat}
          className="p-2 text-gray-500 hover:text-gray-700 hidden sm:block"
          title="End chat"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

const STORE = (typeof window === "undefined" ? null : window)?.sessionStorage;
const STORE_KEY = "ConvexSessionId";

function useSessionId() {
  const [sessionId] = useState(() => {
    const existing = STORE?.getItem(STORE_KEY);
    if (existing) {
      return existing;
    }
    const created = crypto.randomUUID();
    STORE?.setItem(STORE_KEY, created);
    return created;
  });
  return sessionId;
}
