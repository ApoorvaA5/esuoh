"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CalendarClock, Download, MapPin, MoreHorizontal, PencilLine, Search, Trash2, Users } from "lucide-react";
import { format } from "date-fns";

// Mock data - would come from API in a real app
const eventData = {
  id: "1",
  title: "Annual Tech Conference",
  description: "Join us for three days of cutting-edge technology discussions and networking opportunities.",
  location: "San Francisco Convention Center",
  startDate: new Date("2025-07-15T09:00:00"),
  endDate: new Date("2025-07-17T17:00:00"),
  status: "published",
  capacity: 500,
  registeredCount: 253,
};

// Mock attendee data
const attendees = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", status: "confirmed", registeredAt: new Date("2025-05-10T14:32:00") },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", status: "confirmed", registeredAt: new Date("2025-05-11T09:15:00") },
  { id: "3", name: "Robert Johnson", email: "robert.j@example.com", status: "confirmed", registeredAt: new Date("2025-05-12T16:48:00") },
  { id: "4", name: "Emily Davis", email: "emily.davis@example.com", status: "registered", registeredAt: new Date("2025-05-13T11:21:00") },
  { id: "5", name: "Michael Wilson", email: "m.wilson@example.com", status: "registered", registeredAt: new Date("2025-05-14T08:05:00") },
  { id: "6", name: "Sarah Martinez", email: "sarah.m@example.com", status: "confirmed", registeredAt: new Date("2025-05-15T13:40:00") },
  { id: "7", name: "David Thompson", email: "d.thompson@example.com", status: "cancelled", registeredAt: new Date("2025-05-16T10:12:00") },
  { id: "8", name: "Jennifer Garcia", email: "j.garcia@example.com", status: "confirmed", registeredAt: new Date("2025-05-17T15:33:00") },
];

export default function ManageEventPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Format date display functions
  const formatDateRange = () => {
    if (eventData.startDate.toDateString() === eventData.endDate.toDateString()) {
      return format(eventData.startDate, "MMMM d, yyyy");
    }
    
    if (eventData.startDate.getMonth() === eventData.endDate.getMonth() && 
        eventData.startDate.getFullYear() === eventData.endDate.getFullYear()) {
      return `${format(eventData.startDate, "MMMM d")}-${format(eventData.endDate, "d, yyyy")}`;
    }
    
    return `${format(eventData.startDate, "MMMM d, yyyy")} - ${format(eventData.endDate, "MMMM d, yyyy")}`;
  };

  const filteredAttendees = attendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportAttendees = () => {
    // In a real app, this would generate a CSV file
    toast({
      title: "Exporting Attendees",
      description: "Attendee data has been exported to CSV.",
    });
  };

  const deleteEvent = () => {
    // In a real app, this would delete the event via API
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
    router.push("/events");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Loading...</h2>
            <p className="text-muted-foreground">Please wait</p>
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
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{eventData.title}</h1>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                eventData.status === "published" 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                  : eventData.status === "draft" 
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100" 
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              }`}>
                {eventData.status.charAt(0).toUpperCase() + eventData.status.slice(1)}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-muted-foreground mt-2">
              <div className="flex items-center">
                <CalendarClock className="mr-2 h-4 w-4" />
                <span>{formatDateRange()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{eventData.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>{eventData.registeredCount} / {eventData.capacity} registered</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline">
              <Link href={`/events/${params.id}`}>
                View Public Page
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/events/${params.id}/edit`}>
                <PencilLine className="mr-2 h-4 w-4" />
                Edit Event
              </Link>
            </Button>
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the event
                    and all associated data including RSVPs and attendee information.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteEvent} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Tabs defaultValue="attendees" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Registrations
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{eventData.registeredCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((eventData.registeredCount / eventData.capacity) * 100)}% of capacity
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Page Views
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,324</div>
                  <p className="text-xs text-muted-foreground">
                    +24% from last week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">19.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +1.1% from last week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Days Left
                  </CardTitle>
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.max(0, Math.ceil((eventData.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Until event starts
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Additional overview content would go here */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Registration Trend</CardTitle>
                  <CardDescription>
                    Daily registration activity over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest registrations and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendees.slice(0, 5).map((attendee, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">{attendee.name}</span>
                          <span className="text-sm text-muted-foreground">{attendee.email}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(attendee.registeredAt, "MMM d, h:mm a")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="attendees">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Attendees</CardTitle>
                    <CardDescription>
                      Manage registrations and attendee information.
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search attendees..."
                        className="pl-8 w-full sm:w-[250px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" onClick={exportAttendees}>
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered On</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendees.length > 0 ? (
                      filteredAttendees.map((attendee) => (
                        <TableRow key={attendee.id}>
                          <TableCell className="font-medium">{attendee.name}</TableCell>
                          <TableCell>{attendee.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              attendee.status === "confirmed" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                                : attendee.status === "registered" 
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" 
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}>
                              {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>{format(attendee.registeredAt, "MMM d, yyyy")}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Remove Attendee
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No attendees found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Event Settings</CardTitle>
                <CardDescription>
                  Configure visibility and advanced options for your event.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Settings would go here - just showing placeholders */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Visibility</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="public"
                      name="visibility"
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="public" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Public
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="private"
                      name="visibility"
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="private" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Private (invitation only)
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Registration</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="allow-registration"
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="allow-registration" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Allow new registrations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="waitlist"
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="waitlist" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Enable waitlist when capacity is reached
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="email-notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email notifications for new registrations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="reminder-emails"
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="reminder-emails" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Send reminder emails to attendees
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}