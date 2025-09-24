import { Card, CardContent } from "@/components/ui/card";

export default function ReflectionCard({ question }: { question: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm">{question}</p>
      </CardContent>
    </Card>
  );
}
