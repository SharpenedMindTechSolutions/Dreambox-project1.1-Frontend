
import React from 'react'
import { Loader, Wand2 } from "lucide-react";

function DreamInputForm({ careerAspiration,
    setCareerAspiration,
    industryField,
    setIndustryField,
    handleSubmit,
    isLoading,
    title, }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="p-3 max-w-4xl w-full text-center flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight p-6">
                    {title}
                </h1>

                <form onSubmit={handleSubmit} className="relative w-full max-w-3xl">
                    <div className="flex flex-col bg-white rounded-2xl w-full relative transition-all duration-300 p-4 space-y-4">
                        {/* Career Aspiration */}
                        <div className="flex flex-col items-start w-full relative pb-2">
                            <label className="text-normal font-semibold text-black mb-1">
                                Career Aspiration
                            </label>
                            <input
                                type="text"
                                value={careerAspiration}
                                onChange={(e) => setCareerAspiration(e.target.value)}
                                placeholder="Describe your dream career..."
                                className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none md:text-lg focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            />
                        </div>

                        {/* Industry Field */}
                        <div className="flex flex-col items-start w-full relative pb-2">
                            <label className="text-normal font-semibold text-black mb-1">
                                Industry Field / Job
                            </label>
                            <input
                                type="text"
                                value={industryField}
                                onChange={(e) => setIndustryField(e.target.value)}
                                placeholder="e.g., Technology, Healthcare, Finance..."
                                className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none md:text-lg focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end w-full">
                            <button
                                type="submit"
                                disabled={
                                    isLoading || !careerAspiration.trim() || !industryField.trim()
                                }
                                aria-label="Submit dream"
                                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white 
                  font-medium rounded-lg shadow hover:bg-blue-700 
                  transition duration-200 ml-1  ${isLoading ? "pointer-events-none" : ""
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        <span>Generate</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DreamInputForm