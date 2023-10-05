"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import { deleteUserProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const token = await fetchToken();
    try {
      await deleteUserProject(projectId, token);
      router.push("/");
      setIsDeleting(false);
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>
      <button
        type="button"
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        disabled={isDeleting}
        onClick={handleDeleteProject}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />{" "}
      </button>
    </>
  );
};

export default ProjectActions;
