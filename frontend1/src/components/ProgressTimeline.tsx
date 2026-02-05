import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar } from "lucide-react";

interface ProgressSnapshot {
    id: number;
    aptitude_score: number;
    confidence_score: number;
    readiness_score: number;
    assessment_type: string;
    timestamp: string;
}

interface ProgressTimelineProps {
    snapshots: ProgressSnapshot[];
}

export function ProgressTimeline({ snapshots }: ProgressTimelineProps) {
    if (!snapshots || snapshots.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Progress Timeline</CardTitle>
                    <CardDescription>No progress data yet</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Complete assessments to start tracking your progress
                    </p>
                </CardContent>
            </Card>
        );
    }

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getAssessmentLabel = (type: string) => {
        const labels: Record<string, string> = {
            'riasec': 'Interest Assessment',
            'aptitude': 'Aptitude Test',
            'personality': 'Personality Test',
            'values': 'Work Values',
            'risk': 'Risk Tolerance'
        };
        return labels[type] || type;
    };

    const getScoreImprovement = (index: number, scoreType: 'readiness_score' | 'confidence_score') => {
        if (index === 0) return null;
        const current = snapshots[index][scoreType];
        const previous = snapshots[index - 1][scoreType];
        const diff = current - previous;
        return diff;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Progress Timeline</CardTitle>
                <CardDescription>Your learning journey over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                    {/* Timeline items */}
                    <div className="space-y-6">
                        {snapshots.map((snapshot, index) => {
                            const readinessImprovement = getScoreImprovement(index, 'readiness_score');
                            const confidenceImprovement = getScoreImprovement(index, 'confidence_score');

                            return (
                                <div key={snapshot.id} className="relative pl-12">
                                    {/* Timeline dot */}
                                    <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span className="font-semibold">
                                                        {getAssessmentLabel(snapshot.assessment_type)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(snapshot.timestamp)}
                                                </div>
                                            </div>

                                            {/* Improvement badges */}
                                            <div className="flex gap-2">
                                                {readinessImprovement !== null && readinessImprovement !== 0 && (
                                                    <Badge
                                                        variant={readinessImprovement > 0 ? "default" : "secondary"}
                                                        className="text-xs"
                                                    >
                                                        {readinessImprovement > 0 ? '+' : ''}{readinessImprovement.toFixed(1)}% readiness
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Scores */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {snapshot.aptitude_score !== null && (
                                                <div className="text-center p-2 bg-background rounded">
                                                    <div className="text-xs text-muted-foreground mb-1">Aptitude</div>
                                                    <div className="text-lg font-bold">{snapshot.aptitude_score.toFixed(0)}</div>
                                                </div>
                                            )}
                                            <div className="text-center p-2 bg-background rounded">
                                                <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                                                <div className="text-lg font-bold">{snapshot.confidence_score.toFixed(0)}</div>
                                            </div>
                                            <div className="text-center p-2 bg-background rounded">
                                                <div className="text-xs text-muted-foreground mb-1">Readiness</div>
                                                <div className="text-lg font-bold text-primary">
                                                    {snapshot.readiness_score.toFixed(0)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
