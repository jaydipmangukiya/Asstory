import { benefits } from "@/lib/siteContent";
import { Card, CardContent } from "./ui/card";

export function BenefitsValuationService() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Valuation Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive property valuation backed by data and trusted by institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            return (
              <Card key={index} className="">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-emerald-600/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BenefitsValuationService;
