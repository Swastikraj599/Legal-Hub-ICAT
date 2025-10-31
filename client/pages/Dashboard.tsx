import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PerformanceChart, EarningsChart } from "@/components/charts/Charts";
import NewsPanel from "@/components/news/NewsPanel";
import AppointmentList from "@/components/appointments/AppointmentList";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const studentPerf = [
  { day: "Mon", score: 62 }, { day: "Tue", score: 71 }, { day: "Wed", score: 68 }, { day: "Thu", score: 77 }, { day: "Fri", score: 84 }, { day: "Sat", score: 80 }, { day: "Sun", score: 88 },
];
const lawyerEarn = Array.from({ length: 14 }).map((_, i) => ({ day: `${i+1}`.padStart(2, "0"), amount: Math.round(2000 + Math.random()*3000) }));

const materials = [
  { id: "cpc", title: "Criminal Procedure Code (CrPC) — Essentials", tags: ["Criminal", "Procedure"] },
  { id: "ipc", title: "Indian Penal Code (IPC) — Key Sections", tags: ["Criminal"] },
  { id: "contract", title: "Contract Act — Consideration & Consent", tags: ["Contract"] },
];

const lawyers = [
  { id: "l1", name: "Adv. Priya Sharma", city: "Delhi", specialization: "Criminal" },
  { id: "l2", name: "Adv. Rohan Singh", city: "Mumbai", specialization: "Corporate" },
  { id: "l3", name: "Adv. Meera Iyer", city: "Bengaluru", specialization: "Family" },
  { id: "l4", name: "Adv. Akash Verma", city: "Kolkata", specialization: "Property" },
];

export default function Dashboard() {
  const [params, setParams] = useSearchParams();
  const defaultTab = (params.get("role") as "student" | "lawyer" | "public") || "student";
  const [role, setRole] = useState(defaultTab);

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Personalized workspace for your role.</p>
        </div>
      </div>

      <Tabs value={role} onValueChange={(v) => { setRole(v); params.set("role", v); setParams(params, { replace: true }); }}>
        <TabsList className="mb-6">
          <TabsTrigger value="student">Law Student</TabsTrigger>
          <TabsTrigger value="lawyer">Lawyer / Advocate</TabsTrigger>
          <TabsTrigger value="public">General Public</TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <PerformanceChart data={studentPerf} />
              <Card>
                <CardHeader>
                  <CardTitle>Study Materials</CardTitle>
                  <CardDescription>Curated content by category</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  {materials.map((m) => (
                    <div key={m.id} className="rounded-md border p-3">
                      <div className="font-medium mb-2">{m.title}</div>
                      <div className="flex flex-wrap gap-2">
                        {m.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                      </div>
                      <Button className="mt-3" size="sm">Read</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <MockTests />
              <NewsPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lawyer" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <EarningsChart data={lawyerEarn} />
              <AppointmentList />
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Shown to clients in search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Name</span><span>Adv. Priya Sharma</span>
                    <span className="text-muted-foreground">City</span><span>Delhi</span>
                    <span className="text-muted-foreground">Specialization</span><span>Criminal</span>
                    <span className="text-muted-foreground">Hourly</span><span>₹2,500</span>
                  </div>
                  <Button size="sm">Edit Profile</Button>
                </CardContent>
              </Card>
              <NewsPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="public" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find a Lawyer</CardTitle>
              <CardDescription>Search and filter by specialization or city</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <Input placeholder="Search by name" />
                <Select>
                  <SelectTrigger><SelectValue placeholder="Specialization" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Criminal">Criminal</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Property">Property</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {lawyers.map((l) => (
                  <div key={l.id} className="rounded-md border p-3">
                    <div className="font-medium">{l.name}</div>
                    <div className="text-sm text-muted-foreground">{l.specialization} • {l.city}</div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm">Book Appointment</Button>
                      <Button variant="outline" size="sm">Secure Chat</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <NewsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MockTests() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questions = useMemo(() => ([
    { id: "q1", q: "Which section of IPC defines theft?", options: ["378", "420", "124A", "302"], a: "378" },
    { id: "q2", q: "Consideration is defined under which section of Contract Act?", options: ["2(d)", "10", "73", "20"], a: "2(d)" },
  ]), []);

  const score = Object.entries(answers).reduce((acc, [qid, opt]) => {
    const found = questions.find((q) => q.id === qid);
    return acc + (found && found.a === opt ? 1 : 0);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Test</CardTitle>
        <CardDescription>Instant results as you answer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <div className="font-medium">{q.q}</div>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <Button key={opt} size="sm" variant={answers[q.id] === opt ? "default" : "outline"} onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}>{opt}</Button>
              ))}
            </div>
          </div>
        ))}
        <div className="text-sm text-muted-foreground">Score: {score} / {questions.length}</div>
      </CardContent>
    </Card>
  );
}
