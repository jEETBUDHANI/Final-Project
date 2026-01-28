import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatbotApi } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: '👋 Hi! I\'m your AI career mentor. Ask me anything about your academic or career path!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (isOpen && suggestedQuestions.length === 0) {
            loadSuggestions();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const loadSuggestions = async () => {
        try {
            const response = await chatbotApi.getSuggestedQuestions();
            setSuggestedQuestions(response.suggested_questions || []);
        } catch (error) {
            console.error('Failed to load suggestions:', error);
        }
    };

    const handleSend = async (question?: string) => {
        const userQuestion = question || input.trim();
        if (!userQuestion) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userQuestion }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatbotApi.ask(userQuestion);
            setMessages(prev => [...prev, { role: 'bot', content: response.answer }]);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.error ||
                'Sorry, I couldn\'t process that. Please try again or complete your assessments first!';
            setMessages(prev => [...prev, { role: 'bot', content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg transition-transform hover:scale-110"
                >
                    <MessageCircle className="h-6 w-6 text-white" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl border bg-card shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary to-secondary p-4 text-white rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            <span className="font-semibold">AI Career Mentor</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1 hover:bg-white/20 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="rounded-2xl bg-muted px-4 py-2">
                                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions */}
                    {messages.length <= 1 && suggestedQuestions.length > 0 && (
                        <div className="border-t p-3">
                            <p className="mb-2 text-xs font-medium text-muted-foreground">Suggested questions:</p>
                            <div className="space-y-2">
                                {suggestedQuestions.slice(0, 3).map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSend(question)}
                                        className="w-full rounded-lg border bg-background p-2 text-left text-xs transition-colors hover:bg-accent"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                                placeholder="Ask your question..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                size="icon"
                                className="shrink-0"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatbotWidget;
