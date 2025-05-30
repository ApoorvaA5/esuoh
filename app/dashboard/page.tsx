"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Users, BarChart2, CalendarPlus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we load your dashboard</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // This will be redirected by the useEffect hook
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}!
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/events/new">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Attendees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">593</div>
              <p className="text-xs text-muted-foreground">
                +128 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Events
              </CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Next event in 3 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Response Rate
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">83%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Annual Tech Conference"
                date="July 15-17, 2025"
                location="San Francisco, CA"
                attendees={253}
                status="Published"
              />
              <EventCard
                title="Product Launch Webinar"
                date="June 5, 2025"
                location="Virtual"
                attendees={182}
                status="Published"
              />
              <EventCard
                title="Team Building Retreat"
                date="August 12-14, 2025"
                location="Lake Tahoe, CA"
                attendees={45}
                status="Draft"
              />
            </div>
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Marketing Workshop"
                date="April 10, 2025"
                location="Chicago, IL"
                attendees={68}
                status="Completed"
              />
              <EventCard
                title="Sales Team Meeting"
                date="March 22, 2025"
                location="New York, NY"
                attendees={32}
                status="Completed"
              />
              <EventCard
                title="Customer Appreciation Event"
                date="February 14, 2025"
                location="Miami, FL"
                attendees={120}
                status="Completed"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: "Published" | "Draft" | "Completed";
};

function EventCard({ title, date, location, attendees, status }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Published" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
              : status === "Draft" 
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100" 
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
          }`}>
            {status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="text-sm mb-4">
          {date} • {location}
        </CardDescription>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{attendees} attendees</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/events/1`}>View Details</Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link href={`/events/1/manage`}>Manage</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}