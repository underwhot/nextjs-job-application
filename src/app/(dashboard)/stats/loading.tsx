import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-wrap gap-3 [&>*]:flex-[calc(33.333%-0.75rem)] [&>*]:basis-[200px] md-4">
      <StatsLoadingCard />
      <StatsLoadingCard />
      <StatsLoadingCard />
    </div>
  );
}

function StatsLoadingCard() {
  return (
    <Card className="w-full h-[66px]">
      <CardHeader className="p-3">
        <CardTitle className="capitalize">
          <Skeleton className="w-full h-[16px] rounded-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-full h-[20px] rounded-full" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
