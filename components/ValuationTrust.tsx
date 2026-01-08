import { TrendingUp, Shield, Clock } from "lucide-react";

export default function ValuationTrust() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-white">
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
            <p className="text-white/80">Real-time market data and trends</p>
          </div>

          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Data-Driven Valuation
            </h3>
            <p className="text-white/80">Powered by real transactions data</p>
          </div>

          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
            <p className="text-white/80">Get your valuation in seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
}
