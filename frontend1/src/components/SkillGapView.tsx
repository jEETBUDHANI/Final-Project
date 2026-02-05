import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, XCircle, TrendingUp } from "lucide-react";

interface Skill {
    skill_name: string;
    category: string;
    required_level: number;
    user_level: number;
    gap: number;
    status: 'strong' | 'medium' | 'weak';
}

interface SkillGapData {
    career_name: string;
    strong_skills: Skill[];
    medium_skills: Skill[];
    weak_or_missing_skills: Skill[];
    learning_priority_order: Skill[];
    overall_readiness: number;
}

interface SkillGapViewProps {
    skillGapData: SkillGapData | null;
    loading?: boolean;
}

export function SkillGapView({ skillGapData, loading = false }: SkillGapViewProps) {
    if (loading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Skill Gap Analysis</CardTitle>
                    <CardDescription>Loading skill analysis...</CardDescription>
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

    if (!skillGapData) {
        return null;
    }

    const renderSkillCard = (skill: Skill, index: number) => {
        const statusConfig = {
            strong: { icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
            medium: { icon: AlertCircle, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
            weak: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
        };

        const config = statusConfig[skill.status];
        const Icon = config.icon;

        return (
            <div
                key={index}
                className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor}`}
            >
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${config.color}`} />
                        <span className="font-semibold">{skill.skill_name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                        {skill.category}
                    </Badge>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Your Level: {skill.user_level}/5</span>
                        <span>Required: {skill.required_level}/5</span>
                    </div>
                    <Progress
                        value={(skill.user_level / skill.required_level) * 100}
                        className="h-2"
                    />
                    {skill.gap > 0 && (
                        <p className="text-xs text-muted-foreground">
                            Gap: {skill.gap.toFixed(1)} levels to improve
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Overall Readiness */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Overall Readiness for {skillGapData.career_name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Readiness Score</span>
                            <span className="text-2xl font-bold text-primary">
                                {skillGapData.overall_readiness}%
                            </span>
                        </div>
                        <Progress value={skillGapData.overall_readiness} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-2">
                            {skillGapData.overall_readiness >= 80
                                ? "You're well-prepared for this career!"
                                : skillGapData.overall_readiness >= 60
                                    ? "You're on the right track. Focus on improving medium and weak skills."
                                    : "Significant skill development needed. Follow the learning priority order below."}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Skill Categories */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Strong Skills */}
                <Card className="border-green-200">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Strong Skills
                        </CardTitle>
                        <CardDescription>
                            {skillGapData.strong_skills.length} skill{skillGapData.strong_skills.length !== 1 ? 's' : ''}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {skillGapData.strong_skills.length > 0 ? (
                            skillGapData.strong_skills.map((skill, index) => renderSkillCard(skill, index))
                        ) : (
                            <p className="text-sm text-muted-foreground">No strong skills yet. Keep learning!</p>
                        )}
                    </CardContent>
                </Card>

                {/* Medium Skills */}
                <Card className="border-yellow-200">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            Medium Skills
                        </CardTitle>
                        <CardDescription>
                            {skillGapData.medium_skills.length} skill{skillGapData.medium_skills.length !== 1 ? 's' : ''}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {skillGapData.medium_skills.length > 0 ? (
                            skillGapData.medium_skills.map((skill, index) => renderSkillCard(skill, index))
                        ) : (
                            <p className="text-sm text-muted-foreground">No medium skills.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Weak/Missing Skills */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-red-500" />
                            Weak/Missing Skills
                        </CardTitle>
                        <CardDescription>
                            {skillGapData.weak_or_missing_skills.length} skill{skillGapData.weak_or_missing_skills.length !== 1 ? 's' : ''}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {skillGapData.weak_or_missing_skills.length > 0 ? (
                            skillGapData.weak_or_missing_skills.map((skill, index) => renderSkillCard(skill, index))
                        ) : (
                            <p className="text-sm text-muted-foreground">Great! No weak skills.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Learning Priority Order */}
            {skillGapData.learning_priority_order.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Learning Priority Order</CardTitle>
                        <CardDescription>
                            Focus on these skills in order to maximize your career readiness
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {skillGapData.learning_priority_order.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold">{skill.skill_name}</span>
                                            <Badge variant="outline">{skill.category}</Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>Current: {skill.user_level}/5</span>
                                            <span>→</span>
                                            <span>Target: {skill.required_level}/5</span>
                                            <span className="ml-auto text-red-500 font-medium">
                                                Gap: {skill.gap.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
