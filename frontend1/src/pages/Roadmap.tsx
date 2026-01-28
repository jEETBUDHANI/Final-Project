import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { roadmapsApi } from '@/services/api';
import { Loader2, ArrowRight, CheckCircle2, Brain, LogOut } from 'lucide-react';
import ChatbotWidget from '@/components/ChatbotWidget';

interface RoadmapContent {
    current_year: { title: string; tasks: string[]; milestones: string[] };
    next_year: { title: string; tasks: string[]; milestones: string[] };
    future: { goals: string[]; potential_careers: string[] };
    personalized_note?: string;
}

interface RoadmapData {
    id: number;
    stage: string;
    content: RoadmapContent;
    created_at: string;
    updated_at: string;
}

const Roadmap = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showStageSelector, setShowStageSelector] = useState(false);

    useEffect(() => {
        loadRoadmap();
    }, []);

    const loadRoadmap = async () => {
        try {
            const response = await roadmapsApi.getRoadmap();
            setRoadmap(response.roadmap);
        } catch (error: any) {
            if (error.response?.status === 404) {
                setShowStageSelector(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const generateRoadmap = async (stage: string, stream?: string) => {
        setIsGenerating(true);
        try {
            const response = await roadmapsApi.generateRoadmap({
                stage: stage,
                current_stream: stream
            });
            setRoadmap(response.roadmap);
            setShowStageSelector(false);
        } catch (error) {
            console.error('Failed to generate roadmap:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (showStageSelector) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8">
                <div className="container mx-auto max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">Create Your Personalized Roadmap</CardTitle>
                            <p className="text-center text-muted-foreground">
                                Tell us your current academic stage to get started
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Button
                                    variant="outline"
                                    className="h-auto flex-col gap-2 p-6"
                                    onClick={() => generateRoadmap('9-10')}
                                    disabled={isGenerating}
                                >
                                    <span className="text-2xl">📚</span>
                                    <span className="font-semibold">Class 9-10</span>
                                    <span className="text-xs text-muted-foreground">Foundation Stage</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto flex-col gap-2 p-6"
                                    onClick={() => generateRoadmap('11-12')}
                                    disabled={isGenerating}
                                >
                                    <span className="text-2xl">🎓</span>
                                    <span className="font-semibold">Class 11-12</span>
                                    <span className="text-xs text-muted-foreground">Exam Prep Stage</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto flex-col gap-2 p-6"
                                    onClick={() => generateRoadmap('college')}
                                    disabled={isGenerating}
                                >
                                    <span className="text-2xl">🎯</span>
                                    <span className="font-semibold">College</span>
                                    <span className="text-xs text-muted-foreground">Career Building</span>
                                </Button>
                            </div>
                            {isGenerating && (
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Generating your personalized roadmap...
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (!roadmap) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <ChatbotWidget />

            {/* Header */}
            <header className="border-b bg-background/80 backdrop-blur-lg">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                            <Brain className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-gradient">CareerPath Pro</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Your <span className="text-gradient">Academic Roadmap</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Stage: <span className="font-medium text-foreground">{roadmap.stage}</span>
                    </p>
                </div>

                {/* Personalized Note */}
                {roadmap.content.personalized_note && (
                    <Card className="mb-8 border-primary/50 bg-primary/5">
                        <CardContent className="p-6">
                            <p className="text-sm">{roadmap.content.personalized_note}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Roadmap Timeline */}
                <div className="space-y-6">
                    {/* Current Year */}
                    <Card className="border-l-4 border-l-blue-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                <span className="text-2xl">📍</span>
                                {roadmap.content.current_year.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="mb-2 font-semibold">Tasks:</h4>
                                <ul className="space-y-2">
                                    {roadmap.content.current_year.tasks.map((task, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                                            <span className="text-sm">{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold">Milestones:</h4>
                                <ul className="space-y-2">
                                    {roadmap.content.current_year.milestones.map((milestone, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                                            <span className="text-sm font-medium">{milestone}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Year */}
                    <Card className="border-l-4 border-l-green-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                <span className="text-2xl">🚀</span>
                                {roadmap.content.next_year.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="mb-2 font-semibold">Tasks:</h4>
                                <ul className="space-y-2">
                                    {roadmap.content.next_year.tasks.map((task, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                                            <span className="text-sm">{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold">Milestones:</h4>
                                <ul className="space-y-2">
                                    {roadmap.content.next_year.milestones.map((milestone, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                                            <span className="text-sm font-medium">{milestone}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Future Goals */}
                    <Card className="border-l-4 border-l-purple-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                                <span className="text-2xl">🎯</span>
                                Future Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="mb-2 font-semibold">Goals:</h4>
                                <ul className="space-y-2">
                                    {roadmap.content.future.goals.map((goal, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-purple-600" />
                                            <span className="text-sm">{goal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold">Potential Careers:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {roadmap.content.future.potential_careers.map((career, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                        >
                                            {career}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-4">
                    <Button onClick={() => navigate('/assessments')}>
                        Complete Assessments
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Roadmap;
