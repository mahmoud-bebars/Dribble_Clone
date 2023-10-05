import { ProjectInterface, UserProfile } from "@/common.types";
import { getUsersProjects } from "@/lib/actions";
import React from "react";

import Link from "next/link";
import Image from "next/image";
type Props = {
  userId?: string;
  projectId?: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const request = await getUsersProjects(userId, 4);
  const data = request as { user?: UserProfile };
  const user = data?.user;
  const projectsToDisplay = data?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );

  if (projectsToDisplay?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 gap-3 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More By {user?.name}</p>
        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {projectsToDisplay?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                alt="project-image"
                className="full h-full rounded-2xl"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
