import React from "react";

const GetStartedSection = () => {
  return (
    <section className="bg-base-100  py-10 md:px-4">
      <div className="container mx-auto px-4 py-10 rounded-3xl">
        <div className="max-w-2xl flex flex-col justify-center items-center mx-auto">
          <div className="flex flex-col gap-3 max-w-3xl items-center text-center mx-auto">
            <h2 className="text-4xl lg:text-5xl font-display text-title font-special-gothic">
              Ready to get started?
            </h2>
            <p className="text-base text-gray-700 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              similique
            </p>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                   window.location.href = `/dashboard/${token}`;
                  } else {
                    window.location.href = "/login";
                  }
                }}
                className="group inline-flex gap-2 items-center rounded-full duration-200 ease-in-out text-sm px-6 py-4 bg-blue-600 text-white hover:bg-transparent  hover:text-black border  hover:border-blue-600  hover:scale-95"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
