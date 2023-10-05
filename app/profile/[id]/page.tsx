import ProfilePage from "@/app/components/ProfilePage";
import { UserProfile } from "@/common.types";
import { getUsersProjects } from "@/lib/actions";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  const result = (await getUsersProjects(params.id, 100)) as {
    user: UserProfile;
  };
  if (!result?.user) {
    return <p className="no-result-text">Faild to Fetch USer Info</p>;
  }

  return <ProfilePage user={result?.user} />;
};

export default UserProfile;
