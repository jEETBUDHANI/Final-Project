import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    Brain,
    ArrowLeft,
    TrendingUp,
    Briefcase,
    GraduationCap,
    Target,
    Users,
    DollarSign,
    Award,
    BookOpen,
    Sparkles,
    ArrowUpRight,
    CheckCircle2,
    Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ChatbotWidget from '@/components/ChatbotWidget';

const CareerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'salary' | 'education' | 'skills'>('overview');

    // Mock data - replace with API call
    const career = {
        id: 1,
        title: 'Software Engineer',
        icon: '💻',
        match: 92,
        rating: 4.5,
        description: 'Design, develop, and maintain software applications. Work with various programming languages and frameworks to create solutions for businesses and consumers.',
        avgSalary: '₹12 LPA',
        salaryRange: '₹6-25 LPA',
        demand: 'High',
        growth: '+15% YoY',
        workEnvironment: 'Office / Remote',

        salaryData: [
            { exp: '0-2 years', min: 600000, avg: 800000, max: 1200000 },
            { exp: '2-5 years', min: 1000000, avg: 1500000, max: 2000000 },
            { exp: '5-8 years', min: 1800000, avg: 2200000, max: 3000000 },
            { exp: '8+ years', min: 2500000, avg: 3500000, max: 5000000 }
        ],

        responsibilities: [
            'Write clean, maintainable code',
            'Design software architecture',
            'Debug and troubleshoot applications',
            'Collaborate with cross-functional teams',
            'Review code and mentor junior developers',
            'Stay updated with latest technologies'
        ],

        requiredSkills: [
            { name: 'Python', level: 85, category: 'Programming' },
            { name: 'JavaScript', level: 80, category: 'Programming' },
            { name: 'Data Structures', level: 90, category: 'Core' },
            { name: 'Algorithms', level: 85, category: 'Core' },
            { name: 'Git', level: 70, category: 'Tools' },
            { name: 'Problem Solving', level: 95, category: 'Soft Skills' },
            { name: 'Communication', level: 75, category: 'Soft Skills' }
        ],

        education: [
            {
                degree: 'B.Tech Computer Science',
                rating: 5,
                description: 'Most common path',
                colleges: ['IIT', 'NIT', 'IIIT'],
                exams: ['JEE Main', 'JEE Advanced']
            },
            {
                degree: 'B.Tech IT/Electronics',
                rating: 4,
                description: 'Alternative option',
                colleges: ['State Universities', 'Private Colleges'],
                exams: ['JEE Main', 'State Entrance']
            },
            {
                degree: 'BCA + MCA',
                rating: 3,
                description: 'Non-engineering path',
                colleges: ['Any University'],
                exams: ['NIMCET', 'University Exams']
            }
        ],

        careerPath: [
            { level: 'Entry', title: 'Junior Developer', years: '0-2', salary: '₹6-12 LPA' },
            { level: 'Mid', title: 'Software Engineer', years: '2-5', salary: '₹12-20 LPA' },
            { level: 'Senior', title: 'Senior Engineer', years: '5-8', salary: '₹20-30 LPA' },
            { level: 'Lead', title: 'Tech Lead / Architect', years: '8+', salary: '₹30-50 LPA' }
        ],

        topCompanies: [
            'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple',
            'Flipkart', 'Swiggy', 'Zomato', 'Paytm', 'PhonePe'
        ],

        relatedCareers: [
            { id: 2, title: 'Data Scientist', match: 88, icon: '📊' },
            { id: 3, title: 'DevOps Engineer', match: 85, icon: '⚙️' },
            { id: 4, title: 'Full Stack Developer', match: 90, icon: '🌐' },
            { id: 5, title: 'Mobile App Developer', match: 82, icon: '📱' }
        ]
    };

    const formatCurrency = (value: number) => {
        return `₹${(value / 100000).toFixed(1)}L`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <ChatbotWidget />

            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div className="h-6 w-px bg-gray-700" />
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-blue-400" />
                            <span className="font-semibold">CareerPath Pro</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-start gap-6 mb-6">
                        <div className="text-7xl">{career.icon}</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                                <h1 className="text-5xl font-bold">{career.title}</h1>
                                {career.match && (
                                    <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
                                        <span className="text-lg font-bold">{career.match}% Match</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(career.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-600'
                                            }`}
                                    />
                                ))}
                                <span className="text-gray-400 ml-2">{career.rating}/5.0</span>
                            </div>

                            <p className="text-xl text-gray-300 mb-6 max-w-3xl">
                                {career.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                    <div className="text-gray-400 text-sm mb-1">Avg Salary</div>
                                    <div className="text-2xl font-bold text-green-400">{career.avgSalary}</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                    <div className="text-gray-400 text-sm mb-1">Demand</div>
                                    <div className="text-2xl font-bold text-blue-400">{career.demand}</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                    <div className="text-gray-400 text-sm mb-1">Growth</div>
                                    <div className="text-2xl font-bold text-purple-400">{career.growth}</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                    <div className="text-gray-400 text-sm mb-1">Work Style</div>
                                    <div className="text-lg font-bold text-orange-400">{career.workEnvironment}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-800">
                    {[
                        { id: 'overview', label: 'Overview', icon: <Target className="w-4 h-4" /> },
                        { id: 'salary', label: 'Salary Insights', icon: <DollarSign className="w-4 h-4" /> },
                        { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
                        { id: 'skills', label: 'Skills', icon: <Award className="w-4 h-4" /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${activeTab === tab.id
                                ? 'text-blue-400 border-b-2 border-blue-400'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="p-8 bg-gray-800/50 border-gray-700">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Briefcase className="w-6 h-6 text-blue-400" />
                                    Key Responsibilities
                                </h3>
                                <ul className="space-y-3">
                                    {career.responsibilities.map((resp, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                                            <span className="text-gray-300">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            <Card className="p-8 bg-gray-800/50 border-gray-700">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-purple-400" />
                                    Career Progression
                                </h3>
                                <div className="space-y-6">
                                    {career.careerPath.map((stage, index) => (
                                        <div key={index} className="relative pl-8 border-l-2 border-gray-700 last:border-0">
                                            <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="text-lg font-bold">{stage.title}</h4>
                                                    <span className="text-green-400 font-semibold">{stage.salary}</span>
                                                </div>
                                                <div className="text-sm text-gray-400">{stage.years} years experience</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Salary Tab */}
                    {activeTab === 'salary' && (
                        <div className="space-y-8">
                            <Card className="p-8 bg-gray-800/50 border-gray-700">
                                <h3 className="text-2xl font-bold mb-6">Salary Distribution by Experience</h3>
                                <div className="h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={career.salaryData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="exp" stroke="#9CA3AF" />
                                            <YAxis tickFormatter={formatCurrency} stroke="#9CA3AF" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                                                labelStyle={{ color: '#F3F4F6' }}
                                                formatter={(value: number) => formatCurrency(value)}
                                            />
                                            <Bar dataKey="min" fill="#3B82F6" name="Minimum" />
                                            <Bar dataKey="avg" fill="#10B981" name="Average" />
                                            <Bar dataKey="max" fill="#8B5CF6" name="Maximum" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-700">
                                        <div className="text-sm text-gray-400 mb-1">Minimum</div>
                                        <div className="text-2xl font-bold text-blue-400">₹6 LPA</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-700">
                                        <div className="text-sm text-gray-400 mb-1">Average</div>
                                        <div className="text-2xl font-bold text-green-400">₹15 LPA</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-700">
                                        <div className="text-sm text-gray-400 mb-1">Maximum</div>
                                        <div className="text-2xl font-bold text-purple-400">₹50 LPA</div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 bg-gray-800/50 border-gray-700">
                                <h3 className="text-2xl font-bold mb-6">Top Hiring Companies</h3>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {career.topCompanies.map((company, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-3 bg-gray-900/50 rounded-lg border border-gray-700 text-center font-semibold text-white hover:border-blue-500 transition-colors"
                                        >
                                            {company}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Education Tab */}
                    {activeTab === 'education' && (
                        <div className="space-y-6">
                            {career.education.map((edu, index) => (
                                <Card key={index} className="p-8 bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                                            <p className="text-gray-400">{edu.description}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < edu.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-400 mb-3">TOP COLLEGES</h4>
                                            <div className="space-y-2">
                                                {edu.colleges.map((college, i) => (
                                                    <div key={i} className="px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-700 text-white font-medium">
                                                        {college}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-400 mb-3">ENTRANCE EXAMS</h4>
                                            <div className="space-y-2">
                                                {edu.exams.map((exam, i) => (
                                                    <div key={i} className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-700 text-white font-medium">
                                                        {exam}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            {['Programming', 'Core', 'Tools', 'Soft Skills'].map((category) => {
                                const categorySkills = career.requiredSkills.filter(s => s.category === category);
                                if (categorySkills.length === 0) return null;

                                return (
                                    <Card key={category} className="p-8 bg-gray-800/50 border-gray-700">
                                        <h3 className="text-2xl font-bold mb-6">{category}</h3>
                                        <div className="space-y-4">
                                            {categorySkills.map((skill, index) => (
                                                <div key={index}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-semibold">{skill.name}</span>
                                                        <span className="text-sm text-gray-400">{skill.level}%</span>
                                                    </div>
                                                    <Progress value={skill.level} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                {/* Related Careers */}
                <div className="mt-16">
                    <h3 className="text-3xl font-bold mb-8">Related Careers</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {career.relatedCareers.map((related) => (
                            <motion.div
                                key={related.id}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="cursor-pointer"
                                onClick={() => navigate(`/careers/${related.id}`)}
                            >
                                <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500 transition-all">
                                    <div className="text-4xl mb-3">{related.icon}</div>
                                    <h4 className="text-xl font-bold mb-2">{related.title}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                                style={{ width: `${related.match}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-green-400">{related.match}%</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 p-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to start your journey?</h3>
                    <p className="text-xl mb-8 text-blue-100">
                        Take our comprehensive assessment to discover careers that match your personality
                    </p>
                    <Link to="/assessments">
                        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                            Take Assessment
                            <ArrowUpRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CareerDetail;
