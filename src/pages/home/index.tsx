import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Cloud, Database, FileText, Lock, Shield, Upload } from "lucide-react"
import { scrollToSection } from "@/lib/utils"
import { AUTH_PATH } from "@/constants/path"
import image from "@/assets/cloud-storage.png"
import { getCompanyIcon } from "@/lib/icons"
// Define TypeScript interfaces for component props
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  highlighted?: boolean
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export default function LandingPage(): React.ReactElement {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CloudStore</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link 
              to="#"
              className="text-sm font-medium hover:underline"
              onClick={(e) => handleNavClick(e, "features")}
            >
              Features
            </Link>
            <Link 
              to="#"
              className="text-sm font-medium hover:underline"
              onClick={(e) => handleNavClick(e, "how-it-works")}
            >
              How It Works
            </Link>
            <Link 
              to="#"
              className="text-sm font-medium hover:underline"
              onClick={(e) => handleNavClick(e, "pricing")}
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => navigate(AUTH_PATH.login)}>
              Log in
            </Button>
            <Button size="sm" className="cursor-pointer" onClick={() => navigate(AUTH_PATH.signup)}>Sign up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Secure Cloud Storage <br /> for All Your Files
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Store, share, and access your files from anywhere. Our platform provides secure, reliable, and easy-to-use
              cloud storage for individuals and businesses.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 cursor-pointer">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer">
                Learn More
              </Button>
            </div>
            <div className="mt-16 relative w-full max-w-4xl">
              <div className="rounded-lg border bg-background p-2 shadow-lg">
                <img
                  src={image}
                  alt="CloudStore Dashboard Preview"
                  className="rounded border w-full h-auto object-cover"
                  loading="eager"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                  width={1200}
                  height={600}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need for File Management</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a comprehensive set of features to make file storage and sharing simple and secure.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Upload className="h-10 w-10" />}
                title="Easy File Upload"
                description="Drag and drop files or use our intuitive interface to upload files of any size."
              />
              <FeatureCard
                icon={<Lock className="h-10 w-10" />}
                title="Secure Storage"
                description="End-to-end encryption ensures your files remain private and secure at all times."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10" />}
                title="File Organization"
                description="Organize your files with folders, tags, and powerful search capabilities."
              />
              <FeatureCard
                icon={<Database className="h-10 w-10" />}
                title="Automatic Backup"
                description="Never lose important files with automatic backup and version history."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10" />}
                title="Access Control"
                description="Control who can view, edit, or share your files with granular permissions."
              />
              <FeatureCard
                icon={<Cloud className="h-10 w-10" />}
                title="Cross-Platform Access"
                description="Access your files from any device, anywhere, with our web and mobile apps."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/30 w-full">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How CloudStore Works</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started in minutes with our simple three-step process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Create an Account</h3>
                <p className="text-muted-foreground">
                  Sign up for free and get instant access to basic storage features.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Your Files</h3>
                <p className="text-muted-foreground">Drag and drop files into your secure cloud storage space.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Access Anywhere</h3>
                <p className="text-muted-foreground">Access, share, and manage your files from any device, anytime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your needs, with no hidden fees.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price="Free"
                description="Perfect for personal use with essential features."
                features={["5 GB Storage", "Basic File Sharing", "Web Access", "Standard Support"]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              <PricingCard
                title="Pro"
                price="$9.99"
                period="per month"
                description="Ideal for professionals who need more space and features."
                features={[
                  "100 GB Storage",
                  "Advanced Sharing Options",
                  "Web & Mobile Access",
                  "Priority Support",
                  "File Version History",
                ]}
                buttonText="Start Free Trial"
                buttonVariant="default"
                highlighted={true}
              />
              <PricingCard
                title="Business"
                price="$24.99"
                period="per month"
                description="For teams and businesses with advanced requirements."
                features={[
                  "1 TB Storage",
                  "Team Collaboration Tools",
                  "Admin Controls",
                  "24/7 Premium Support",
                  "Advanced Security Features",
                  "API Access",
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30 w-full">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by Thousands</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our users have to say about CloudStore.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="CloudStore has completely transformed how our team manages files. The security features give us peace of mind."
                author="Sarah Johnson"
                role="Marketing Director"
              />
              <TestimonialCard
                quote="I've tried many cloud storage solutions, but CloudStore offers the best balance of features, usability, and price."
                author="Michael Chen"
                role="Freelance Designer"
              />
              <TestimonialCard
                quote="The ability to access my files from anywhere has been a game-changer for my remote work setup."
                author="Alex Rodriguez"
                role="Software Developer"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-primary/5 p-8 md:p-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of satisfied users who trust CloudStore with their important files.
              </p>
              <Button size="lg" className="px-8 cursor-pointer" onClick={() => navigate(AUTH_PATH.signup)}>
                Sign Up for Free
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required. Start with 5GB free storage.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              {getCompanyIcon()}
              <p className="text-sm text-muted-foreground">
                Secure cloud storage for all your files. Access anywhere, anytime.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CloudStore. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component implementations with TypeScript
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }): React.ReactElement => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}): React.ReactElement => {
  return (
    <Card className={`flex flex-col ${highlighted ? "border-primary shadow-lg" : ""}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground ml-1">{period}</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="w-full cursor-pointer">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }): React.ReactElement => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 text-muted-foreground">
          {[...Array(5)].map((_, i: number) => (
            <span key={i} className="text-yellow-500">
              ★
            </span>
          ))}
        </div>
        <p className="mb-4 italic">"{quote}"</p>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
