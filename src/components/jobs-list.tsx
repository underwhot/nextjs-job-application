"use client";

import { getAllJobsAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JobCard from "./job-card";

export default function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  const jobs = data?.jobs || [];

  if (isPending) return <div>Loading...</div>;
  if (jobs.length === 0) return <div>No Jobs Found...</div>;

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
