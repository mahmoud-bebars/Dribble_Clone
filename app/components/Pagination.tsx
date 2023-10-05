"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const Pagination = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === "next" && hasNextPage) {
      currentParams.delete("startCursor");
      currentParams.set("endCursor", endCursor);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endCursor");
      currentParams.set("startCursor", startCursor);
    }

    const newSearchParams = currentParams.toString();

    const newPathName = `${window.location.pathname}?${newSearchParams}`;
    router.push(newPathName);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          type="button"
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {hasNextPage && (
        <Button
          type="button"
          title="Next"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  );
};

export default Pagination;
