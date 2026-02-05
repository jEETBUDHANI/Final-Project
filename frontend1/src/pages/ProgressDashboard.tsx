import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Calendar, Award, Zap, Target, ArrowLeft } from 'lucide-react';
import { ProgressTimeline } from '@/components/ProgressTimeline';
import { ReadinessTrendChart } from '@/components/ReadinessTrendChart';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProgressDashboard = () => {
    const [progressData, setProgressData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                if (!token) {
                    console.log('No token found');
                    return;
                }

                const response = await axios.get(
                    'http://localhost:5000/api/user/progress',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                setProgressData(response.data.progress || []);
            } catch (error) {
                console.error('Error fetching progress:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    const stats = [
        { label: 'Total Assessments', value: progressData.length, icon: Target, gradient: 'from-blue-500 to-cyan-500' },
        { label: 'Avg Readiness', value: progressData.length > 0 ? Math.round(progressData.reduce((acc, p) => acc + (p.readiness_score || 0), 0) / progressData.length) + '%' : '0%', icon: Zap, gradient: 'from-purple-500 to-pink-500' },
        { label: 'Growth Rate', value: '+12%', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500' },
        { label: 'Achievements', value: '5', icon: Award, gradient: 'from-orange-500 to-red-500' }
    ];

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/dashboard" className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <Brain className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            CareerPath Pro
                        </span>
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </header>

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Your{' '}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Learning Journey
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300">
                        Track your progress and see how you're improving over time
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                        </div>
                    </div>
                ) : progressData.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-block p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full mb-6">
                            <Calendar className="h-16 w-16 text-blue-400" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">No Progress Data Yet</h3>
                        <p className="text-gray-300 mb-8 text-lg">
                            Complete assessments to start tracking your progress
                        </p>
                        <Link
                            to="/assessments"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105"
                        >
                            <Target className="h-5 w-5" />
                            Take Assessments
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl hover:bg-white/10 transition-all overflow-hidden group"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                                    <div className="relative z-10">
                                        <stat.icon className={`h-8 w-8 mb-3 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
                                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-300">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-8">
                            {/* Trend Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl"
                            >
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <TrendingUp className="h-6 w-6 text-green-400" />
                                    Performance Trends
                                </h2>
                                <ReadinessTrendChart snapshots={progressData} />
                            </motion.div>

                            {/* Timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl"
                            >
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Calendar className="h-6 w-6 text-blue-400" />
                                    Your Journey Timeline
                                </h2>
                                <ProgressTimeline snapshots={progressData} />
                            </motion.div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProgressDashboard;
