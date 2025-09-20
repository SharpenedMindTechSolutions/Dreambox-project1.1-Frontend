import React from "react";
import banner from '../../assets/banner.jpg';

const Hero = () => {
    return (
        <div
            className="relative w-full px-4 mx-auto min-h-screen overflow-hidden"
            style={{
                backgroundImage: `url(${banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            id="home"
        >
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute star-glow"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Hero Content */}
            <div className="flex flex-col justify-center items-center min-h-screen relative z-20">
                <div className="flex flex-col justify-center items-center gap-4 text-center max-w-3xl mx-auto mt-32 pb-12">
                    <h1 className="font-display font-special-gothic text-white title-gradient text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ">
                        We Build <br /> Your Career
                    </h1>

                    <p className="text-xl text-white">
                        Transform your passion into a profession with the right roadmap and support system.
                    </p>

                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={() => {
                                const token = localStorage.getItem("token");
                                window.location.href = token ? `/dashboard/${token}` : "/login";
                            }}
                            className="group btn-gradient inline-flex gap-2 items-center rounded-full duration-200 ease-in-out text-sm px-6 py-4 hover:text-white border-none hover:scale-95"
                        >
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
