import { Metadata } from "next";
import NotFoundClient from "./NotFound.client";

//Metadata----------------------------------------

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "Page not found",
    description: "The page you are looking for does not exist.",
    siteName: "NoteHub",
    images: [
      {
        url: "https://09-auth-cyan.vercel.app/404.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
    type: "website",
  },
};

//Component----------------------------------------

const NotFound = () => {
  return <NotFoundClient />;
};
export default NotFound;
