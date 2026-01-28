import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain } from 'lucide-react';

export default function Simulator() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                            <Brain className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-gradient">CareerPath AI</span>
                    </div>

                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">What-If Simulator</h1>
                <Card className="p-8">
                    <p className="text-center text-muted-foreground">
                        Explore how different choices affect your career recommendations
                    </p>
                </Card>
            </main>
        </div>
    );
}
