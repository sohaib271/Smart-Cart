import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CustomerSupportChat = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", text: input };
    setMessages([...messages, newMessage]);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/customersupport`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input }),
      });
      const result = await response.json();
      if (result.botResponse) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: result.botResponse }, // Correct response handling
        ]);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong!" },
      ]);
    }
    setInput("");
  };
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-blue-700 text-white p-4 flex items-center gap-3">
        <ArrowLeft onClick={() => navigate("/home")} size={24} className="cursor-pointer" />
        <img
          src="/customer.webp" 
          alt="Support"
          className="w-10 h-10 rounded-full"
          loading="lazy"
        />
        <div>
          <h2 className="text-lg font-semibold">Customer Support</h2>
          <p className="text-sm opacity-80">Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] p-3 rounded-lg text-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex items-center border-t">
        <input
          type="text"
          className="flex-1 p-2 text-sm border rounded-lg outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Replaced `onKeyPress`
        />
        <button
          className="ml-3 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          onClick={sendMessage}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
export default CustomerSupportChat;
