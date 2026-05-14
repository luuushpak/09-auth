"use client";

import Image from "next/image";
import css from "./EditProfile.module.css";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface InitialUserProps {
  initialUser: User;
}

export default function EditProfileClient({ initialUser }: InitialUserProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    refetchOnMount: false,
    initialData: initialUser,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateMe,

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["me"], updatedUser);
      router.push("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;

    if (!username || username.trim() === "") {
      toast.error("Username cannot be empty");
      return;
    }

    mutate({ username });
  };

  const [username, setUsername] = useState(user.username);

  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isPending}
            >
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
