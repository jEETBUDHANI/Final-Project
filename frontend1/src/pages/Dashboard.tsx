import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { predictionApi } from '@/services/api';
import ChatbotWidget from '@/components/ChatbotWidget';
import {
  Brain,
  TrendingUp,
  LogOut,
  User,
  Target,
  Map,
  Award,
  Briefcase,
  ChevronRight,
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Zap,
  Trophy,
  Rocket
} from 'lucide-react';
import OnboardingTour from '@/components/OnboardingTour';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await predictionApi.getResults();
          setResults(data);
        }
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const careerMatches = [
    {
      id: 1,
      title: 'Software Engineer',
      icon: '💻',
      match: 95,
      salary: '₹12-25 LPA',
      demand: 'High',
      gradient: 'from-blue-500 via-blue-600 to-cyan-600'
    },
    {
      id: 2,
      title: 'Data Scientist',
      icon: '📊',
      match: 92,
      salary: '₹15-30 LPA',
      demand: 'Very High',
      gradient: 'from-purple-500 via-purple-600 to-pink-600'
    },
    {
      id: 3,
      title: 'Product Manager',
      icon: '🎯',
      match: 88,
      salary: '₹18-35 LPA',
      demand: 'High',
      gradient: 'from-green-500 via-emerald-600 to-teal-600'
    }
  ];

  const stats = [
    { label: 'Profile Complete', value: results.length > 0 ? '100%' : '60%', icon: Trophy, color: 'from-yellow-400 to-orange-500' },
    { label: 'Assessments', value: `${results.length}/4`, icon: Target, color: 'from-blue-400 to-cyan-500' },
    { label: 'Career Matches', value: '12+', icon: Briefcase, color: 'from-purple-400 to-pink-500' },
    { label: 'Readiness', value: '85%', icon: Zap, color: 'from-green-400 to-emerald-500' }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <OnboardingTour run={true} />
      <ChatbotWidget />

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
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/assessments" className="text-gray-400 hover:text-white transition-colors font-medium">
                Assessments
              </Link>
              <Link to="/careers" className="text-gray-400 hover:text-white transition-colors font-medium">
                Careers
              </Link>
              <Link to="/roadmap" className="text-gray-400 hover:text-white transition-colors font-medium">
                Roadmap
              </Link>
              <Link to="/progress" className="text-gray-400 hover:text-white transition-colors font-medium">
                Progress
              </Link>
            </nav>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <User className="h-4 w-4 mr-2" />
              {user?.full_name}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {user?.full_name?.split(' ')[0]}
            </span>
            ! 👋
          </h1>
          <p className="text-xl text-gray-400">Let's continue building your perfect career path</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="relative p-6 bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative z-10">
                  <stat.icon className={`h-8 w-8 mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Target, label: 'Take Assessment', path: '/assessments', gradient: 'from-blue-500 to-cyan-500', tour: 'assessments' },
            { icon: Briefcase, label: 'Explore Careers', path: '/careers', gradient: 'from-purple-500 to-pink-500', tour: 'careers' },
            { icon: Map, label: 'View Roadmap', path: '/roadmap', gradient: 'from-green-500 to-emerald-500', tour: 'roadmap' },
            { icon: Sparkles, label: 'AI Mentor', path: '/mentor', gradient: 'from-orange-500 to-red-500', tour: 'progress' }
          ].map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate(action.path)}
              className="cursor-pointer"
              data-tour={action.tour}
            >
              <Card className={`relative p-6 bg-gradient-to-br ${action.gradient} border-0 overflow-hidden group`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                <div className="relative z-10">
                  <action.icon className="h-6 w-6 mb-3 text-white" />
                  <h3 className="font-bold text-white">{action.label}</h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Career Matches */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Rocket className="h-8 w-8 text-purple-400" />
                Your Top Matches
              </h2>
              <Link to="/careers" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {careerMatches.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                onClick={() => navigate(`/careers/${career.id}`)}
                className="cursor-pointer"
              >
                <Card className={`relative p-6 bg-gradient-to-r ${career.gradient} border-0 overflow-hidden group`}>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{career.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{career.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/90">
                          <span className="flex items-center gap-1">
                            💰 {career.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            📈 {career.demand}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1">{career.match}%</div>
                      <div className="text-sm text-white/80">Match</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Your Progress
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Profile', value: results.length > 0 ? 100 : 60, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Assessments', value: (results.length / 4) * 100, color: 'from-purple-500 to-pink-500' },
                    { label: 'Careers Explored', value: 40, color: 'from-green-500 to-emerald-500' }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-400">{item.label}</span>
                        <span className="text-sm font-bold">{Math.round(item.value)}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
                          className={`h-full bg-gradient-to-r ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Recent Activity
                </h3>
                {results.length > 0 ? (
                  <div className="space-y-3">
                    {results.slice(0, 3).map((result) => (
                      <div key={result.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Assessment Completed</p>
                          <p className="text-xs text-gray-400">Type: {result.personality_type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No activity yet</p>
                    <Button
                      onClick={() => navigate('/assessments')}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Start Now
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Next Steps
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Complete Assessments', path: '/assessments' },
                    { label: 'Explore Careers', path: '/careers' },
                    { label: 'Build Roadmap', path: '/roadmap' }
                  ].map((step) => (
                    <Link
                      key={step.label}
                      to={step.path}
                      className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{step.label}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
