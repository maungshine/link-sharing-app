import React from 'react';
import { FaCog, FaPen, FaShare } from 'react-icons/fa';

const FeatureSection = () => {
    const features = [
        {
            title: 'Create Personalized Links',
            description: `Generate unique links for your portfolio, social media profiles, and other online assets. Customize the appearance to match your branding.`,
            color: 'bg-blue-200',
            textColor: 'text-blue-800',
            gradientFrom: 'from-blue-400',
            gradientTo: 'to-blue-500',
            icon: <FaPen className='text-6xl mb-6 text-blue-800 inline-block' />,
            url: '#',
        },
        {
            title: 'Manage Your Links Effortlessly',
            description: `Easily add, remove, and update your links from a centralized dashboard. Keep your online presence organized and up-to-date.`,
            color: 'bg-green-200',
            textColor: 'text-green-800',
            gradientFrom: 'from-green-400',
            gradientTo: 'to-green-500',
            icon: <FaCog className='text-6xl mb-6 text-green-800 inline-block' />,
            url: '#',
        },
        {
            title: 'Share Your Links with Confidence',
            description: `Share your links with your audience confidently. Our platform ensures reliable and secure link sharing, helping you reach your audience effectively.`,
            color: 'bg-purple-200',
            textColor: 'text-purple-800',
            gradientFrom: 'from-purple-400',
            gradientTo: 'to-purple-500',
            icon: <FaShare className='text-6xl mb-6 text-purple-800 inline-block' />,
            url: '#',
        },
    ];

    return (
        <section className="relative py-24 lg:py-32P">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-16">
                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Discover Powerful Features</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <a
                            key={index}
                            href={feature.url}
                            className={`rounded-xl shadow-2xl overflow-hidden ${feature.color} transition duration-300 transform hover:shadow-3xl hover:scale-105 flex flex-col justify-between`}
                            style={{ minWidth: '320px', minHeight: '320px', cursor: 'pointer' }}
                        >
                            <div className="p-8 text-center">
                                {feature.icon}
                                <h3 className={`text-2xl font-semibold mb-4 ${feature.textColor}`}>{feature.title}</h3>
                                <p className={`text-base ${feature.textColor}`}>{feature.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="border-t border-gray-300 mt-16 py-12 text-center">
                    <blockquote className="text-xl italic text-gray-800 mx-auto max-w-2xl">
                    &quot;Our platform empowers you to showcase your work and connect with your audience like never before.&quot;
                    </blockquote>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
