import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import useAuthStore from "../store/useAuthStore";

const BookingPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  console.log("Car id :", carId);
  
  // Try to get car data from navigation state first (if passed)
  // Fallback to mock/fetch would happen here in a real app
  const [car, setCar] = useState(location.state?.car || null);
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock car if not passed (for direct URL access testing)
  useEffect(() => {
    if (!car) {
        // In a real app, fetchById(carId) here.
        // For now, we simulate a car for demonstration if state is missing
        setCar({
            id: carId,
            make: "Premium",
            model: "Car Selection",
            image_url: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2536&auto=format&fit=crop",
            price_per_day: 50,
            location: "Downtown",
            rating: 4.8
        });
    }
  }, [car, carId]);

  useEffect(() => {
    if (startDate && endDate && car) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (daysDiff > 0) {
            const price = parseInt(car.price_per_day) || 50; // Handle mock price
            setTotalCost(daysDiff * price);
        } else {
            setTotalCost(0);
        }
    }
  }, [startDate, endDate, car]);

  const handleBooking = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        setIsSuccess(true);
    }, 1500);
  };

  if (!car) return <div className="pt-32 text-center">Loading car details...</div>;

  if (isSuccess) {
    return (
        <Container className="pt-32 pb-20 min-h-screen flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg border border-green-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-8">
                    Your reservation for the <span className="font-semibold text-gray-900">{car.make} {car.model}</span> has been placed successfully.
                    We have sent a confirmation email to {user?.email || "your email"}.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={() => navigate("/dashboard")}>
                        Go to Dashboard
                    </Button>
                    <Button variant="primary" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                </div>
            </div>
        </Container>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-28 pb-20 transition-colors duration-300">
      <Container>
        <div className="max-w-6xl mx-auto">
             <button 
                onClick={() => navigate(-1)} 
                className="mb-8 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to browsing
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Car Details Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                        <img 
                            src={car.image_url} 
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{car.make} {car.model}</h1>
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        {car.location || "Available for pickup"}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${car.price_per_day || 50}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100 dark:border-gray-800">
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transmission</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{car.transmission || "Automatic"}</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Passngers</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{car.passengers || "5 Seats"}</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fuel Type</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{car.fuel || "Petrol"}</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                                    <p className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                                        {car.rating || 4.5}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Experience the thrill of driving this {car.make} {car.model}. Perfect for weekend getaways or business trips, this vehicle offers a blend of performance and comfort.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-800 p-6 sticky top-28 transition-colors duration-300">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Book this Car</h2>
                        
                        <form onSubmit={handleBooking} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pick-up Date</label>
                                <input 
                                    type="date" 
                                    required 
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]} // Min today
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Drop-off Date</label>
                                <input 
                                    type="date" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || new Date().toISOString().split('T')[0]} 
                                />
                            </div>

                            {totalCost > 0 && (
                                <div className="py-4 border-t border-b border-gray-100 dark:border-gray-800 space-y-3">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Rate</span>
                                        <span>${car.price_per_day} / day</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Duration</span>
                                        <span>{totalCost / (parseInt(car.price_per_day) || 50)} days</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <span>Total</span>
                                        <span className="text-indigo-600 dark:text-indigo-400">${totalCost}</span>
                                    </div>
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                variant={totalCost > 0 ? "primary" : "secondary"} 
                                className="w-full"
                                disabled={totalCost <= 0}
                            >
                                {totalCost > 0 ? "Pay Now" : "Select Dates"}
                            </Button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                You won't be charged yet. Free cancellation up to 24h before.
                            </p>
                        </form>
                    </div>
                </div>
             </div>
        </div>
      </Container>
    </div>
  );
};

export default BookingPage;
