import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem { title: string; url: string; source?: string; }

const sample: NewsItem[] = [
  { title: "Supreme Court issues landmark ruling on digital privacy", url: "https://news.example.com/privacy" },
  { title: "New amendments proposed for contract law", url: "https://news.example.com/contract" },
  { title: "High Court clarifies guidelines on bail", url: "https://news.example.com/bail" },
];

export default function NewsPanel() {
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    const API = import.meta.env.VITE_NEWS_API_URL as string | undefined;
    const KEY = import.meta.env.VITE_NEWS_API_KEY as string | undefined;
    async function run() {
      if (!API || !KEY) {
        setItems(sample);
        return;
      }
      try {
        const res = await fetch(`${API}?category=law&apiKey=${KEY}`);
        const data = await res.json();
        const mapped: NewsItem[] = (data.articles || []).slice(0, 6).map((a: any) => ({ title: a.title, url: a.url, source: a.source?.name }));
        setItems(mapped.length ? mapped : sample);
      } catch {
        setItems(sample);
      }
    }
    run();
  }, []);

  return (
    <Card>
      <CardHeader><CardTitle>Law News</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {!items && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-5 w-full" />)}
        {items?.map((n, i) => (
          <a key={i} href={n.url} target="_blank" rel="noreferrer" className="block rounded-md border p-3 hover:bg-muted">
            <div className="text-sm font-medium">{n.title}</div>
            {n.source && <div className="text-xs text-muted-foreground mt-1">{n.source}</div>}
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
