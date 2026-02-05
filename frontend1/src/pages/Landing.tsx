import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Target, Sparkles, Users, CheckCircle, TrendingUp, Zap, Award, Rocket, BarChart3 } from 'lucide-react';

const Landing = () => {
  const careerPaths = [
    {
      title: 'Engineering (JEE Path)',
      icon: '⚙️',
      description: 'Technical careers through JEE',
      gradient: 'from-blue-500 to-cyan-500',
      jobs: '500K+'
    },
    {
      title: 'Medical (NEET Path)',
      icon: '🏥',
      description: 'Healthcare through NEET',
      gradient: 'from-red-500 to-pink-500',
      jobs: '300K+'
    },
    {
      title: 'Commerce & Management',
      icon: '💼',
      description: 'Business and finance careers',
      gradient: 'from-green-500 to-emerald-500',
      jobs: '450K+'
    },
    {
      title: 'Arts & Humanities',
      icon: '🎨',
      description: 'Creative and social sciences',
      gradient: 'from-purple-500 to-violet-500',
      jobs: '200K+'
    },
    {
      title: 'Skill-based Careers',
      icon: '💻',
      description: 'Modern digital careers',
      gradient: 'from-cyan-500 to-blue-500',
      jobs: '600K+'
    },
    {
      title: 'Law & Legal',
      icon: '⚖️',
      description: 'Legal profession path',
      gradient: 'from-orange-500 to-yellow-500',
      jobs: '150K+'
    }
  ];

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: '5 Assessment Types',
      description: 'Comprehensive personality & aptitude analysis',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Personalized Roadmaps',
      description: 'Stage-wise academic and career guidance',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI Career Coach',
      description: 'Context-aware guidance powered by AI',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Progress Tracking',
      description: 'Monitor your growth and readiness',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { value: '6+', label: 'Career Paths', icon: <Rocket className="w-5 h-5" /> },
    { value: '13+', label: 'Job Roles', icon: <TrendingUp className="w-5 h-5" /> },
    { value: '98%', label: 'Success Rate', icon: <Award className="w-5 h-5" /> },
    { value: '5', label: 'Assessments', icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CareerPath Pro
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Login</Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-4 py-2 border border-blue-500/30">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">AI-Powered Career Guidance</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  Discover Your{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Perfect Career
                  </span>{' '}
                  Path
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-gray-300 leading-relaxed"
                >
                  India's most comprehensive career guidance platform. Get personalized roadmaps, AI-powered insights, and real job market data to make informed decisions about your future.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/signup">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg h-14 px-8">
                        Start Your Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/login">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-2 border-white/20 text-white hover:bg-white/10 hover:text-white">
                        <Zap className="mr-2 h-5 w-5" />
                        Explore Features
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-4 gap-4 pt-8"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xl"
                    >
                      <div className="flex justify-center mb-2 text-blue-400">{stat.icon}</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right - Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <img
                    src="/hero_career_guidance_1769578434140.png"
                    alt="Students planning their career"
                    className="w-full h-auto"
                  />
                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Success Rate</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">98%</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Comprehensive tools and insights designed for Indian students
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Paths Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Explore{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Career Paths
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover opportunities across diverse fields
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((path, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${path.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />

                    <div className="relative z-10">
                      <div className="text-5xl mb-4">{path.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{path.title}</h3>
                      <p className="text-white/90 mb-4">{path.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {path.jobs} jobs
                        </span>
                        <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg h-14 px-8">
                    Discover Your Path
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Shape Your Future?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of students making informed career decisions with AI-powered guidance
              </p>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg h-14 px-8 shadow-2xl">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/5 border-t border-white/10 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CareerPath Pro
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Your partner in building a successful career
              </p>
              <p className="text-sm text-gray-500">
                © 2026 CareerPath Pro. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
