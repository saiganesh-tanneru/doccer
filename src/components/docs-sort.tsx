"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function DocsSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortValue = searchParams.get("order") ?? "desc";

  return (
    <Select
      onValueChange={(value) => {
        router.push(`/?order=${value}`);
      }}
      value={sortValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="desc">Desc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
