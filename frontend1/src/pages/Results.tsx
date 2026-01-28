import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { predictionApi } from '@/services/api';
import { RIASEC_TYPES, RIASECCode, RIASECScores } from '@/lib/constants';
import { Brain, ArrowLeft, Download, Share2, RotateCcw, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { format } from 'date-fns';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface TestResult {
  id: number;
  personality_type: RIASECCode;
  scores: RIASECScores;
  recommendations: {
    personality_type: string;
    personality_name: string;
    description: string;
    mcq_careers: string[];
    ml_courses: { course: string; confidence: number }[];
  };
  created_at: string;
}

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      if (!id) return;
      try {
        const response = await predictionApi.getResultById(id);
        setResult(response.result);
      } catch (error) {
        console.error('Failed to fetch result:', error);
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <header className="border-b bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">CareerPath AI</span>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="mb-8 h-12 w-64" />
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </main>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const dominantType = RIASEC_TYPES[result.personality_type];

  // Prepare chart data
  const chartData = Object.entries(result.scores).map(([key, value]) => ({
    subject: RIASEC_TYPES[key as RIASECCode].name,
    value: value,
    fullMark: 12,
  }));

  // Career icons mapping
  const careerIcons: Record<string, string> = {
    'Artist': '🎨',
    'Writer': '✍️',
    'Designer': '🎨',
    'Musician': '🎵',
    'Architect': '🏛️',
    'Engineer': '⚙️',
    'Scientist': '🔬',
    'Doctor': '👨‍⚕️',
    'Teacher': '👨‍🏫',
    'Counselor': '🤝',
    'Entrepreneur': '💼',
    'Manager': '📊',
    'Lawyer': '⚖️',
    'Accountant': '📈',
    'Nurse': '👩‍⚕️',
    'Mechanic': '🔧',
    'Carpenter': '🪚',
    'Researcher': '📚',
    'Data Analyst': '📊',
    'Professor': '🎓',
    'Social Worker': '💛',
    'HR Manager': '👥',
    'Sales Director': '📈',
    'CEO': '🏢',
    'Banker': '🏦',
    'Administrator': '📋',
    'Pilot': '✈️',
    'Electrician': '⚡',
    'Auditor': '📝',
    'Secretary': '📁',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">CareerPath AI</span>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Trophy className="h-4 w-4" />
            Assessment Complete
          </div>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Your Personality Type: <span className="text-gradient">{dominantType.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Completed on {format(new Date(result.created_at), 'MMMM d, yyyy')} at {format(new Date(result.created_at), 'h:mm a')}
          </p>
        </div>

        {/* Main Results Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Personality Type Card */}
          <Card className="overflow-hidden">
            <div className="gradient-primary p-6 text-center text-primary-foreground">
              <div className="mb-4 text-6xl">{dominantType.icon}</div>
              <h2 className="text-2xl font-bold">{dominantType.name}</h2>
              <p className="text-sm text-primary-foreground/80">Type {result.personality_type}</p>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{dominantType.description}</p>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Your RIASEC Profile
              </CardTitle>
              <CardDescription>Scores across all personality dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 12]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Recommended Careers
            </CardTitle>
            <CardDescription>Top career paths based on your personality type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {result.recommendations.mcq_careers.map((career, index) => (
                <div
                  key={career}
                  className="animate-fade-in flex flex-col items-center rounded-xl border bg-card p-4 text-center transition-all hover-lift"
                  style={{ animationDelay: `${index * 0.1} s` }}
                >
                  <div className="mb-3 text-4xl">{careerIcons[career] || '💼'}</div>
                  <h3 className="font-semibold">{career}</h3>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Recommended Courses
            </CardTitle>
            <CardDescription>Top courses predicted by our ML model with confidence scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.recommendations.ml_courses.map((course, index) => (
                <div
                  key={course.course}
                  className="animate-fade-in flex flex-col gap-3 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ animationDelay: `${index * 0.1} s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{course.course}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:w-48">
                    <Progress value={course.confidence} className="h-2 flex-1" />
                    <span className="w-14 text-right text-sm font-medium text-primary">
                      {course.confidence.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/test">
            <Button className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Take Another Test
            </Button>
          </Link>
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Download className="h-4 w-4" />
            Download Results
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              navigator.share?.({
                title: 'My Career Assessment Results',
                text: `I'm a ${dominantType.name} personality type! Check out CareerPath AI for your own career guidance.`,
                url: window.location.href,
              });
            }}
          >
            <Share2 className="h-4 w-4" />
            Share Results
          </Button >
        </div >
      </main >
    </div >
  );
};

export default Results;
