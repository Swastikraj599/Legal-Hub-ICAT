import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

export function PerformanceChart({
  data,
}: {
  data: { day: string; score: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance (last 7 tests)</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="day"
              fontSize={12}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              fontSize={12}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="url(#grad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function EarningsChart({
  data,
}: {
  data: { day: string; amount: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings (last 14 days)</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="day"
              fontSize={12}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              fontSize={12}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ActivityLine({
  data,
}: {
  data: { day: string; sessions: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active users</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="day"
              fontSize={12}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              fontSize={12}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip />
            <Line
              dataKey="sessions"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
