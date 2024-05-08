"use client";

import { getStatsAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./stats-card";

export default function Stats() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className="flex flex-wrap gap-3 [&>*]:flex-[calc(33.333%-0.75rem)] [&>*]:basis-[200px] md-4">
      <StatsCard title="pending jobs" value={data?.pending || 0} />
      <StatsCard title="interviews set" value={data?.interview || 0} />
      <StatsCard title="jobs declined" value={data?.declined || 0} />
    </div>
  );
}
