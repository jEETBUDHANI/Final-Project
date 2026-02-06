import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, ArrowLeft, Download, Share2, TrendingUp, Award, Target, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function HolisticProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedCareer, setSelectedCareer] = useState<any>(null);
    const [profileData, setProfileData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/assessment/holistic`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('[HolisticProfile] API Response:', response.data);

            if (response.data.profile) {
                const profile = response.data.profile;
                const data = profile.profile_data || {};

                // Extract top careers
                const topCareers = data.top_careers || data.topCareers || [];

                console.log('[HolisticProfile] Top Careers:', topCareers);

                setProfileData({
                    careerClarityScore: profile.clarity_score || 0,
                    topCareers: topCareers,
                    personalityTraits: data.personality || {},
                    topWorkValues: data.values ? Object.entries(data.values).map(([name, score]) => ({ name, score })).sort((a, b) => (b.score as number) - (a.score as number)).slice(0, 3) : [],
                    riskTolerance: data.risk_tolerance || { level: 'Medium', score: 50 },
                    riasecScores: data.riasec || {},
                    aptitudeScore: data.aptitude ? Object.values(data.aptitude).reduce((a: number, b: any) => a + b, 0) / Object.keys(data.aptitude).length : 0
                });

                if (topCareers.length > 0) {
                    setSelectedCareer(topCareers[0]);
                }
            } else {
                setError('No profile data found. Please complete your assessments first.');
            }
        } catch (err: any) {
            console.error('[HolisticProfile] Error:', err);
            setError('Failed to load profile. Please complete your assessments first.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-300">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error || !profileData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">📊</div>
                    <h2 className="text-2xl font-bold mb-4">Complete Your Assessments</h2>
                    <p className="text-gray-300 mb-8">{error || 'Please complete all assessments to view your holistic profile.'}</p>
                    <Button onClick={() => navigate('/assessments')} className="bg-gradient-to-r from-blue-600 to-purple-600">
                        Go to Assessments
                    </Button>
                </div>
            </div>
        );
    }

    // Career roadmap data
    const careerRoadmaps: any = {
        "Software Engineer": [
            { step: 1, title: "Pick Your Language", desc: "Start with Python or Java", icon: "💻" },
            { step: 2, title: "Master DSA", desc: "Data Structures & Algorithms", icon: "🧠" },
            { step: 3, title: "Build Projects", desc: "Create a portfolio", icon: "🚀" },
            { step: 4, title: "Internships", desc: "Get real-world experience", icon: "🎯" }
        ],
        "Data Scientist": [
            { step: 1, title: "Learn Python & Stats", desc: "Foundation in programming and statistics", icon: "📊" },
            { step: 2, title: "Machine Learning", desc: "Study ML algorithms and frameworks", icon: "🤖" },
            { step: 3, title: "Build ML Projects", desc: "Work on real datasets", icon: "📈" },
            { step: 4, title: "Specialize", desc: "Choose your domain (NLP, CV, etc.)", icon: "🎓" }
        ],
        "UX Designer": [
            { step: 1, title: "Design Tools", desc: "Master Figma, Adobe XD", icon: "🎨" },
            { step: 2, title: "User Research", desc: "Learn research methodologies", icon: "🔍" },
            { step: 3, title: "Build Portfolio", desc: "Create case studies", icon: "📱" },
            { step: 4, title: "Get Experience", desc: "Internships and freelance", icon: "💼" }
        ]
    };

    const selectedRoadmap = selectedCareer ? (careerRoadmaps[selectedCareer.name] || careerRoadmaps["Software Engineer"]) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-300 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                    <div className="flex items-center gap-2">
                        <Brain className="h-6 w-6 text-blue-400" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Holistic Profile
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Career Clarity Score */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 p-8 text-center">
                        <Award className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                        <h2 className="text-3xl font-bold mb-2">Career Clarity Score</h2>
                        <div className="text-6xl font-bold mb-4">{Math.round(profileData.careerClarityScore)}%</div>
                        <Progress value={profileData.careerClarityScore} className="h-3 mb-4" />
                        <p className="text-blue-100">
                            {profileData.careerClarityScore >= 75 ? 'Excellent clarity on your career path!' :
                                profileData.careerClarityScore >= 50 ? 'Good understanding of your career direction' :
                                    'Keep exploring to gain more clarity'}
                        </p>
                    </Card>
                </motion.div>

                {/* Top Career Matches */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-400" />
                        Your Top Career Matches
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {profileData.topCareers.map((career: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedCareer(career)}
                                className={`cursor-pointer p-6 rounded-xl transition-all ${selectedCareer?.name === career.name
                                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 ring-2 ring-blue-400'
                                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-lg">{career.name}</h4>
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Match</span>
                                        <span className="text-green-400 font-semibold">{career.match}%</span>
                                    </div>
                                    {career.salary && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300">Salary</span>
                                            <span className="font-semibold">{career.salary}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Career Roadmap */}
                {selectedCareer && selectedRoadmap.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                            Roadmap: {selectedCareer.name}
                        </h3>
                        <div className="space-y-6">
                            {selectedRoadmap.map((step: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all">
                                        <div className="flex items-start gap-6">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-2xl">
                                                {step.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-bold mb-2">Step {step.step}: {step.title}</h4>
                                                <p className="text-gray-300">{step.desc}</p>
                                            </div>
                                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                                        </div>
                                    </Card>
                                    {index < selectedRoadmap.length - 1 && (
                                        <div className="flex justify-center py-2">
                                            <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4 justify-center"
                >
                    <Button size="lg" onClick={() => navigate('/roadmap')} className="bg-gradient-to-r from-blue-600 to-purple-600">
                        View Full Roadmap
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/careers')}>
                        Explore Careers
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
