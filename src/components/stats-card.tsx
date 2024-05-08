import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";


type StatsCardProps = {
  title: string;
  value: number;
};
export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className="text-center bg-muted">
      <CardHeader className="p-3">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>{value}</CardDescription>
      </CardHeader>
    </Card>
  );
}
