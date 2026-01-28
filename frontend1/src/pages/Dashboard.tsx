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
  GraduationCap,
  Briefcase,
  ChevronRight,
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

// Personality Archetypes - CareerExplorer style
const PERSONALITY_ARCHETYPES = [
  {
    id: 'guardian',
    name: 'The Guardian',
    color: 'from-blue-500 to-cyan-500',
    icon: '🛡️',
    traits: ['Protective', 'Organized', 'Detail-oriented'],
    careers: ['Project Manager', 'Accountant', 'Administrator']
  },
  {
    id: 'architect',
    name: 'The Architect',
    color: 'from-purple-500 to-pink-500',
    icon: '🎨',
    traits: ['Creative', 'Strategic', 'Innovative'],
    careers: ['Software Architect', 'Designer', 'Entrepreneur']
  },
  {
    id: 'visionary',
    name: 'The Visionary',
    color: 'from-green-500 to-emerald-500',
    icon: '💡',
    traits: ['Imaginative', 'Enterprising', 'Passionate'],
    careers: ['Consultant', 'Business Analyst', 'Strategist']
  },
  {
    id: 'advocate',
    name: 'The Advocate',
    color: 'from-orange-500 to-red-500',
    icon: '⚖️',
    traits: ['Empathetic', 'Idealistic', 'Principaleled'],
    careers: ['Lawyer', 'Social Worker', 'Counselor']
  }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArchetype, setSelectedArchetype] = useState(PERSONALITY_ARCHETYPES[0]);

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

  // Mock career matches - CareerExplorer style
  const careerMatches = [
    {
      id: 1,
      title: 'Software Engineer',
      icon: '💻',
      match: 95,
      salary: '₹12-25 LPA',
      demand: 'High',
      satisfaction: 'High',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      title: 'Data Scientist',
      icon: '📊',
      match: 92,
      salary: '₹15-30 LPA',
      demand: 'Very High',
      satisfaction: 'High',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 3,
      title: 'Product Manager',
      icon: '🎯',
      match: 88,
      salary: '₹18-35 LPA',
      demand: 'High',
      satisfaction: 'Very High',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      icon: '🎨',
      match: 85,
      salary: '₹10-20 LPA',
      demand: 'Medium',
      satisfaction: 'High',
      color: 'from-pink-600 to-pink-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <ChatbotWidget />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">CareerPath Pro</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/assessments" className="text-gray-300 hover:text-white transition-colors">
                Assessments
              </Link>
              <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                Explore Careers
              </Link>
              <Link to="/roadmap" className="text-gray-300 hover:text-white transition-colors">
                My Roadmap
              </Link>
            </nav>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className="text-gray-300 hover:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              {user?.full_name}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-300 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{user?.full_name?.split(' ')[0]}</span>!
              </h1>
              <p className="text-xl text-gray-400">Continue your career journey</p>
            </div>
            <div className="hidden md:block">
              <div className="px-6 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border border-green-600/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Profile {results.length > 0 ? '100%' : '60%'} Complete</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate('/assessments')}
            className="cursor-pointer"
          >
            <Card className="p-6 bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Take Assessment</h3>
                  <p className="text-sm text-gray-300">Discover your strengths</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate('/careers')}
            className="cursor-pointer"
          >
            <Card className="p-6 bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Explore Careers</h3>
                  <p className="text-sm text-gray-300">Browse {careerMatches.length}+ options</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate('/roadmap')}
            className="cursor-pointer"
          >
            <Card className="p-6 bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50 hover:border-green-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Map className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">View Roadmap</h3>
                  <p className="text-sm text-gray-300">Your personalized path</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate('/mentor')}
            className="cursor-pointer"
          >
            <Card className="p-6 bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700/50 hover:border-orange-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Mentor</h3>
                  <p className="text-sm text-gray-300">Get personalized advice</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Personality & Career Matches */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personality Archetype */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-400" />
                Your Personality Archetype
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {PERSONALITY_ARCHETYPES.map((archetype, index) => (
                  <motion.div
                    key={archetype.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => setSelectedArchetype(archetype)}
                    className="cursor-pointer"
                  >
                    <Card className={`relative p-6 bg-gradient-to-br ${archetype.color} border-0 overflow-hidden ${selectedArchetype.id === archetype.id ? 'ring-2 ring-white' : ''}`}>
                      <div className="absolute top-0 right-0 text-8xl opacity-10">
                        {archetype.icon}
                      </div>
                      <div className="relative z-10">
                        <div className="text-4xl mb-3">{archetype.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{archetype.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {archetype.traits.map((trait, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                              {trait}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-white/80">
                          Top careers: {archetype.careers.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Career Matches */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  Your Top Career Matches
                </h2>
                <Link to="/careers" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid gap-4">
                {careerMatches.map((career, index) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate(`/careers/${career.id}`)}
                    className="cursor-pointer"
                  >
                    <Card className={`p-6 bg-gradient-to-r ${career.color} border-0 hover:shadow-2xl transition-all`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{career.icon}</div>
                          <div>
                            <h3 className="text-xl font-bold mb-1">{career.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-white/80">
                              <span>💰 {career.salary}</span>
                              <span>📈 {career.demand}</span>
                              <span>😊 {career.satisfaction}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">{career.match}%</div>
                          <div className="text-xs text-white/70">Match</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Progress & Recent Activity */}
          <div className="space-y-8">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Your Progress
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Profile Completion</span>
                      <span className="text-sm font-semibold">{results.length > 0 ? '100%' : '60%'}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: results.length > 0 ? '100%' : '60%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Assessments Taken</span>
                      <span className="text-sm font-semibold">{results.length}/3</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${(results.length / 3) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Careers Explored</span>
                      <span className="text-sm font-semibold">4/10</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {results.length > 0 ? (
                    results.slice(0, 3).map((result, index) => (
                      <div key={result.id} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Assessment Completed</p>
                          <p className="text-xs text-gray-400">Personality Type: {result.personality_type}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p className="mb-4">No activity yet</p>
                      <Button
                        onClick={() => navigate('/assessments')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        Take Your First Assessment
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Recommended Next Steps
                </h3>
                <div className="space-y-3">
                  <Link to="/assessments" className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Complete Full Assessment</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                  <Link to="/careers" className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Explore Career Options</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                  <Link to="/roadmap" className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Generate Your Roadmap</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
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
