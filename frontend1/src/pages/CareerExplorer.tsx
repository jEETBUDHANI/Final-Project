import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, ArrowLeft, Search, TrendingUp, BarChart3, Filter } from 'lucide-react';
import ChatbotWidget from '@/components/ChatbotWidget';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Comprehensive career data
const CAREERS = [
    { id: 1, title: 'Software Engineer', icon: '💻', match: 95, salary: '₹8-30 LPA', demand: 'Very High', category: 'Technology', color: 'from-blue-600 to-cyan-600' },
    { id: 2, title: 'Data Scientist', icon: '📊', match: 92, salary: '₹10-35 LPA', demand: 'Very High', category: 'Technology', color: 'from-purple-600 to-pink-600' },
    { id: 3, title: 'Product Manager', icon: '🎯', match: 88, salary: '₹15-40 LPA', demand: 'High', category: 'Business', color: 'from-green-600 to-emerald-600' },
    { id: 4, title: 'UI/UX Designer', icon: '🎨', match: 85, salary: '₹6-20 LPA', demand: 'High', category: 'Design', color: 'from-pink-600 to-rose-600' },
    { id: 5, title: 'Digital Marketer', icon: '📱', match: 82, salary: '₹4-15 LPA', demand: 'High', category: 'Marketing', color: 'from-orange-600 to-red-600' },
    { id: 6, title: 'Doctor (MBBS)', icon: '🩺', match: 90, salary: '₹8-50 LPA', demand: 'Very High', category: 'Healthcare', color: 'from-red-600 to-pink-600' },
    { id: 7, title: 'Civil Engineer', icon: '🏗️', match: 78, salary: '₹5-18 LPA', demand: 'Medium', category: 'Engineering', color: 'from-gray-600 to-gray-800' },
    { id: 8, title: 'Chartered Accountant', icon: '💼', match: 87, salary: '₹7-25 LPA', demand: 'High', category: 'Finance', color: 'from-yellow-600 to-orange-600' },
    { id: 9, title: 'Investment Banker', icon: '💰', match: 84, salary: '₹12-50 LPA', demand: 'High', category: 'Finance', color: 'from-green-600 to-teal-600' },
    { id: 10, title: 'Content Writer', icon: '✍️', match: 75, salary: '₹3-10 LPA', demand: 'Medium', category: 'Creative', color: 'from-indigo-600 to-purple-600' },
    { id: 11, title: 'Architect', icon: '🏛️', match: 81, salary: '₹5-20 LPA', demand: 'Medium', category: 'Design', color: 'from-slate-600 to-gray-700' },
    { id: 12, title: 'Mechanical Engineer', icon: '⚙️', match: 76, salary: '₹4-18 LPA', demand: 'Medium', category: 'Engineering', color: 'from-blue-700 to-indigo-700' },
    { id: 13, title: 'Lawyer', icon: '⚖️', match: 89, salary: '₹6-30 LPA', demand: 'High', category: 'Law', color: 'from-amber-600 to-yellow-700' },
    { id: 14, title: 'Psychologist', icon: '🧠', match: 83, salary: '₹4-15 LPA', demand: 'Medium', category: 'Healthcare', color: 'from-teal-600 to-cyan-600' },
    { id: 15, title: 'Photographer', icon: '📷', match: 72, salary: '₹3-12 LPA', demand: 'Medium', category: 'Creative', color: 'from-rose-600 to-pink-600' },
    { id: 16, title: 'Full Stack Developer', icon: '🌐', match: 93, salary: '₹8-28 LPA', demand: 'Very High', category: 'Technology', color: 'from-cyan-600 to-blue-600' },
    { id: 17, title: 'DevOps Engineer', icon: '🔧', match: 86, salary: '₹10-32 LPA', demand: 'Very High', category: 'Technology', color: 'from-emerald-600 to-green-600' },
    { id: 18, title: 'Business Analyst', icon: '📈', match: 80, salary: '₹6-22 LPA', demand: 'High', category: 'Business', color: 'from-violet-600 to-purple-600' },
    { id: 19, title: 'Teacher', icon: '👨‍🏫', match: 74, salary: '₹3-12 LPA', demand: 'High', category: 'Education', color: 'from-blue-600 to-indigo-600' },
    { id: 20, title: 'Entrepreneur', icon: '🚀', match: 91, salary: '₹0-100 LPA', demand: 'High', category: 'Business', color: 'from-red-600 to-orange-600' }
];

const CATEGORIES = ['All', 'Technology', 'Healthcare', 'Business', 'Finance', 'Design', 'Engineering', 'Creative', 'Law', 'Education'];

export default function CareerExplorer() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [matchedCareerNames, setMatchedCareerNames] = useState<string[]>([]);
    const [hasProfile, setHasProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadMatchedCareers();
    }, []);

    const loadMatchedCareers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/assessment/holistic`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('[CareerExplorer] API Response:', response.data);

            if (response.data.profile && response.data.profile.profile_data) {
                const profileData = response.data.profile.profile_data;
                console.log('[CareerExplorer] Profile Data:', profileData);
                const careers = profileData.top_careers || profileData.topCareers || [];
                console.log('[CareerExplorer] Matched Careers:', careers);
                const careerNames = careers.map((c: any) => c.name || c);
                setMatchedCareerNames(careerNames);
                setHasProfile(true);
            }
        } catch (error) {
            console.error('[CareerExplorer] Failed to load matched careers:', error);
            setHasProfile(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter careers: if user has profile, show only matched careers; otherwise show all
    const availableCareers = hasProfile && matchedCareerNames.length > 0
        ? CAREERS.filter(career => matchedCareerNames.some(name => career.title.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(career.title.toLowerCase())))
        : CAREERS;

    const filteredCareers = availableCareers.filter(career => {
        const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading your matched careers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <ChatbotWidget />

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-300 hover:text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div className="h-6 w-px bg-white/20" />
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                CareerPath Pro
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {hasProfile ? 'Your Matched Careers' : 'Explore Careers'}
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        {hasProfile
                            ? `Showing ${filteredCareers.length} careers matched to your profile`
                            : `Discover ${CAREERS.length}+ career paths with detailed information on salary, demand, and growth`
                        }
                    </p>
                    {!hasProfile && (
                        <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <p className="text-blue-300">
                                💡 <strong>Tip:</strong> Complete your assessments to see personalized career matches!
                            </p>
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                        <Input
                            type="text"
                            placeholder="Search careers... (e.g., Software, Doctor, Designer)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-4 h-14 bg-white/5 border-white/10 text-white placeholder-gray-400 text-lg hover:bg-white/10 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-gray-300" />
                        <h3 className="text-lg font-semibold">Filter by Category</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant="outline"
                                className={`${selectedCategory === category
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent'
                                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                                    } transition-all`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    <Card className="p-4 bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all">
                        <div className="text-3xl font-bold text-blue-400">{filteredCareers.length}</div>
                        <div className="text-sm text-gray-300">Careers Found</div>
                    </Card>
                    <Card className="p-4 bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all">
                        <div className="text-3xl font-bold text-green-400">{CATEGORIES.length - 1}</div>
                        <div className="text-sm text-gray-300">Categories</div>
                    </Card>
                    <Card className="p-4 bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all">
                        <div className="text-3xl font-bold text-purple-400">92%</div>
                        <div className="text-sm text-gray-300">Avg Match</div>
                    </Card>
                    <Card className="p-4 bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all">
                        <div className="text-3xl font-bold text-orange-400">High</div>
                        <div className="text-sm text-gray-300">Market Demand</div>
                    </Card>
                </motion.div>

                {/* Career Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCareers.map((career, index) => (
                        <motion.div
                            key={career.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => navigate(`/careers/${career.id}`)}
                            className="cursor-pointer"
                        >
                            <Card className={`relative p-6 bg-gradient-to-br ${career.color} border-0 overflow-hidden h-full`}>
                                <div className="absolute top-0 right-0 text-8xl opacity-10">
                                    {career.icon}
                                </div>
                                <div className="relative z-10">
                                    <div className="text-5xl mb-4">{career.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{career.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/70">Match</span>
                                            <span className="font-semibold text-green-300">{career.match}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/70">Salary</span>
                                            <span className="font-semibold">{career.salary}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/70">Demand</span>
                                            <span className={`font-semibold ${career.demand === 'Very High' ? 'text-green-300' :
                                                career.demand === 'High' ? 'text-blue-300' : 'text-yellow-300'
                                                }`}>
                                                {career.demand}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-white/20">
                                        <span className="text-xs px-3 py-1 bg-white/20 rounded-full">
                                            {career.category}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredCareers.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2">No careers found</h3>
                        <p className="text-gray-300">Try adjusting your search or filters</p>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <Card className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-center">
                        <TrendingUp className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
                        <h3 className="text-3xl font-bold mb-4">Not Sure Which Career is Right?</h3>
                        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                            Take our comprehensive assessment to discover careers that match your personality, interests, and skills
                        </p>
                        <Button
                            size="lg"
                            className="bg-white text-purple-600 hover:bg-gray-100"
                            onClick={() => navigate('/assessments')}
                        >
                            Take Assessment Now
                        </Button>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
