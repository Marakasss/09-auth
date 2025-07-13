import NotesClient from "./Notes.client";
import { Tag } from "@/types/note";
import { Metadata } from "next";
import { fetchNotesServer } from "@/lib/api/serverApi";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

//Metadata----------------------------------------

export const generateMetadata = async ({
  params,
}: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug.length > 0 && slug[0] !== "All" ? (slug[0] as Tag) : "All";
  const title = tag === "All" ? "All notes" : `${tag} notes`;
  const description =
    tag === "All" ? "All notes collection" : `Notes relating to ${tag}`;
  const url = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return {
    title,
    description,

    openGraph: {
      title,
      description,

      url: `https://09-auth-cyan.vercel.app/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url,
          width: 1200,
          height: 630,
          alt: "NoteHub App",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,

      images: [url],
    },
  };
};

//-------------------------------------------------------

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag =
    slug.length > 0 && slug[0] !== "All" ? (slug[0] as Tag) : undefined;
  const initialNotesData = await fetchNotesServer("", 1, tag);

  return <NotesClient initialNotesData={initialNotesData} tag={tag} />;
};
export default Notes;
