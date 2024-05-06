"use client";

import { getSingleJobAction, updateJobAction } from "@/lib/actions";
import {
  CreateAndEditJobType,
  JobMode,
  JobStatus,
  createAndEditJobSchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "./ui/form";
import { CustomFormField, CustomFormSelect } from "./form-components";
import { Button } from "./ui/button";

export default function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast("there was an error");
        return;
      }

      toast("Job updated");

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      router.push("/jobs");
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <>
      <h2 className="capitalize font-semibold text-4xl mb-4">Edit job</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // className="space-y-8"
        >
          <div className="flex flex-wrap *:flex-[calc(33.333%-0.75rem)] gap-3">
            <CustomFormField name="position" control={form.control} />
            <CustomFormField name="company" control={form.control} />
            <CustomFormField name="location" control={form.control} />
            <CustomFormSelect
              name="status"
              control={form.control}
              items={Object.values(JobStatus)}
              labelText="job status"
            />
            <CustomFormSelect
              name="mode"
              control={form.control}
              items={Object.values(JobMode)}
              labelText="job mode"
            />
            <Button type="submit" className="self-end" disabled={isPending}>
              {isPending ? "Editing..." : "Edit job"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
