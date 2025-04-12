import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { AccountType } from "@/constants/enum"
import { useNavigate } from "react-router-dom"
interface Plan {
    type: AccountType
    name: string
    price: number
    description: string
    features: string[]
    popular?: boolean
}

const PLANS: Plan[] = [
    {
        type: AccountType.Free,
        name: "Free Plan",
        price: 0,
        description: "Perfect for getting started with basic storage needs",
        features: [
            "1GB Storage",
            "Basic File Management",
            "Community Support",
            "Standard Upload Speed"
        ]
    },
    {
        type: AccountType.Pro,
        name: "Premium Plan",
        price: 100000,
        description: "Ideal for professionals and small businesses",
        features: [
            "10GB Storage",
            "Cloudflare R2 Support",
            "Priority Support",
            "Advanced Analytics",
            "Faster Upload Speed",
            "Custom Branding"
        ],
        popular: true
    },
    {
        type: AccountType.Plus,
        name: "Plus Plan",
        price: 200000,
        description: "For large organizations with advanced needs",
        features: [
            "50GB Storage",
            "Cloudflare R2 Support",
            "24/7 Support",
            "Custom Domain",
            "API Access",
            "Advanced Security",
            "Team Collaboration",
            "Custom Integrations"
        ]
    }
]

const PricingPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Choose the perfect plan for your needs. All plans include a 14-day free trial.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {PLANS.map((plan) => (
                                <Card
                                    key={plan.type}
                                    className={`relative ${
                                        plan.popular
                                            ? "border-primary shadow-lg"
                                            : "border-border"
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle>{plan.name}</CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                        <div className="mt-4">
                                            <span className="text-4xl font-bold">
                                                {plan.price === 0
                                                    ? "Free"
                                                    : `${plan.price.toLocaleString('vi-VN')} VND`}
                                            </span>
                                            {plan.price > 0 && (
                                                <span className="text-muted-foreground">/month</span>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-primary" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className="w-full"
                                            variant={plan.popular ? "default" : "outline"}
                                            onClick={() => navigate(`/payment?plan=${plan.type}`)}
                                        >
                                            {plan.price === 0 ? "Get Started" : "Choose Plan"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
                            <p className="text-muted-foreground mb-6">
                                Contact us for custom solutions tailored to your specific needs.
                            </p>
                            <Button variant="outline" onClick={() => navigate('/contact')}>
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingPage 