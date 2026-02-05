import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lightbulb } from "lucide-react";

interface FeatureContribution {
    dimension: string;
    contribution_percentage: number;
    details: string;
}

interface ExplanationData {
    career_name: string;
    top_features: FeatureContribution[];
    explanation_text: string;
    overall_match_score: number;
}

interface ExplanationPanelProps {
    explanationData: ExplanationData | null;
    loading?: boolean;
}

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#10b981'];

export function ExplanationPanel({ explanationData, loading = false }: ExplanationPanelProps) {
    if (loading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Why this career?
                    </CardTitle>
                    <CardDescription>Loading explanation...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!explanationData) {
        return null;
    }

    // Prepare data for bar chart
    const chartData = explanationData.top_features.map((feature) => ({
        name: feature.dimension,
        value: feature.contribution_percentage,
        details: feature.details,
    }));

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Why {explanationData.career_name}?
                </CardTitle>
                <CardDescription>
                    Understanding your career match
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Overall Match Score */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Overall Match Score</span>
                        <span className="text-sm font-bold text-primary">
                            {Math.round(explanationData.overall_match_score)}%
                        </span>
                    </div>
                    <Progress value={explanationData.overall_match_score} className="h-2" />
                </div>

                {/* Explanation Text */}
                <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-sm leading-relaxed">
                        {explanationData.explanation_text}
                    </p>
                </div>

                {/* Feature Contributions Bar Chart */}
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Contributing Factors</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={150}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                                                <p className="font-semibold text-sm">{payload[0].payload.name}</p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {payload[0].payload.details}
                                                </p>
                                                <p className="text-sm font-bold text-primary mt-2">
                                                    {payload[0].value}% contribution
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {chartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Detailed Breakdown</h4>
                    {explanationData.top_features.map((feature, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{feature.dimension}</span>
                                <span className="text-sm font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                                    {feature.contribution_percentage.toFixed(1)}%
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{feature.details}</p>
                            <Progress
                                value={feature.contribution_percentage}
                                className="h-1.5"
                                style={{
                                    // @ts-ignore
                                    '--progress-background': COLORS[index % COLORS.length]
                                }}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
