import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CalendarCheck, Users, BarChart3, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Simplify Your Event Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  EventEase helps you create, manage, and track events with ease. Streamline RSVPs, manage attendees, and get insights all in one place.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex-1 aspect-video relative rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center">
                  <div className="text-center p-6 bg-background rounded-lg shadow-lg transform -rotate-1 w-5/6">
                    <div className="space-y-2 mb-4">
                      <h3 className="font-semibold text-xl">Annual Tech Conference 2025</h3>
                      <p className="text-sm text-muted-foreground">July 15-17, 2025 • San Francisco</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-primary/10 p-3 rounded-md">
                        <p className="text-2xl font-bold">253</p>
                        <p className="text-xs text-muted-foreground">Registered</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-md">
                        <p className="text-2xl font-bold">18</p>
                        <p className="text-xs text-muted-foreground">Days Left</p>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">Manage Event</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need for Event Success</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to create, manage, and analyze your events from start to finish.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CalendarCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Event Creation</h3>
                <p className="text-center text-muted-foreground">
                  Create professional events with detailed information and customizable fields.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Attendee Management</h3>
                <p className="text-center text-muted-foreground">
                  Track RSVPs, manage attendee data, and export information as needed.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Event Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Get insights into event performance with detailed analytics and reports.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Public Sharing</h3>
                <p className="text-center text-muted-foreground">
                  Generate public URLs for easy sharing and RSVP collection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Simplify Your Event Management?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of event organizers who are creating exceptional experiences with EventEase.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">Create Your First Event</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}