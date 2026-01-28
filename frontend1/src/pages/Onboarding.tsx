import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import {
    GraduationCap,
    Briefcase,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Brain,
    Target,
    BookOpen,
    Users
} from 'lucide-react';

interface OnboardingData {
    role: 'student' | 'professor' | null;
    academicStage: '10th_pass' | '12th_pass' | 'college' | null;
    stream: 'science_pcm' | 'science_pcb' | 'commerce' | 'arts' | null;
    targetExams: string[];
    careerInterests: string[];
}

const Onboarding = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<OnboardingData>({
        role: null,
        academicStage: null,
        stream: null,
        targetExams: [],
        careerInterests: []
    });

    const totalSteps = 4;

    const handleComplete = async () => {
        // TODO: Save onboarding data to backend
        console.log('Onboarding data:', data);
        navigate('/dashboard');
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
        else handleComplete();
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <Brain className="h-6 w-6 text-blue-400" />
                        <span className="text-lg font-bold">CareerPath Pro</span>
                    </div>
                    <div className="text-sm text-gray-400">
                        Step {step} of {totalSteps}
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <AnimatePresence mode="wait">
                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="text-center mb-12">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-5xl font-bold mb-4"
                                >
                                    Welcome to{' '}
                                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Your Career Journey
                                    </span>
                                </motion.h1>
                                <p className="text-xl text-gray-400">
                                    Let's start by understanding who you are
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { setData({ ...data, role: 'student' }); nextStep(); }}
                                    className="cursor-pointer"
                                >
                                    <Card className={`relative p-8 bg-gradient-to-br ${data.role === 'student'
                                            ? 'from-blue-600 to-blue-800 border-blue-400'
                                            : 'from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600'
                                        } border-2 transition-all duration-300 overflow-hidden`}>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl" />
                                        <div className="relative z-10">
                                            <GraduationCap className="w-16 h-16 mb-4 text-blue-400" />
                                            <h3 className="text-2xl font-bold mb-2">I'm a Student</h3>
                                            <p className="      text-gray-300">
                                                Looking for career guidance and academic roadmap
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { setData({ ...data, role: 'professor' }); nextStep(); }}
                                    className="cursor-pointer"
                                >
                                    <Card className={`relative p-8 bg-gradient-to-br ${data.role === 'professor'
                                            ? 'from-purple-600 to-purple-800 border-purple-400'
                                            : 'from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600'
                                        } border-2 transition-all duration-300 overflow-hidden`}>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl" />
                                        <div className="relative z-10">
                                            <Users className="w-16 h-16 mb-4 text-purple-400" />
                                            <h3 className="text-2xl font-bold mb-2">I'm a Professor</h3>
                                            <p className="text-gray-300">
                                                Managing student guidance for my institution
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Academic Stage */}
                    {step === 2 && data.role === 'student' && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4">
                                    What's your{' '}
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        academic stage
                                    </span>
                                    ?
                                </h2>
                                <p className="text-xl text-gray-400">This helps us personalize your journey</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { value: '10th_pass', icon: '📚', title: 'Class 10 Pass', desc: 'Choosing your stream' },
                                    { value: '12th_pass', icon: '🎓', title: 'Class 12 Pass', desc: 'Planning for college' },
                                    { value: 'college', icon: '🎯', title: 'College Student', desc: 'Building your career' }
                                ].map((stage) => (
                                    <motion.div
                                        key={stage.value}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setData({ ...data, academicStage: stage.value as any })}
                                        className="cursor-pointer"
                                    >
                                        <Card className={`relative p-8 text-center bg-gradient-to-br ${data.academicStage === stage.value
                                                ? 'from-blue-600 to-purple-600 border-blue-400'
                                                : 'from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600'
                                            } border-2 transition-all duration-300`}>
                                            {data.academicStage === stage.value && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </motion.div>
                                            )}
                                            <div className="text-5xl mb-4">{stage.icon}</div>
                                            <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                                            <p className="text-gray-300">{stage.desc}</p>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-12">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={!data.academicStage}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    Continue
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Stream Selection */}
                    {step === 3 && data.academicStage && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4">
                                    Select your{' '}
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        stream
                                    </span>
                                </h2>
                                <p className="text-xl text-gray-400">
                                    {data.academicStage === '10th_pass' && 'Which stream are you planning to choose?'}
                                    {data.academicStage === '12th_pass' && 'Which stream did you study?'}
                                    {data.academicStage === 'college' && 'Which stream did you study in 12th?'}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { value: 'science_pcm', icon: '⚛️', title: 'Science (PCM)', desc: 'Physics, Chemistry, Maths', color: 'from-blue-500 to-cyan-500' },
                                    { value: 'science_pcb', icon: '🧬', title: 'Science (PCB)', desc: 'Physics, Chemistry, Biology', color: 'from-green-500 to-emerald-500' },
                                    { value: 'commerce', icon: '💼', title: 'Commerce', desc: 'Business, Accounts, Economics', color: 'from-yellow-500 to-orange-500' },
                                    { value: 'arts', icon: '🎨', title: 'Arts', desc: 'Humanities, Social Sciences', color: 'from-purple-500 to-pink-500' }
                                ].map((stream) => (
                                    <motion.div
                                        key={stream.value}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setData({ ...data, stream: stream.value as any })}
                                        className="cursor-pointer"
                                    >
                                        <Card className={`relative p-6 text-center bg-gradient-to-br ${data.stream === stream.value
                                                ? stream.color + ' border-white/50'
                                                : 'from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600'
                                            } border-2 transition-all duration-300`}>
                                            {data.stream === stream.value && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </motion.div>
                                            )}
                                            <div className="text-4xl mb-3">{stream.icon}</div>
                                            <h3 className="text-lg font-bold mb-1">{stream.title}</h3>
                                            <p className="text-sm text-gray-300">{stream.desc}</p>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-12">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={!data.stream}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    Continue
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Goals & Interests */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4">
                                    What are your{' '}
                                    <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                        career interests
                                    </span>
                                    ?
                                </h2>
                                <p className="text-xl text-gray-400">Select 3-5 areas that excite you</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                                {[
                                    { id: 'tech', label: 'Technology', icon: '💻' },
                                    { id: 'health', label: 'Healthcare', icon: '🏥' },
                                    { id: 'business', label: 'Business', icon: '💼' },
                                    { id: 'creative', label: 'Creative Arts', icon: '🎨' },
                                    { id: 'science', label: 'Research', icon: '🔬' },
                                    { id: 'law', label: 'Law & Justice', icon: '⚖️' },
                                    { id: 'education', label: 'Education', icon: '📚' },
                                    { id: 'finance', label: 'Finance', icon: '💰' }
                                ].map((interest) => {
                                    const isSelected = data.careerInterests.includes(interest.id);
                                    return (
                                        <motion.div
                                            key={interest.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setData({
                                                    ...data,
                                                    careerInterests: isSelected
                                                        ? data.careerInterests.filter(i => i !== interest.id)
                                                        : [...data.careerInterests, interest.id]
                                                });
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <Card className={`p-4 text-center bg-gradient-to-br ${isSelected
                                                    ? 'from-green-600 to-blue-600 border-green-400'
                                                    : 'from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600'
                                                } border-2 transition-all duration-300`}>
                                                <div className="text-3xl mb-2">{interest.icon}</div>
                                                <div className="text-sm font-medium">{interest.label}</div>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between mt-12">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                                <Button
                                    onClick={handleComplete}
                                    disabled={data.careerInterests.length < 3}
                                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                                >
                                    Complete Setup
                                    <CheckCircle2 className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Onboarding;
