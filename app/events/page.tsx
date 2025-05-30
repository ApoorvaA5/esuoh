"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarPlus, Search, Users, CalendarRange } from "lucide-react";
import { format } from "date-fns";

// Mock data - would come from API in a real app
const mockEvents = [
  {
    id: "1",
    title: "Annual Tech Conference",
    description: "Join us for three days of cutting-edge technology discussions and networking.",
    location: "San Francisco, CA",
    startDate: new Date("2025-07-15"),
    endDate: new Date("2025-07-17"),
    status: "published",
    attendeeCount: 253,
  },
  {
    id: "2",
    title: "Product Launch Webinar",
    description: "Be the first to see our new product lineup for 2025.",
    location: "Virtual",
    startDate: new Date("2025-06-05"),
    endDate: new Date("2025-06-05"),
    status: "published",
    attendeeCount: 182,
  },
  {
    id: "3",
    title: "Team Building Retreat",
    description: "A three-day retreat focused on team collaboration and strategy.",
    location: "Lake Tahoe, CA",
    startDate: new Date("2025-08-12"),
    endDate: new Date("2025-08-14"),
    status: "draft",
    attendeeCount: 45,
  },
  {
    id: "4",
    title: "Marketing Workshop",
    description: "Learn the latest marketing strategies from industry experts.",
    location: "Chicago, IL",
    startDate: new Date("2025-04-10"),
    endDate: new Date("2025-04-10"),
    status: "completed",
    attendeeCount: 68,
  },
  {
    id: "5",
    title: "Sales Team Meeting",
    description: "Quarterly review and planning session for the sales team.",
    location: "New York, NY",
    startDate: new Date("2025-03-22"),
    endDate: new Date("2025-03-22"),
    status: "completed",
    attendeeCount: 32,
  },
  {
    id: "6",
    title: "Customer Appreciation Event",
    description: "A special event to thank our most loyal customers.",
    location: "Miami, FL",
    startDate: new Date("2025-02-14"),
    endDate: new Date("2025-02-14"),
    status: "completed",
    attendeeCount: 120,
  },
];

export default function EventsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we load your events</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Events</h1>
            <p className="text-muted-foreground">
              Manage and explore all your events
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/events/new">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              startDate={event.startDate}
              endDate={event.endDate}
              location={event.location}
              attendeeCount={event.attendeeCount}
              status={event.status}
            />
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <CalendarRange className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No events found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "Get started by creating your first event."}
              </p>
              <Button asChild className="mt-4">
                <Link href="/events/new">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

type EventCardProps = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  attendeeCount: number;
  status: string;
};

function EventCard({
  id,
  title,
  description,
  startDate,
  endDate,
  location,
  attendeeCount,
  status,
}: EventCardProps) {
  // Format date display
  const formatDateRange = () => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return format(startDate, "MMMM d, yyyy");
    }
    
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, "MMMM d")}-${format(endDate, "d, yyyy")}`;
    }
    
    return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  };

  // Get status display info
  const getStatusInfo = () => {
    switch (status) {
      case "published":
        return {
          label: "Published",
          className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
        };
      case "draft":
        return {
          label: "Draft",
          className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
        };
      case "completed":
        return {
          label: "Completed",
          className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
        };
      case "cancelled":
        return {
          label: "Cancelled",
          className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
        };
      default:
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
            {statusInfo.label}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2 line-clamp-1">{title}</CardTitle>
        <CardDescription className="text-sm mb-2">
          {formatDateRange()} • {location}
        </CardDescription>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{attendeeCount} attendees</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/events/${id}`}>View Details</Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link href={`/events/${id}/manage`}>Manage</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}