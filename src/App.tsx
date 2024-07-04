import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { prePromptTraning } from "./training";
import Markdown from "react-markdown";

interface Message {
  id: string; // Unique identifier for each message
  text: string;
  sender: "user" | "bot";
}

export interface DietItem {
  name: string;
  calories: string;
  servingSize: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dietItems, setDietItems] = useState<DietItem[]>([
    { name: "Apple", calories: "95", servingSize: "1 medium (182g)" },
    { name: "Banana", calories: "105", servingSize: "1 medium (118g)" },
    { name: "Chicken Breast", calories: "165", servingSize: "3 oz (85g)" },
    { name: "Broccoli", calories: "55", servingSize: "1 cup (91g)" },
    { name: "Almonds", calories: "164", servingSize: "1 oz (28g)" },
    { name: "Brown Rice", calories: "218", servingSize: "1 cup (195g)" },
    { name: "Salmon", calories: "233", servingSize: "3 oz (85g)" },
    { name: "Egg", calories: "78", servingSize: "1 large (50g)" },
    { name: "Oatmeal", calories: "154", servingSize: "1 cup cooked (234g)" },
    {
      name: "Greek Yogurt",
      calories: "100",
      servingSize: "1 container (170g)",
    },
    { name: "Avocado", calories: "234", servingSize: "1 medium (150g)" },
    { name: "Sweet Potato", calories: "103", servingSize: "1 medium (130g)" },
    { name: "Spinach", calories: "23", servingSize: "1 cup (30g)" },
    { name: "Quinoa", calories: "222", servingSize: "1 cup cooked (185g)" },
    { name: "Blueberries", calories: "85", servingSize: "1 cup (148g)" },
  ]);

  const sessionRef = useRef(null);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const aiAvailable = await window.ai.canCreateTextSession();
        console.log(aiAvailable);
        if (aiAvailable !== "no" && !sessionRef.current) {
          sessionRef.current = await window.ai.createTextSession();
        }
      } catch (err) {
        alert("No Built In AI Detected");
      }
    };

    fetchAI();
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to messages with a unique ID
      const userMessage: Message = {
        id: generateUniqueId(), // Replace with your unique ID generation function
        text: input,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      const completePrompt = `my query is ${input}
      ${prePromptTraning(
        dietItems
      )} <ctrl23> Previous questions and responses history:${messages
        .map((item) => item.text)
        .join("\n")}<ctrl23>`;
      console.log("🚀 ------------------------------------------------🚀");
      console.log("🚀 ~ handleSend ~ completePrompt:", completePrompt);
      console.log("🚀 ------------------------------------------------🚀");

      // Send input to bot and receive responses
      const stream = await sessionRef.current.promptStreaming(completePrompt);
      let response = "";
      for await (const chunk of stream) {
        // setQueryResult(chunk);
        response = chunk;
      }
      if (response) {
        setMessages((prev) => [
          ...prev,
          { id: generateUniqueId(), text: response, sender: "bot" },
        ]);
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} flex flex-col h-screen`}>
      <header className="bg-primary-light dark:bg-primary-dark text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Nutri</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 dark:bg-gray-300 text-white dark:text-black p-2 rounded-lg"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-darkMode-background text-black dark:text-darkMode-text">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-2 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary-light dark:bg-primary-dark text-white"
                    : "bg-gray-300 dark:bg-darkMode-foreground text-black dark:text-darkMode-text"
                }`}
              >
                <Markdown
                  className={`prose ${
                    message.sender === "user"
                      ? "dark:bg-primary-dark text-white"
                      : "text-black dark:text-darkMode-text"
                  }`}
                >
                  {message.text}
                </Markdown>
              </div>
            </div>
          ))}
        </main>
        <aside className="w-1/3 p-4 bg-gray-200 dark:bg-gray-800 overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* <DietForm addDietItem={addDietItem} /> */}
            <div className="mt-4 flex-1 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-2 text-black dark:text-darkMode-text">
                Food Basket
              </h2>
              <ul>
                {dietItems.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 p-2 rounded-lg bg-white dark:bg-darkMode-foreground text-black dark:text-darkMode-text"
                  >
                    {item.name} - {item.calories} kcal - {item.servingSize}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
      <footer className="p-4 bg-white dark:bg-darkMode-foreground flex">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-darkMode-foreground text-black dark:text-darkMode-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-2 bg-primary-light dark:bg-primary-dark text-white p-2 rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default App;

// Function to generate unique IDs (replace with your implementation)
const generateUniqueId = (): string => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
