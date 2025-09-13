
import React from 'react';
import type { Article, CommunityPost, Course, DonationCampaign, MarketData, PointTransaction } from '../types';

// Mock Data
const MOCK_MARKET_DATA: MarketData[] = [
    { name: 'Jan', price: 12.5 },
    { name: 'Feb', price: 13.2 },
    { name: 'Mar', price: 13.0 },
    { name: 'Apr', price: 14.5 },
    { name: 'May', price: 15.1 },
    { name: 'Jun', price: 14.8 },
    { name: 'Jul', price: 15.5 },
];

const MOCK_NEWS_DATA: Article[] = [
    { id: 1, title: "Indonesia Luncurkan Bursa Karbon, Potensi Ekonomi Hijau Menggeliat", source: "Tempo.co", time: "2 jam lalu", image: "https://picsum.photos/seed/news1/400/200", summary: "Langkah maju dalam perdagangan karbon diharapkan dapat menarik investasi dan mendukung target emisi nasional."},
    { id: 2, title: "Investasi Syariah Tumbuh Pesat di Sektor Energi Terbarukan", source: "Katadata", time: "5 jam lalu", image: "https://picsum.photos/seed/news2/400/200", summary: "Minat investor pada produk keuangan syariah yang berfokus pada green projects meningkat tajam di kuartal ini."},
    { id: 3, title: "Petani Sawit di Riau Mulai Adopsi Praktik Berkelanjutan untuk Kredit Karbon", source: "Kompas", time: "1 hari lalu", image: "https://picsum.photos/seed/news3/400/200", summary: "Program edukasi dan insentif mendorong petani untuk mengelola lahan secara lebih ramah lingkungan."},
];

const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
    { id: 1, author: "Ahmad Subarjo", avatar: "https://picsum.photos/seed/avatar1/40/40", content: "Baru saja menyelesaikan modul pertama di ShaEdu tentang penyerapan karbon. Sangat informatif! #GoGreen", likes: 23, comments: 5 },
    { id: 2, author: "Siti Aminah", avatar: "https://picsum.photos/seed/avatar2/40/40", content: "Alhamdulillah, berhasil membeli token karbon pertama saya melalui ShaMarket. Ikut berkontribusi untuk lingkungan.", image: "https://picsum.photos/seed/post2/400/300", likes: 55, comments: 12 },
];

const MOCK_COURSES: Course[] = [
    { id: 1, title: "Dasar-Dasar Kredit Karbon", instructor: "Dr. Budi Santoso", duration: "1j 30m", thumbnail: "https://picsum.photos/seed/course1/200/120" },
    { id: 2, title: "Pengelolaan Lahan Sawit Berkelanjutan", instructor: "Prof. Rina Wijaya", duration: "2j 15m", thumbnail: "https://picsum.photos/seed/course2/200/120" },
    { id: 3, title: "Menyerap Karbon Maksimal dari Lahan Anda", instructor: "Ir. Joko Prasetyo", duration: "1j 45m", thumbnail: "https://picsum.photos/seed/course3/200/120" },
];

const MOCK_DONATIONS: DonationCampaign[] = [
    { id: 1, title: "Penanaman 1000 Pohon di Lahan Kritis", description: "Bantu kami menghijaukan kembali area bekas tambang di Kalimantan.", goal: 50000000, raised: 32500000, image: "https://picsum.photos/seed/donation1/300/150" },
    { id: 2, title: "Sumur Bor untuk Petani Tadah Hujan", description: "Infak produktif untuk menyediakan sumber air bagi petani di musim kemarau.", goal: 75000000, raised: 45000000, image: "https://picsum.photos/seed/donation2/300/150" },
];

const MOCK_POINTS: PointTransaction[] = [
    { id: 1, description: "Referral: Budi Hartono", points: 500, date: "2024-07-20" },
    { id: 2, description: "Pembelian Token Karbon", points: 150, date: "2024-07-19" },
    { id: 3, description: "Penukaran Token", points: -1000, date: "2024-07-18" },
];

// Reusable SectionHeader Component
const SectionHeader: React.FC<{ title: string; onSeeAll?: () => void }> = ({ title, onSeeAll }) => (
    <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        {onSeeAll && <button className="text-sm font-semibold text-green-600 hover:text-green-700">Lihat Semua</button>}
    </div>
);

// Individual Screen Components

export const ShaEdu: React.FC = () => (
    <div className="py-6 bg-slate-100">
        <SectionHeader title="ShaEdu" onSeeAll={() => {}}/>
        <div className="flex overflow-x-auto space-x-4 px-4 pb-4 custom-scrollbar">
            {MOCK_COURSES.map(course => (
                <div key={course.id} className="flex-shrink-0 w-52 bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-24 object-cover" />
                    <div className="p-3">
                        <h3 className="font-semibold text-sm truncate">{course.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{course.instructor}</p>
                        <p className="text-xs text-slate-500 mt-1">{course.duration}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const ShaDaqah: React.FC = () => (
    <div className="py-6">
        <SectionHeader title="ShaDaqah" onSeeAll={() => {}}/>
        <div className="px-4 space-y-4">
            {MOCK_DONATIONS.map(campaign => (
                <div key={campaign.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={campaign.image} alt={campaign.title} className="w-full h-32 object-cover"/>
                    <div className="p-4">
                        <h3 className="font-bold">{campaign.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{campaign.description}</p>
                        <div className="mt-3">
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                                <span className="font-semibold text-green-700">Rp {campaign.raised.toLocaleString('id-ID')}</span>
                                <span className="text-slate-500">dari Rp {campaign.goal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Infak Sekarang
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export const ShaCommunity: React.FC = () => (
    <div className="bg-slate-50">
        <ShaEdu />
        <ShaDaqah />
        <div className="py-6 bg-slate-50">
            <SectionHeader title="ShaCommunity Feed"/>
            <div className="px-4 space-y-4">
            {MOCK_COMMUNITY_POSTS.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center mb-3">
                        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="font-bold">{post.author}</p>
                        </div>
                    </div>
                    <p className="text-slate-700 mb-3">{post.content}</p>
                    {post.image && <img src={post.image} alt="Post content" className="rounded-lg w-full object-cover max-h-64" />}
                    <div className="flex justify-around text-slate-500 mt-4 pt-2 border-t">
                        <button className="flex items-center space-x-2 hover:text-green-600"><p>{post.likes} Suka</p></button>
                        <button className="flex items-center space-x-2 hover:text-green-600"><p>{post.comments} Komentar</p></button>
                        <button className="flex items-center space-x-2 hover:text-green-600"><p>Bagikan</p></button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
);

export const ShaUpdate: React.FC = () => (
    <div className="p-4 space-y-4">
        {MOCK_NEWS_DATA.map((article, index) => (
            <div key={article.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${index === 0 ? 'flex flex-col' : 'flex'}`}>
                <img src={article.image} alt={article.title} className={index === 0 ? 'w-full h-48 object-cover' : 'w-24 h-24 object-cover'} />
                <div className="p-4 flex-1">
                    <h3 className="font-bold text-lg leading-tight">{article.title}</h3>
                    {index === 0 && <p className="text-sm text-slate-600 mt-2">{article.summary}</p>}
                    <p className="text-xs text-slate-500 mt-2">{article.source} &bull; {article.time}</p>
                </div>
            </div>
        ))}
    </div>
);

export const ShaMarket: React.FC = () => {
    const [rechartsLoaded, setRechartsLoaded] = React.useState(false);

    React.useEffect(() => {
        if ((window as any).Recharts) {
            setRechartsLoaded(true);
        } else {
            const intervalId = setInterval(() => {
                if ((window as any).Recharts) {
                    setRechartsLoaded(true);
                    clearInterval(intervalId);
                }
            }, 100);
            return () => clearInterval(intervalId);
        }
    }, []);

    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } =
        rechartsLoaded ? (window as any).Recharts : ({} as any);
    
    return (
        <div className="p-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-slate-500">Harga Karbon (SHA/ton)</p>
                        <p className="text-3xl font-bold">Rp 225.750</p>
                        <p className="text-green-600 font-semibold">+2.5% (24j)</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Market Cap</p>
                        <p className="text-lg font-bold">Rp 15.3 T</p>
                    </div>
                </div>
                <div className="h-64 mt-4 -ml-4">
                    {rechartsLoaded ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOCK_MARKET_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} domain={['dataMin - 1', 'dataMax + 1']}/>
                                <Tooltip />
                                <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} dot={{ r: 4, fill: '#16a34a' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <p className="text-slate-500">Loading chart data...</p>
                        </div>
                    )}
                </div>
                <div className="mt-6 flex space-x-4">
                    <button className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">Beli</button>
                    <button className="flex-1 bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors">Jual</button>
                </div>
            </div>
        </div>
    );
};

export const ShaPoint: React.FC = () => (
    <div className="p-4">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-lg">Total Poin Anda</p>
            <p className="text-5xl font-bold my-2">1.250</p>
            <p className="text-sm opacity-90">Setara dengan ~0.005 ton Karbon</p>
            <button className="mt-4 bg-white text-green-600 font-bold py-2 px-6 rounded-full hover:bg-slate-100 transition-colors">Tukarkan Poin</button>
        </div>

        <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">Riwayat Poin</h3>
            <div className="space-y-3">
                {MOCK_POINTS.map(tx => (
                    <div key={tx.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{tx.description}</p>
                            <p className="text-sm text-slate-500">{tx.date}</p>
                        </div>
                        <p className={`font-bold text-lg ${tx.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {tx.points > 0 ? `+${tx.points}` : tx.points}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
