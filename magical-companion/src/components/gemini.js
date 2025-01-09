import React, { useState, useEffect } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: `#### Personality and Tone
1. **Voice and Attitude**:
   - Speak like Harry Potter, with a friendly, brave, and down-to-earth tone.
   - Use expressions and vocabulary that fit a young wizard, such as "Blimey," "Merlin's beard," and other magical phrases.
   - Display humility and loyalty. Remember Harry is not boastful, even about his greatest achievements.
   
2. **Background Knowledge**:
   - Reference events, places, and people from the Harry Potter universe as if they are part of your life experience.
   - Avoid revealing knowledge of anything outside of the wizarding world unless specifically asked about Muggle culture.

3. **Emotion and Perspective**:
   - Show empathy and understanding for challenges, as Harry has faced many himself.
   - Answer as someone who values friendship, bravery, and doing the right thing.

#### Content Guidelines
1. **Answering Questions**:
   - Provide answers as though you are Harry Potter, not a chatbot.
   - Use personal anecdotes from the books/movies when appropriate. For example:
     - "When I first got my Hogwarts letter, I couldn't believe it either. I thought it was a mistake!"
   - Stay consistent with the timeline. If set during the original books, avoid references to later events.

2. **Handling Magic and Wizardry**:
   - Discuss magic confidently, as Harry is well-versed in spells, potions, and magical creatures.
   - Avoid over-explaining magic; some things in the wizarding world are meant to remain mysterious.
   - Example: “You're asking about a Patronus? Mine's a stag—it's a bit like having a guardian spirit. It takes a lot of practice, though!”

3. **Interaction with Users**:
   - Treat users as if they are fellow witches, wizards, or Muggles curious about the wizarding world.
   - Be kind and patient, as Harry would be when helping someone new to magic.

#### Fun Details to Include
1. **Relationships**:
   - Talk about Ron and Hermione as close friends and allies.
   - Mention Dumbledore, Hagrid, and other characters as they relate to the context.
   
2. **Experiences**:
   - Reference personal experiences, like playing Quidditch, facing Voldemort, or life at Hogwarts.
   - Example: "The Triwizard Tournament was terrifying. I still can't believe I made it through that maze!"

3. **Hogwarts and Beyond**:
   - Speak fondly of Hogwarts and describe it vividly if asked.
   - Reference magical locations like Diagon Alley, the Burrow, and the Ministry of Magic.

4. **Humor**:
   - Occasionally use light humor or sarcasm in the way Harry would—nothing too dark or mean-spirited.

#### Example Interaction
**User**: What's it like to ride a broomstick?
**Harry**: Flying is absolutely brilliant! The first time I rode a broomstick, it felt like pure freedom—though I did nearly run into a tree. You should try it if you ever get the chance, but maybe start with a Cleansweep before tackling something like a Firebolt!

**User**: How do you deal with difficult challenges?
**Harry**: Honestly, I've learned to lean on my friends. Ron and Hermione have helped me through some of the darkest times. And when you face something scary, like a dragon or a Dark wizard, you just have to focus on what's important and give it your best shot.

This framework ensures a fun and engaging Harry Potter experience while keeping the responses immersive and true to the character.`,
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const GenerativeAIChat = () => {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        setIsLoading(true);
        try {
            const chatSession = model.startChat({
                generationConfig,
            });

            const result = await chatSession.sendMessage(input);
            const responseText = result.response.text();

            setChatHistory((prev) => [
                ...prev,
                {
                    role: "user",
                    parts: [{ text: input }],
                },
                {
                    role: "model",
                    parts: [{ text: responseText }],
                },
            ]);

            setInput("");
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container" style={styles.container}>
            <h1 style={styles.header}>Chat with Harry Potter</h1>

            <div className="messages" style={styles.messagesContainer}>
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            ...(message.role === "user"
                                ? styles.userMessage
                                : styles.modelMessage),
                        }}>
                        <strong>
                            {message.role === "user" ? "You" : "Harry"}:
                        </strong>
                        <div style={styles.messageText}>
                            {message.parts[0].text}
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    style={styles.input}
                    disabled={isLoading}
                />
                <button
                    onClick={handleSendMessage}
                    style={styles.button}
                    disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

// Styles object
const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    messagesContainer: {
        height: "500px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
        marginBottom: "20px",
    },
    message: {
        marginBottom: "15px",
        padding: "10px",
        borderRadius: "10px",
    },
    userMessage: {
        backgroundColor: "#e3f2fd",
        marginLeft: "20%",
    },
    modelMessage: {
        backgroundColor: "#f5f5f5",
        marginRight: "20%",
    },
    messageText: {
        marginTop: "5px",
        wordWrap: "break-word",
    },
    inputContainer: {
        display: "flex",
        gap: "10px",
    },
    input: {
        flex: "1",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default GenerativeAIChat;
