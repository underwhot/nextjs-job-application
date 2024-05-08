"use client";

import { getAllJobsAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JobCard from "./job-card";
import JobsPagination from "./jobs-pagination";
import Loader from "./loader";

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

  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader />
      </div>
    );
  if (jobs.length === 0) return <div>No Jobs Found...</div>;

  return (
    <>
      <div className="mb-3 text-sm">{count} jobs found:</div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3 pb-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {totalPages < 2 ? null : (
        <div className="flex justify-center">
          <JobsPagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
