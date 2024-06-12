import Image from 'next/image';
import React from 'react';
import { FaUserPlus, FaUserCog, FaShareAlt } from 'react-icons/fa';

const HowItWorksSection = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-extrabold text-center mb-16 gradient-text">How It Works</h2>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-12">
                        <div className="flex items-center space-x-6">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-full shadow-lg border-2 border-white">
                                <FaUserPlus className="text-5xl" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-2 gradient-text">Sign Up</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">Create your devLink account to get started. It's quick and easy!</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-full shadow-lg border-2 border-white">
                                <FaUserCog className="text-5xl" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-2 gradient-text">Customize Profile</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">Personalize your profile to showcase your expertise and skills.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-full shadow-lg border-2 border-white">
                                <FaShareAlt className="text-5xl" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-2 gradient-text">Start Sharing</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">Generate and share your unique links to connect with others.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center justify-center">
                        <Image height={600} width={600} src="/assets/images/illustration_start_sharing.svg" alt="Visual Graphic" className="rounded-lg max-w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
