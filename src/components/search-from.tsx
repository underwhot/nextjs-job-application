"use client";

import { JobStatus } from "@/lib/types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";
  const jobStatus = searchParams?.get("jobStatus") || "all";

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;

    let params = new URLSearchParams();
    params.set("search", search);
    params.set("jobStatus", jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <h2 className="capitalize font-semibold text-4xl mb-4">All jobs</h2>

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 [&>*]:flex-[33.333%] mb-4"
      >
        <Input
          type="text"
          placeholder="Search jobs"
          name="search"
          defaultValue={search}
        />

        <Select name="jobStatus" defaultValue={jobStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["all", ...Object.values(JobStatus)].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>Search</Button>
      </form>
    </>
  );
}
