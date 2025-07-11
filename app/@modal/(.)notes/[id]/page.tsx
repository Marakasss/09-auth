import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreview;
