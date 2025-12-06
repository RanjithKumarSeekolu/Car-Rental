import React from "react";
import HostCarForm from "../features/cars/components/HostCarForm";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import useAuthStore from "../store/useAuthStore";
import AuthContainer from "../features/auth/components/AuthContainer";

const CarHost = () => {
  const { user } = useAuthStore();
  console.log("user = ",user);

  return (
    <div className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <ScrollAnimation variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}>
            <div className="space-y-6 sticky top-32">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Earn money by <span className="text-blue-800">hosting</span> your car
              </h1>
              <p className="text-lg text-gray-600">
                Join our community of car hosts and start earning. It's safe, simple, and secure. You control the availability and price.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Earn Extra Income</h3>
                    <p className="text-gray-500">Turn your car into a earning asset.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-700">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                   </svg>
                  </div>
                  <div>
                     <h3 className="font-bold text-lg">Fully Secured</h3>
                     <p className="text-gray-500">We verify all renters to ensure safety.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
             {user ? <HostCarForm /> : <AuthContainer />}
          </ScrollAnimation>

        </div>
      </div>
    </div>
  );
};

export default CarHost;
