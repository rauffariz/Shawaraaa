
import React, { useState } from 'react';
import { ShaCommunity, ShaMarket, ShaPoint, ShaUpdate } from './components/screens';
import { TanyaSha } from './components/TanyaSha';
import type { ActiveScreen } from './types';

// SVG Icon Components defined within App.tsx to reduce file count
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        {isActive && <circle cx="12" cy="20" r="2" fill="currentColor" />}
    </svg>
);

const NewsIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 3h2m-4 3h2m-4 3h2" />
        {isActive && <circle cx="12" cy="20" r="2" fill="currentColor" />}
    </svg>
);

const MarketIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        {isActive && <circle cx="12" cy="20" r="2" fill="currentColor" />}
    </svg>
);

const PointsIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01v.01M12 12v4m0 4v-4m-4-4H4m4 4H4m4-4h4m-4 4h4" />
        {isActive && <circle cx="12" cy="20" r="2" fill="currentColor" />}
    </svg>
);


const App: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState<ActiveScreen>('Community');

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Community':
                return <ShaCommunity />;
            case 'Update':
                return <ShaUpdate />;
            case 'Market':
                return <ShaMarket />;
            case 'Point':
                return <ShaPoint />;
            default:
                return <ShaCommunity />;
        }
    };

    const BottomNav: React.FC = () => {
        const navItems: { screen: ActiveScreen; label: string; icon: React.ReactNode }[] = [
            { screen: 'Community', label: 'Community', icon: <HomeIcon isActive={activeScreen === 'Community'} /> },
            { screen: 'Update', label: 'ShaUpdate', icon: <NewsIcon isActive={activeScreen === 'Update'} /> },
            { screen: 'Market', label: 'ShaMarket', icon: <MarketIcon isActive={activeScreen === 'Market'} /> },
            { screen: 'Point', label: 'ShaPoint', icon: <PointsIcon isActive={activeScreen === 'Point'} /> },
        ];

        return (
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center shadow-lg md:hidden">
                {navItems.map((item) => (
                    <button
                        key={item.screen}
                        onClick={() => setActiveScreen(item.screen)}
                        className={`flex flex-col items-center justify-center text-xs w-full transition-colors duration-200 ${
                            activeScreen === item.screen ? 'text-green-600' : 'text-slate-500 hover:text-green-500'
                        }`}
                    >
                        {item.icon}
                        <span className="mt-1">{item.label}</span>
                    </button>
                ))}
            </div>
        );
    };


    return (
        <div className="font-sans antialiased text-slate-800">
             <div className="max-w-7xl mx-auto">
                <header className="sticky top-0 bg-green-600 text-white p-4 shadow-md z-10 flex items-center">
                    <img src="https://picsum.photos/seed/shawara-logo/40/40" alt="Shawara Logo" className="rounded-full mr-3"/>
                    <h1 className="text-2xl font-bold">Shawara</h1>
                </header>

                <main className="pb-20 md:pb-4">
                    {renderScreen()}
                </main>
                
                <TanyaSha />
                <BottomNav />
            </div>
        </div>
    );
};

export default App;
