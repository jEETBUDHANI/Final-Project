import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Brain, Send, Loader2, User, Bot, ArrowLeft, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    followUpQuestions?: string[];
    suggestedActions?: string[];
    timestamp: string;
}

export default function AIMentor() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! I'm your AI Career Mentor powered by Google Gemini. I'm here to provide personalized career guidance based on your profile. I can help with:\n\n• Understanding your assessment results\n• Exploring career options\n• Making career decisions\n• Planning skill development\n• Addressing career concerns\n\nWhat would you like to discuss today?",
            followUpQuestions: [
                "I'm confused about my career direction",
                "What skills should I learn for my career?",
                "How do I choose between different careers?"
            ],
            timestamp: new Date().toISOString()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input.trim();
        if (!textToSend || isLoading) return;

        // Add user message immediately
        const userMessage: Message = {
            role: 'user',
            content: textToSend,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput(''); // Clear input immediately
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/services/mentor/chat`,
                { message: textToSend },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Add assistant response
            const assistantMessage: Message = {
                role: 'assistant',
                content: response.data.response,
                followUpQuestions: response.data.follow_up_questions || [],
                suggestedActions: response.data.suggested_actions || [],
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error: any) {
            console.error('Chat error:', error);

            toast({
                title: 'Error',
                description: error.response?.data?.error || 'Failed to get response from AI mentor',
                variant: 'destructive'
            });

            // Add error message
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. If the problem persists, check your internet connection.",
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (isLoading) return;
        setInput(suggestion);
        // Auto-send after a brief delay to show the input
        setTimeout(() => handleSend(suggestion), 100);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                                <Brain className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-gradient">AI Career Mentor</span>
                                    <Sparkles className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-xs text-muted-foreground">Powered by Google Gemini</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Card className="h-[calc(100vh-12rem)] flex flex-col">
                    <CardHeader className="border-b flex-shrink-0">
                        <CardTitle className="flex items-center gap-2">
                            <Bot className="h-5 w-5 text-primary" />
                            Chat with Your Mentor
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                        {/* Messages - Using native scroll instead of ScrollArea */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className="animate-in fade-in slide-in-from-bottom-2">
                                    <div
                                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                                                <Bot className="h-5 w-5 text-primary-foreground" />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                                {message.content}
                                            </p>

                                            {/* Follow-up Questions - Clickable */}
                                            {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    <p className="text-xs font-semibold opacity-70">
                                                        💬 Follow-up questions:
                                                    </p>
                                                    {message.followUpQuestions.map((question, qIndex) => (
                                                        <button
                                                            key={qIndex}
                                                            onClick={() => handleSuggestionClick(question)}
                                                            disabled={isLoading}
                                                            className="w-full text-left rounded-lg border border-primary/20 bg-background/50 px-3 py-2 text-sm hover:bg-primary/10 hover:border-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {question}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Suggested Actions */}
                                            {message.suggestedActions && message.suggestedActions.length > 0 && (
                                                <div className="mt-3 space-y-1">
                                                    <p className="text-xs font-semibold opacity-70">
                                                        ✨ Suggested actions:
                                                    </p>
                                                    <ul className="text-xs space-y-1 opacity-80">
                                                        {message.suggestedActions.map((action, aIndex) => (
                                                            <li key={aIndex}>• {action}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {message.role === 'user' && (
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                                                <User className="h-5 w-5 text-secondary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <div className="flex gap-3 justify-start animate-in fade-in">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                                        <Bot className="h-5 w-5 text-primary-foreground" />
                                    </div>
                                    <div className="bg-muted rounded-2xl px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">Thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Scroll anchor */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t p-4 flex-shrink-0">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Ask me anything about your career..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    disabled={isLoading}
                                    className="flex-1"
                                    autoFocus
                                />
                                <Button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    size="icon"
                                    className="shrink-0"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground text-center">
                                💡 Tip: Ask about career confusion, salary, skills, or decision-making
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
