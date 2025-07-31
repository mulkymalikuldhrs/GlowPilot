import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, MessageCircle, Scan, Scale, User, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <section className="text-center pt-12 md:pt-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
          Meet GlowPilot
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your Personal AI Skincare Copilot. Achieve your best skin with AI-driven diagnosis, personalized routines, and smart product comparisons.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dermatologist">
              Start Diagnosis <Wand2 className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#how-it-works">
              Learn More
            </Link>
          </Button>
        </div>
      </section>

      <section id="features" className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">One App, All Your Skin Needs</h2>
          <p className="mt-2 text-muted-foreground">From analysis to purchase, we've got you covered.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="glass-card flex flex-col overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Wand2 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>AI Dermatologist</CardTitle>
                  <CardDescription>
                    Personalized diagnosis and routines.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="AI Dermatologist" 
                  fill 
                  className="object-cover"
                  data-ai-hint="skincare analysis"
                />
              </div>
            </CardContent>
            <div className="p-6 pt-4">
               <Button asChild className="w-full">
                 <Link href="/dermatologist">
                   Analyze Your Skin
                   <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
               </Button>
            </div>
          </Card>

          <Card className="glass-card flex flex-col overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <Scale className="h-6 w-6" />
                  </div>
                <div>
                  <CardTitle>Product Comparison</CardTitle>
                  <CardDescription>
                    Find the best value and formulation.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="Product Comparison" 
                    fill 
                    className="object-cover"
                    data-ai-hint="skincare products"
                  />
              </div>
            </CardContent>
            <div className="p-6 pt-4">
               <Button asChild className="w-full">
                 <Link href="/compare">
                   Compare Products
                   <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
               </Button>
            </div>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-2 text-muted-foreground">Get your personalized skincare plan in 3 simple steps.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg glass-card">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">1. Describe</h3>
            <p className="text-muted-foreground">Tell us about your skin concerns, goals, and lifestyle through chat, voice, or by uploading a photo.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg glass-card">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Scan className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">2. Analyze</h3>
            <p className="text-muted-foreground">Our AI copilot analyzes your input to identify potential issues and determine your unique skin profile.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg glass-card">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">3. Recommend</h3>
            <p className="text-muted-foreground">Receive a tailored AM/PM skincare routine with product recommendations you can trust.</p>
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Loved by Users Worldwide</h2>
          <p className="mt-2 text-muted-foreground">Don't just take our word for it.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="female avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sarah L.</p>
                  <p className="text-sm text-muted-foreground">Skincare Enthusiast</p>
                </div>
              </div>
              <p className="text-sm text-foreground/80">"GlowPilot completely transformed my skincare routine! The AI diagnosis was scarily accurate and the product recommendations were spot on."</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="male avatar" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Michael B.</p>
                  <p className="text-sm text-muted-foreground">Busy Professional</p>
                </div>
              </div>
              <p className="text-sm text-foreground/80">"As someone who knows nothing about skincare, this was a lifesaver. It's simple, fast, and I've already seen improvements."</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person face" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Dr. Evelyn Reed</p>
                  <p className="text-sm text-muted-foreground">Dermatologist</p>
                </div>
              </div>
              <p className="text-sm text-foreground/80">"A fantastic tool for accessible skincare education. It empowers users to make informed decisions about their skin health. Highly recommended."</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center py-12">
        <div className="glass-card p-8 md:p-12 rounded-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Ready for Your Glow Up?</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Stop guessing and start seeing results. Get your free, personalized skin analysis and routine from GlowPilot today.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/dermatologist">
                Get My Free Analysis
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

       <footer className="text-center py-6 border-t border-border/20">
         <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GlowPilot by Mulky Malikul Dhaher. For a more glowing world. ✨</p>
       </footer>
    </div>
  );
}
