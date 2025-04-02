import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  Shield, 
  Zap, 
  Cloud, 
  Image as ImageIcon,
  ArrowRight,
  CheckCircle2,
  FileText,
  FolderOpen,
  Users
} from 'lucide-react'

export default function HomePage() {
    const navigate = useNavigate()
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="relative text-center space-y-8">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Store Your Files
            <span className="text-primary block">With Confidence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the future of file storage. Fast, secure, and designed for your needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
          <div className="space-y-2 animate-fade-up" style={{animationDelay: '100ms'}}>
            <div className="text-3xl font-bold text-primary animate-count-up" data-value="10000">
              10K+
            </div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="space-y-2 animate-fade-up" style={{animationDelay: '200ms'}}>
            <div className="text-3xl font-bold text-primary animate-count-up" data-value="1000000">
              1M+
            </div>
            <div className="text-sm text-muted-foreground">Files Stored</div>
          </div>
          <div className="space-y-2 animate-fade-up" style={{animationDelay: '300ms'}}>
            <div className="text-3xl font-bold text-primary animate-count-up" data-value="99.9">
              99.9%
            </div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="space-y-2 animate-fade-up" style={{animationDelay: '400ms'}}>
            <div className="text-3xl font-bold text-primary animate-pulse">
              24/7
            </div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to store and manage your files efficiently
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group space-y-4 text-center p-8 rounded-xl border bg-card hover:border-primary/50 transition-colors">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Easy Upload</h3>
            <p className="text-muted-foreground">
              Drag and drop or click to upload your files instantly
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Multiple file upload
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Progress tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Resume support
              </li>
            </ul>
          </div>

          <div className="group space-y-4 text-center p-8 rounded-xl border bg-card hover:border-primary/50 transition-colors">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Secure Storage</h3>
            <p className="text-muted-foreground">
              Your files are encrypted and stored with enterprise-grade security
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                End-to-end encryption
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Secure file sharing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Access control
              </li>
            </ul>
          </div>

          <div className="group space-y-4 text-center p-8 rounded-xl border bg-card hover:border-primary/50 transition-colors">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Fast Access</h3>
            <p className="text-muted-foreground">
              Access your files quickly from any device, anywhere
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Global CDN
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Instant preview
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Offline access
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple process
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span className="text-primary font-semibold text-xl">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Create an Account</h3>
                <p className="text-muted-foreground">
                  Sign up for free and get started in seconds. No credit card required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span className="text-primary font-semibold text-xl">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Upload Your Files</h3>
                <p className="text-muted-foreground">
                  Upload files through our simple interface. Support for all file types.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span className="text-primary font-semibold text-xl">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Access Anywhere</h3>
                <p className="text-muted-foreground">
                  Access your files from any device, anytime. Share with anyone.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl border bg-card flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Documents</span>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 flex items-center gap-3">
                    <FolderOpen className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Folders</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 flex items-center gap-3">
                    <ImageIcon className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Images</span>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Shared</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-center space-y-6 py-12 rounded-2xl border bg-card">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl -z-10" />
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who trust us with their file storage needs. Start your journey today.
        </p>
        <Button asChild size="lg" className="group">
          <Link to="/signup">
            Create Free Account
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
