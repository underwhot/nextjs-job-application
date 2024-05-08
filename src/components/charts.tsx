"use client";

import { getChartsDataAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Charts() {
  const { data } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  if (!data || data.length < 1) return null;

  return (
    <section>
      <h2 className="capitalize font-semibold text-4xl mb-4">
        Monthly Applications
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
