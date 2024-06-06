"use client";

import { CreatePostForm } from "@/modules/post/components/create-post-form";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export default function PostPage() {
  return (
    <main className="">
      <CreatePostForm />

      <Button className="mt-4" variant="outline" asChild>
        <Link href="/adm">Voltar</Link>
      </Button>
    </main>
  );
}
