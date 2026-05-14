import { getMe } from "@/lib/api/serverApi";
import EditProfileClient from "./EditProfile.client";

export default async function EditProfile() {
  const user = await getMe();

  return <EditProfileClient initialUser={user} />;
}
