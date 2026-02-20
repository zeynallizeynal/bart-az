"use client";

import Form from "next/form";
import React from "react";

export default function HeaderSearch() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="border-blue-600 flex-1 rounded-xl bg-blue-600 border">
      <Form
        action="/search"
        className="flex items-center rounded-xl overflow-hidden border-2 border-blue-600"
      >
        <input
          type="text"
          name="s"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Elanlar üzrə axtarış"
          className="bg-background grow rounded-lg border-r-2 border-blue-600 px-4 h-12 placeholder-gray-500 max-w-full w-full"
        />
        <button
          type="submit"
          className="flex text-background px-5 h-12 items-center justify-center"
        >
          Axtar
        </button>
      </Form>
    </div>
  );
}
