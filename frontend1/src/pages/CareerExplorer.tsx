import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, ArrowLeft, Search, TrendingUp, BarChart3, Filter } from 'lucide-react';
import ChatbotWidget from '@/components/ChatbotWidget';

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

    const filteredCareers = CAREERS.filter(career => {
        const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                            onClick={() => navigate('/dashboard')}
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
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Explore Careers
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Discover {CAREERS.length}+ career paths with detailed information on salary, demand, and growth
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search careers... (e.g., Software,Doctor, Designer)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-4 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 text-lg"
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
                        <Filter className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold">Filter by Category</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant="outline"
                                className={`${selectedCategory === category
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700'
                                    }`}
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
                    <Card className="p-4 bg-gray-800/50 border-gray-700 text-center">
                        <div className="text-3xl font-bold text-blue-400">{filteredCareers.length}</div>
                        <div className="text-sm text-gray-400">Careers Found</div>
                    </Card>
                    <Card className="p-4 bg-gray-800/50 border-gray-700 text-center">
                        <div className="text-3xl font-bold text-green-400">{CATEGORIES.length - 1}</div>
                        <div className="text-sm text-gray-400">Categories</div>
                    </Card>
                    <Card className="p-4 bg-gray-800/50 border-gray-700 text-center">
                        <div className="text-3xl font-bold text-purple-400">92%</div>
                        <div className="text-sm text-gray-400">Avg Match</div>
                    </Card>
                    <Card className="p-4 bg-gray-800/50 border-gray-700 text-center">
                        <div className="text-3xl font-bold text-orange-400">High</div>
                        <div className="text-sm text-gray-400">Market Demand</div>
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
                        <p className="text-gray-400">Try adjusting your search or filters</p>
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
