"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./db";
import { CreateAndEditJobType, JobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";

function authenticateAndRedirect() {
  const { userId } = auth();
  if (!userId) redirect("/");
  return userId;
}

export async function createJobAction(values: CreateAndEditJobType) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userId = authenticateAndRedirect();

  try {
    createAndEditJobSchema.parse(values);

    const job = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });

    return job as JobType;
  } catch (error) {
    console.error(error);
    return null;
  }
}
