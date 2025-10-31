import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export interface Appointment { id: string; client: string; lawyer: string; title: string; start: string; end: string; location?: string }

const sampleAppointments: Appointment[] = [
  { id: "1", client: "Aarav Mehta", lawyer: "Adv. Priya Sharma", title: "Contract review", start: new Date(Date.now() + 86400000).toISOString(), end: new Date(Date.now() + 90000000).toISOString() },
  { id: "2", client: "Neha Gupta", lawyer: "Adv. Rohan Singh", title: "Bail consultation", start: new Date(Date.now() + 2*86400000).toISOString(), end: new Date(Date.now() + 2*86400000 + 3600000).toISOString() },
];

function googleQuickAdd(appt: Appointment) {
  const text = encodeURIComponent(`${appt.title} — ${appt.client} with ${appt.lawyer}`);
  const dates = `${format(new Date(appt.start), "yyyyMMdd'T'HHmmss'Z'")}/${format(new Date(appt.end), "yyyyMMdd'T'HHmmss'Z'")}`;
  const details = encodeURIComponent("Scheduled via Legal Hub");
  const location = encodeURIComponent(appt.location || "Online");
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  window.open(url, "_blank");
}

export default function AppointmentList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Sync any appointment to Google Calendar.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sampleAppointments.map((a) => (
          <div key={a.id} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(a.start), "MMM d, h:mm a")} — {format(new Date(a.end), "h:mm a")} • {a.client}
              </div>
            </div>
            <Button size="sm" onClick={() => googleQuickAdd(a)}>Add to Google</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
