"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarClock, MapPin, Calendar, Share2, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Mock data - would come from API in a real app
const eventData = {
  id: "1",
  title: "Annual Tech Conference",
  description: "Join us for three days of cutting-edge technology discussions and networking opportunities. Learn from industry experts, participate in hands-on workshops, and connect with peers from around the world. This year's focus is on AI, cloud computing, and cybersecurity.",
  location: "San Francisco Convention Center, 747 Howard St, San Francisco, CA 94103",
  startDate: new Date("2025-07-15T09:00:00"),
  endDate: new Date("2025-07-17T17:00:00"),
  status: "published",
  organizer: "TechEvents Inc.",
  capacity: 500,
  registeredCount: 253,
  customFields: [
    {
      id: "field_1",
      name: "Dietary Restrictions",
      type: "text",
      required: false,
    },
    {
      id: "field_2",
      name: "T-Shirt Size",
      type: "select",
      required: true,
      options: ["Small", "Medium", "Large", "X-Large"],
    },
    {
      id: "field_3",
      name: "Would you like to receive updates about future events?",
      type: "checkbox",
      required: false,
    },
  ],
};

const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  field_1: z.string().optional(),
  field_2: z.string().min(1, "Please select a T-Shirt size"),
  field_3: z.boolean().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export default function EventPage({ params }: { params: { id: string } }) {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      field_1: "",
      field_2: "",
      field_3: false,
    },
  });

  function onSubmit(data: RsvpFormValues) {
    // In a real app, this would send data to your API
    console.log(data);
    
    toast({
      title: "RSVP Submitted!",
      description: "Thank you for registering for this event.",
    });
    
    setIsRsvpOpen(false);
    form.reset();
  }

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

  const formatTimeRange = () => {
    return `${format(eventData.startDate, "h:mm a")} - ${format(eventData.endDate, "h:mm a")}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 md:py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{eventData.title}</h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-muted-foreground mb-6">
              <div className="flex items-center">
                <CalendarClock className="mr-2 h-4 w-4" />
                <span>{formatDateRange()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{formatTimeRange()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{eventData.location}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Dialog open={isRsvpOpen} onOpenChange={setIsRsvpOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">RSVP for this Event</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>RSVP for {eventData.title}</DialogTitle>
                    <DialogDescription>
                      Please fill out your information to register for this event.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Custom fields */}
                      {eventData.customFields.map(customField => {
                        if (customField.type === "text") {
                          return (
                            <FormField
                              key={customField.id}
                              control={form.control}
                              name={customField.id as "field_1"}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{customField.name}</FormLabel>
                                  <FormControl>
                                    <Input placeholder={customField.name} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          );
                        } else if (customField.type === "select") {
                          return (
                            <FormField
                              key={customField.id}
                              control={form.control}
                              name={customField.id as "field_2"}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{customField.name}</FormLabel>
                                  <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                  >
                                    <option value="">Select...</option>
                                    {customField.options?.map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          );
                        } else if (customField.type === "checkbox") {
                          return (
                            <FormField
                              key={customField.id}
                              control={form.control}
                              name={customField.id as "field_3"}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      {customField.name}
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          );
                        }
                      })}
                      
                      <DialogFooter>
                        <Button type="submit">Submit RSVP</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Share Event
              </Button>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <div className="prose max-w-none dark:prose-invert">
                <p className="whitespace-pre-line">{eventData.description}</p>
              </div>
              
              <Separator className="my-8" />
              
              {/* Schedule Section - This would be dynamic in a real app */}
              <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold">Day 1 - July 15, 2025</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">9:00 AM</div>
                      <div>Registration & Breakfast</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">10:00 AM</div>
                      <div>Keynote: The Future of AI in Enterprise</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">12:00 PM</div>
                      <div>Lunch Break</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">1:30 PM</div>
                      <div>Workshop Sessions</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">5:00 PM</div>
                      <div>Networking Reception</div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold">Day 2 - July 16, 2025</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">9:00 AM</div>
                      <div>Breakfast</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">10:00 AM</div>
                      <div>Panel: Cloud Security Challenges</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">12:00 PM</div>
                      <div>Lunch Break</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">1:30 PM</div>
                      <div>Breakout Sessions</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">6:00 PM</div>
                      <div>Gala Dinner</div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold">Day 3 - July 17, 2025</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">9:00 AM</div>
                      <div>Breakfast</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">10:00 AM</div>
                      <div>Workshop: Hands-on with New Technologies</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">12:00 PM</div>
                      <div>Lunch Break</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">1:30 PM</div>
                      <div>Closing Keynote</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-muted-foreground">3:00 PM</div>
                      <div>Farewell & Networking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Date and Time</h4>
                      <p className="text-sm text-muted-foreground">{formatDateRange()}</p>
                      <p className="text-sm text-muted-foreground">{formatTimeRange()}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-sm text-muted-foreground">{eventData.location}</p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(eventData.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center mt-1"
                      >
                        View on map
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Organizer</h4>
                    <p className="text-sm text-muted-foreground">{eventData.organizer}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Capacity</h4>
                    <p className="text-sm text-muted-foreground">
                      {eventData.registeredCount} / {eventData.capacity} registered
                    </p>
                    <div className="w-full h-2 bg-muted rounded-full mt-2">
                      <div 
                        className="h-2 bg-primary rounded-full"
                        style={{ 
                          width: `${Math.min(100, (eventData.registeredCount / eventData.capacity) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setIsRsvpOpen(true)}>
                    RSVP Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Share This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full flex-1">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share link</span>
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="event-url">Event URL</Label>
                    <div className="flex mt-1">
                      <Input
                        id="event-url"
                        value={window.location.href}
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button 
                        className="rounded-l-none"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Link copied!",
                            description: "Event link copied to clipboard",
                          });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}