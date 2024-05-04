"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormField, CustomFormSelect } from "./form-components";
import {
  CreateAndEditJobType,
  JobMode,
  JobStatus,
  createAndEditJobSchema,
} from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createJobAction } from "@/lib/actions";

export function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast("There was an error");
        return;
      }

      toast("Job created");

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      // form.reset()
      router.push("/jobs");
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // className="space-y-8"
      >
        <h2 className="capitalize font-semibold text-4xl mb-4">Add job</h2>

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
            {isPending ? "Creating..." : "Create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
