import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, ArrowRight } from 'lucide-react';

interface GuideStep {
    title: string;
    message: string;
    action?: string;
    route?: string;
}

const guideSteps: GuideStep[] = [
    {
        title: "Welcome! 👋",
        message: "Hi! I'm your dashboard guide. Let me show you around your AI Career Mentorship Platform. Ready to start?",
    },
    {
        title: "Assessment Center 📋",
        message: "First, you should complete all 5 assessments to build your career profile. This includes Interest, Aptitude, Personality, Values, and Risk tests.",
        action: "Go to Assessments",
        route: "/assessments"
    },
    {
        title: "Holistic Profile 🎯",
        message: "After completing assessments, you'll unlock your Holistic Profile with a Career Clarity Score (0-100) and personalized insights.",
        action: "View Profile",
        route: "/holistic-profile"
    },
    {
        title: "Career Explorer 🔍",
        message: "Browse 100+ detailed career profiles with salary info, skills needed, growth paths, and day-in-life descriptions.",
        action: "Explore Careers",
        route: "/careers"
    },
    {
        title: "What-If Simulator 🎮",
        message: "Try the What-If Simulator to see how improving skills or changing preferences affects your career recommendations.",
        action: "Try Simulator",
        route: "/simulator"
    },
    {
        title: "AI Career Mentor 🤖",
        message: "Chat with me anytime for career guidance! I can help with confusion, decisions, skill development, and more. Just click 'AI Mentor' in Quick Actions.",
        action: "Chat with Mentor",
        route: "/mentor"
    },
    {
        title: "You're All Set! 🎉",
        message: "That's it! Start by taking assessments, then explore your options. I'm here if you need help. Good luck on your career journey!",
    }
];

export default function DashboardGuide() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasSeenGuide, setHasSeenGuide] = useState(false);

    useEffect(() => {
        // Check if user has seen the guide
        const seen = localStorage.getItem('hasSeenDashboardGuide');
        if (!seen) {
            setIsOpen(true);
            setHasSeenGuide(false);
        } else {
            setHasSeenGuide(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < guideSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleClose();
        }
    };

    const handleAction = (route?: string) => {
        if (route) {
            navigate(route);
            handleClose();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenDashboardGuide', 'true');
        setHasSeenGuide(true);
    };

    const handleReopen = () => {
        setCurrentStep(0);
        setIsOpen(true);
    };

    const step = guideSteps[currentStep];

    if (!isOpen && hasSeenGuide) {
        // Show floating button to reopen guide
        return (
            <button
                onClick={handleReopen}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
                title="Show Dashboard Guide"
            >
                <MessageCircle className="h-6 w-6" />
            </button>
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="relative w-full max-w-md mx-4 animate-in fade-in zoom-in">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted"
                >
                    <X className="h-5 w-5" />
                </button>

                <CardContent className="p-8">
                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex gap-1">
                            {guideSteps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1 flex-1 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-muted'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground text-center">
                            Step {currentStep + 1} of {guideSteps.length}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="mb-6 text-center">
                        <h2 className="mb-3 text-2xl font-bold">{step.title}</h2>
                        <p className="text-muted-foreground">{step.message}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        {step.action && step.route && (
                            <Button
                                onClick={() => handleAction(step.route)}
                                className="flex-1"
                                variant="outline"
                            >
                                {step.action}
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            className="flex-1"
                        >
                            {currentStep === guideSteps.length - 1 ? "Get Started" : "Next"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {currentStep > 0 && (
                        <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground"
                        >
                            ← Back
                        </button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
