import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getChartsDataAction, getStatsAction } from "@/lib/actions";
import Stats from "@/components/stats";
import Charts from "@/components/charts";

export default async function StatsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h2 className="capitalize font-semibold text-4xl mb-4">Stats</h2>
      <div className="mb-8">
        <Stats />
      </div>
      <Charts />
    </HydrationBoundary>
  );
}
