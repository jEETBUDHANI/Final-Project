import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

interface OnboardingTourProps {
    run?: boolean;
    onComplete?: () => void;
}

const OnboardingTour = ({ run = false, onComplete }: OnboardingTourProps) => {
    const [runTour, setRunTour] = useState(false);

    useEffect(() => {
        // Check if user has completed the tour
        const tourCompleted = localStorage.getItem('tourCompleted');
        if (!tourCompleted && run) {
            setRunTour(true);
        }
    }, [run]);

    const steps: Step[] = [
        {
            target: 'body',
            content: (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Welcome to CareerPath Pro! 🎉
                    </h2>
                    <p className="text-gray-700">
                        Let's take a quick tour to help you get started on your career journey.
                    </p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: 'body',
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">📊 Step 1: Take Assessments</h3>
                    <p className="text-gray-700">
                        Start by completing our comprehensive assessments to understand your personality, aptitude, and interests. Click on "Take Assessment" cards on your dashboard.
                    </p>
                </div>
            ),
            placement: 'center',
        },
        {
            target: 'body',
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">💼 Step 2: Explore Careers</h3>
                    <p className="text-gray-700">
                        Discover career matches based on your assessment results. See salary ranges, demand, and growth prospects for 20+ careers.
                    </p>
                </div>
            ),
            placement: 'center',
        },
        {
            target: 'body',
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">🗺️ Step 3: Build Your Roadmap</h3>
                    <p className="text-gray-700">
                        Get a personalized step-by-step roadmap to achieve your career goals. Navigate to "View Roadmap" to create yours.
                    </p>
                </div>
            ),
            placement: 'center',
        },
        {
            target: 'body',
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">📈 Step 4: Track Progress</h3>
                    <p className="text-gray-700">
                        Monitor your growth and readiness over time with beautiful charts and timelines. Complete assessments to unlock progress tracking.
                    </p>
                </div>
            ),
            placement: 'center',
        },
        {
            target: 'body',
            content: (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        You're All Set! 🚀
                    </h2>
                    <p className="text-gray-700">
                        Start by taking your first assessment to unlock personalized career recommendations!
                    </p>
                </div>
            ),
            placement: 'center',
        },
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;

        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            localStorage.setItem('tourCompleted', 'true');
            setRunTour(false);
            if (onComplete) {
                onComplete();
            }
        }
    };

    return (
        <Joyride
            steps={steps}
            run={runTour}
            continuous
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#8B5CF6',
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: '12px',
                    padding: '20px',
                },
                buttonNext: {
                    backgroundColor: '#8B5CF6',
                    borderRadius: '8px',
                    padding: '8px 16px',
                },
                buttonBack: {
                    color: '#6B7280',
                },
                buttonSkip: {
                    color: '#6B7280',
                },
            }}
            locale={{
                back: 'Back',
                close: 'Close',
                last: 'Finish',
                next: 'Next',
                skip: 'Skip Tour',
            }}
        />
    );
};

export default OnboardingTour;
