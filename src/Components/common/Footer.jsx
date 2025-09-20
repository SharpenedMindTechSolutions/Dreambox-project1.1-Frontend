import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import {
    Mail,
    Instagram,
    Facebook,
    Linkedin,
    Youtube,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="text-black pt-16 pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-3 space-x-3">
                            <img src={logo} className='w-12 h-12'/>
                            <span className="text-xl font-bold text-black font-special-gothic">DreamBox AI</span>
                        </div>

                        {/* Description */}
                        <p className="mb-4 text-start text-gray-800 text-sm md:text-base">
                            Transform your passion into a profession with the right roadmap and support system.                        </p>


                    </div>



                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl mb-4 font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-[#103783] transition">Home</Link></li>
                            <li><a href="#features" className="hover:text-[#103783] transition">Features</a></li>
                            <li><a href="#contact" className="hover:text-[#103783] transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-xl mb-4 font-semibold">Social Media</h4>
                        <div className="flex gap-4 flex-wrap ">
                            <a href="mailto:contact.sharpenedmind@gmail.com" className="group p-3 btn-gradient hover:scale-125  border rounded-full  transition">
                                <Mail className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://www.instagram.com/sharpened_mind_tech_solutions/" target="_blank" rel="noopener noreferrer" className="group btn-gradient  hover:scale-125 p-3 border rounded-full hover:bg-white transition">
                                <Instagram className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://www.facebook.com/sharpenedmind/" target="_blank" rel="noopener noreferrer" className="group  btn-gradient hover:scale-125  p-3 border rounded-full hover:bg-white transition">
                                <Facebook className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://in.linkedin.com/company/sharpened-mind-tech-and-solutions" target="_blank" rel="noopener noreferrer" className="group btn-gradient hover:scale-125 p-3 border rounded-full hover:bg-white transition">
                                <Linkedin className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://www.youtube.com/@sharpenedmindte" target="_blank" rel="noopener noreferrer" className="group btn-gradient hover:scale-125  p-3 border rounded-full hover:bg-white transition">
                                <Youtube className="w-4 h-4 text-white" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="mt-10 pt-5 border-t border-gray-300 text-center text-md">
                    <p>© Developed By Sharpened Mind Tech & Solutions Private Limited 2025. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
