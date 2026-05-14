import css from "./Profile.module.css";
import Link from "next/link";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();

  return {
    title: `Profile - ${user.username}`,
    description: `User profile page of ${user.username}`,
    openGraph: {
      title: `Profile - ${user.username}`,
      description: `Check out ${user.username}'s profile`,
      url: `${process.env.NEXT_PUBLIC_API_URL}/profile`,
      images: [
        {
          url: user.avatar,
          width: 120,
          height: 120,
          alt: user.username,
        },
      ],
    },
  };
}

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
