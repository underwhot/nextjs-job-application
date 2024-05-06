import { JobType } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJobBtn from "./delete-job-btn";
import JobInfo from "./job-info";
import { Briefcase, CalendarDays, MapPin, RadioTower } from "lucide-react";
import { Badge } from "./ui/badge";

export default function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString("en-UK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 grid-rows-2 gap-3 justify-items-start">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge>
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>

      <CardFooter className="grid gap-3 grid-cols-2">
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  );
}
