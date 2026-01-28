import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, ArrowLeft, Download, Share2, TrendingUp, Award, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HolisticProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Mock comprehensive profile data
    const profileData = {
        careerClarityScore: 92,
        personalityArchetype: "The Architect",
        topCareers: [
            { name: "Software Engineer", match: 95, salary: "₹12-25 LPA" },
            { name: "Data Scientist", match: 92, salary: "₹15-30 LPA" },
            { name: "Product Manager", match: 88, salary: "₹18-35 LPA" }
        ],
        aptitudeScore: 78,
        personalityTraits: {
            openness: 85,
            conscientiousness: 92,
            extraversion: 65,
            agreeableness: 78,
            neuroticism: 35
        },
        topWorkValues: [
            { name: "Growth", score: 95 },
            { name: "Autonomy", score: 88 },
            { name: "Challenge", score: 85 }
        ],
        riskTolerance: {
            level: "High",
            score: 72,
            profile: "Adventurous"
        },
        recommendations: [
            "Consider roles in fast-growing tech startups",
            "Leverage your strong analytical skills in data-driven positions",
            "Seek opportunities for continuous learning and innovation",
            "Build a portfolio of technical projects to showcase skills"
        ]
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Brain className="w-16 h-16 text-blue-400 animate-pulse mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Generating Your Holistic Profile...</h2>
                    <p className="text-gray-400">Analyzing all your assessment results</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-400 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <div className="h-6 w-px bg-gray-700" />
                        <div className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-blue-400" />
                            <span className="font-semibold">Holistic Career Profile</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                        <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Your Holistic Career Profile
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A comprehensive analysis combining all your assessment results to guide your career journey
                    </p>
                </motion.div>

                {/* Career Clarity Score */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <Card className="p-12 bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-700 text-center">
                        <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Career Clarity Score</h2>
                        <div className="text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {profileData.careerClarityScore}
                        </div>
                        <p className="text-xl text-gray-300 mb-6">
                            You have exceptional clarity about your career direction!
                        </p>
                        <Progress value={profileData.careerClarityScore} className="h-4 max-w-md mx-auto" />
                    </Card>
                </motion.div>

                {/* Main Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Personality Archetype */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-8 bg-gray-800/50 border-gray-700 h-full">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-3xl">🎭</span>
                                Personality Archetype
                            </h3>
                            <div className="text-center mb-6">
                                <div className="text-4xl font-bold text-purple-400 mb-2">
                                    {profileData.personalityArchetype}
                                </div>
                                <p className="text-gray-400">Creative, Strategic, Innovative</p>
                            </div>
                            <div className="space-y-3">
                                {Object.entries(profileData.personalityTraits).map(([trait, score]) => (
                                    <div key={trait}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm capitalize text-gray-300">{trait}</span>
                                            <span className="text-sm font-semibold text-purple-400">{score}%</span>
                                        </div>
                                        <Progress value={score} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Top Career Matches */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-8 bg-gray-800/50 border-gray-700 h-full">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                                Top Career Matches
                            </h3>
                            <div className="space-y-4">
                                {profileData.topCareers.map((career, index) => (
                                    <div
                                        key={career.name}
                                        className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500 transition-colors cursor-pointer"
                                        onClick={() => navigate(`/careers/${index + 1}`)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-white">{career.name}</h4>
                                            <span className="text-2xl font-bold text-green-400">{career.match}%</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <span>💰 {career.salary}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600"
                                onClick={() => navigate('/careers')}
                            >
                                Explore All Careers
                            </Button>
                        </Card>
                    </motion.div>
                </div>

                {/* Assessment Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold mb-6">Assessment Breakdown</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Aptitude */}
                        <Card className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700">
                            <div className="text-4xl mb-3">🧠</div>
                            <h3 className="text-xl font-bold mb-2 text-white">Aptitude</h3>
                            <div className="text-4xl font-bold text-purple-400 mb-2">{profileData.aptitudeScore}%</div>
                            <p className="text-sm text-gray-300">Strong logical reasoning</p>
                        </Card>

                        {/* Work Values */}
                        <Card className="p-6 bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-700">
                            <div className="text-4xl mb-3">💎</div>
                            <h3 className="text-xl font-bold mb-2 text-white">Work Values</h3>
                            <div className="space-y-1 mb-2">
                                {profileData.topWorkValues.map((value, i) => (
                                    <div key={value.name} className="text-sm text-orange-300">
                                        {i + 1}. {value.name} ({value.score}%)
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Risk Tolerance */}
                        <Card className="p-6 bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-700">
                            <div className="text-4xl mb-3">🎯</div>
                            <h3 className="text-xl font-bold mb-2 text-white">Risk Tolerance</h3>
                            <div className="text-4xl font-bold text-yellow-400 mb-2">{profileData.riskTolerance.score}%</div>
                            <p className="text-sm text-gray-300">{profileData.riskTolerance.profile} risk-taker</p>
                        </Card>
                    </div>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <Card className="p-8 bg-gray-800/50 border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Target className="w-6 h-6 text-blue-400" />
                            Personalized Recommendations
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {profileData.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-center">
                        <h3 className="text-3xl font-bold mb-4">Ready to Take Action?</h3>
                        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                            Use these insights to explore careers, build your roadmap, and connect with an AI mentor for guidance
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-purple-600 hover:bg-gray-100"
                                onClick={() => navigate('/careers')}
                            >
                                Explore Careers
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white/20"
                                onClick={() => navigate('/roadmap')}
                            >
                                Build Your Roadmap
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white/20"
                                onClick={() => navigate('/mentor')}
                            >
                                Talk to AI Mentor
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
