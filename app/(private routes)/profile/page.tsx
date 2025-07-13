import React from "react";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { getMeServer } from "@/lib/api/serverApi";
import { Metadata } from "next";

//Metadata----------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { username, avatar } = await getMeServer();

  return {
    title: username,
    description: `profile of ${username}`,

    openGraph: {
      title: username,
      description: `profile of ${username}`,
      url: `https://09-auth-cyan.vercel.app/profile`,
      siteName: "NoteHub",
      images: [
        {
          url: avatar || "/default-avatar.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub App",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: username,
      description: `profile of ${username}`,
      images: [avatar || "/default-avatar.jpg"],
    },
  };
};

const ProfilePage = async () => {
  const user = await getMeServer();
  if (!user) {
    console.log("Who are you?");
  }

  return (
    <div>
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
              src={user?.avatar || "/default-avatar.jpg"}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user?.username || "Guest"}</p>
            <p>Email: {user?.email || "your_email@example.com"}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
