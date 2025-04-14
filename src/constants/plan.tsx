import { Plan } from "@/types";
import { AccountType } from "./enum";
import { Zap, Shield, Users } from "lucide-react";

export const PLANS: Plan[] = [
    {
        type: AccountType.Pro,
        name: "Pro Plan",
        price: 50000,
        description: "Ideal for professionals and small businesses",
        features: [
            {
                title: "Storage & Performance",
                items: ["150GB Storage", "Cloudflare R2 Support", "Faster Download Speed"],
                icon: <Zap className="h-5 w-5" />
            },
            {
                title: "Support & Analytics",
                items: ["Priority Support", "Advanced Analytics", "Custom Branding"],
                icon: <Shield className="h-5 w-5" />
            }
        ]
    },
    {
        type: AccountType.Plus,
        name: "Plus Plan",
        price: 150,
        description: "For large organizations with advanced needs",
        features: [
            {
                title: "Storage & Performance",
                items: ["50GB Storage", "Cloudflare R2 Support", "Maximum Download Speed"],
                icon: <Zap className="h-5 w-5" />
            },
            {
                title: "Support & Security",
                items: ["24/7 Support", "Advanced Security", "Custom Domain"],
                icon: <Shield className="h-5 w-5" />
            },
            {
                title: "Team & Integration",
                items: ["Team Collaboration", "API Access", "Custom Integrations"],
                icon: <Users className="h-5 w-5" />
            }
        ]
    }
]