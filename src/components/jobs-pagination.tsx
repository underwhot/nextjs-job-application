"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type JobsPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function JobsPagination({
  currentPage,
  totalPages,
}: JobsPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({
    page,
    activeClass,
  }: {
    page: number;
    activeClass: boolean;
  }) => {
    return (
      <PaginationItem key={page}>
        <PaginationLink
          onClick={() => handlePageChange(page)}
          isActive={activeClass}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 })
    );

    // ellipsis
    if (currentPage > 3) {
      pageButtons.push(
        <PaginationItem key="dots-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ page: currentPage - 1, activeClass: false })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }

    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({ page: currentPage + 1, activeClass: false })
      );
    }

    // ellipsis
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <PaginationItem key="dots-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );

    return pageButtons;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              let prevPage = currentPage - 1;
              if (prevPage < 1) prevPage = totalPages;
              handlePageChange(prevPage);
            }}
          />
        </PaginationItem>

        {renderPageButtons()}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              let nextPage = currentPage + 1;
              if (nextPage > totalPages) nextPage = 1;
              handlePageChange(nextPage);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
