import NoteDetailsClient from "./NoteDetails.client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

//Types--------------------------------------------

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

//Metadata----------------------------------------
const url = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const generateMetadata = async ({
  params,
}: NoteDetailsProps): Promise<Metadata> => {
  const { id } = await params;
  const { title, content } = await fetchNoteByIdServer(id);
  const snippet = content.length > 30 ? content.slice(0, 30) + "..." : content;

  return {
    title: title || "Note details",
    description: snippet,

    openGraph: {
      title: title || "Note details",
      description: snippet,
      url: `https://09-auth-cyan.vercel.app/filter/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url,
          width: 1200,
          height: 630,
          alt: "NoteHub App",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Note details",
      description: snippet,
      images: [url],
    },
  };
};

//Component--------------------------------------------

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
