"use client";
import Image from "next/image";
import css from "./EditProfile.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { AuthUserData, editUser } from "@/lib/api/clientApi";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [error, setError] = useState("");
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const username = String(formData.get("username")).trim();
    if (!username) {
      setError("Username is required");
      return;
    }

    if (user) {
      const updatedUser: AuthUserData = {
        username,
        email: user.email,
      };
      try {
        const response = await editUser(updatedUser);
        setUser(response);
        console.log("User edit:", response);

        router.push("/profile");
      } catch (err) {
        console.error("Error updating profile:", err);
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "/public/default-avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              defaultValue={user?.username}
              className={css.input}
            />
          </div>

          <p>{user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.push("/profile")}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <p className={css.error}>{error}</p>}
      </div>
    </main>
  );
};

export default EditProfile;
