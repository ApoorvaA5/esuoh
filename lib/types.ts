export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff" | "event_owner";
  createdAt: Date;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  status: "draft" | "published" | "completed" | "cancelled";
  capacity: number | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  customFields?: CustomField[];
};

export type CustomField = {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "checkbox";
  required: boolean;
  options?: string[];
  eventId: string;
};

export type Attendee = {
  id: string;
  name: string;
  email: string;
  status: "registered" | "confirmed" | "cancelled" | "attended";
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
  responses?: CustomFieldResponse[];
};

export type CustomFieldResponse = {
  fieldId: string;
  value: string;
  attendeeId: string;
};