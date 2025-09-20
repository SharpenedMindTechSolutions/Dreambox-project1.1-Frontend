import React from "react";
import {
  FolderKanban,
  Database,
  Headphones,
  BarChart3,
} from "lucide-react";

const features = [

  {
    icon: <FolderKanban className="w-6 h-6" />,
    title: "Unlimited Dreams",
    description: "Create as many dreams as you need.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Unlimited storage",
    description: "Store all your files and assets in one place.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Priority support",
    description: "Get priority support for all your needs.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Dreams Download",
    description: "Get pdf Download Options",
  },

];

const Features = () => {
  return (
    <section className=" pt-32 pb-32" id="features">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-special-gothic text-black text-center p-2">
            Features
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg text-center  mt-3 mb-10 text-gray-800 max-w-xl mx-auto ">
            Explore the wide range of powerful features that our product offers. From advanced analytics to seamless integrations, we have everything you need to succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 p-6 rounded-lg bg-slate-100 shadow-sm hover:bg-blue-700 transition-colors duration-300"
            >
              <div className="p-3 rounded-full bg-gray-200 text-dark group-hover:text-black transition-colors duration-300">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
