import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from "lucide-react";

interface ProgressSnapshot {
    id: number;
    aptitude_score: number;
    confidence_score: number;
    readiness_score: number;
    assessment_type: string;
    timestamp: string;
}

interface ReadinessTrendChartProps {
    snapshots: ProgressSnapshot[];
}

export function ReadinessTrendChart({ snapshots }: ReadinessTrendChartProps) {
    if (!snapshots || snapshots.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Readiness Trend</CardTitle>
                    <CardDescription>No data available yet</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Complete assessments to see your readiness trend
                    </p>
                </CardContent>
            </Card>
        );
    }

    // Prepare chart data
    const chartData = snapshots.map((snapshot, index) => ({
        index: index + 1,
        date: new Date(snapshot.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }),
        readiness: snapshot.readiness_score,
        confidence: snapshot.confidence_score,
        aptitude: snapshot.aptitude_score || 0
    }));

    // Calculate overall improvement
    const firstReadiness = snapshots[0].readiness_score;
    const lastReadiness = snapshots[snapshots.length - 1].readiness_score;
    const improvement = lastReadiness - firstReadiness;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Readiness Trend
                </CardTitle>
                <CardDescription>
                    Track your career readiness improvement over time
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Current Readiness</div>
                        <div className="text-2xl font-bold text-primary">
                            {lastReadiness.toFixed(0)}%
                        </div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Total Improvement</div>
                        <div className={`text-2xl font-bold ${improvement >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {improvement >= 0 ? '+' : ''}{improvement.toFixed(0)}%
                        </div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Assessments</div>
                        <div className="text-2xl font-bold">
                            {snapshots.length}
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                domain={[0, 100]}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                                                <p className="font-semibold text-sm mb-2">{payload[0].payload.date}</p>
                                                {payload.map((entry, index) => (
                                                    <div key={index} className="flex items-center justify-between gap-4 text-sm">
                                                        <span style={{ color: entry.color }}>{entry.name}:</span>
                                                        <span className="font-bold">{entry.value?.toFixed(1)}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="readiness"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                name="Readiness"
                                dot={{ r: 5 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="confidence"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                name="Confidence"
                                dot={{ r: 4 }}
                            />
                            {chartData.some(d => d.aptitude > 0) && (
                                <Line
                                    type="monotone"
                                    dataKey="aptitude"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name="Aptitude"
                                    dot={{ r: 4 }}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Insight */}
                <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                        {improvement > 10
                            ? "🎉 Excellent progress! You're consistently improving your career readiness."
                            : improvement > 0
                                ? "👍 Good job! Keep completing assessments to improve your readiness."
                                : improvement === 0
                                    ? "📊 Your readiness is stable. Complete more assessments for better insights."
                                    : "💡 Focus on completing all assessments to improve your career clarity."}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
