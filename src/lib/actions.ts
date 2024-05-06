"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./db";
import { CreateAndEditJobType, JobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

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

type GetAllJobsTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsTypes) {
  const userId = authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string) {
  const userId = authenticateAndRedirect();

  try {
    const job = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}

export async function getSingleJobAction(id: string) {
  let job = null;
  const userId = authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    job = null;
  }

  if (!job) redirect("/jobs");

  return job;
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
) {
  const userId = authenticateAndRedirect();

  try {
    const job = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}
