import Image from "next/image";
import { FlightSearchForm } from "../components/FlightSearch";

export default function Home() {
    return (
        <section className="relative font-sans grid items-center justify-items-center min-h-screen  bg-gray-900">
            <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop"
                alt="Airplane in sky"
                className="  absolute inset-0 z-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 text-white mb-28">

                <div className=" max-w-3xl mx-auto mb-8">
                    <h1 className="mb-6 text-4xl md:text-6xl">
                        Find Your Perfect Flight
                    </h1>
                    <p className="text-lg md:text-xl text-muted mb-8">
                        Search and book flights to destinations worldwide with the best prices guaranteed.
                        Your journey starts here.
                    </p>
                </div>
                <FlightSearchForm />




            </div>

        </section>
    );
}
