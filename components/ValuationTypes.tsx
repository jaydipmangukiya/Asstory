import { benefits, valuationTypes } from "@/lib/siteContent";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle } from "lucide-react";

export function ValuationTypes() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Valuation Services for Every Property Type
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From residential homes to commercial complexes, we provide accurate valuations tailored to your property.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {valuationTypes.map((type, index) => (
                        <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-emerald-600/10 flex items-center justify-center flex-shrink-0">
                                        <type.icon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                                        <p className="text-muted-foreground">{type.description}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {type.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ValuationTypes;
