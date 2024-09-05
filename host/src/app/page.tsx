import * as React from "react";
import { Frame } from "./components/frame";

export default function Home() {
  return (
    <main className="min-h-screen p-6 flex flex-col gap-6">
      <h1 className="text-xl">Frame Panels</h1>

      <div className="grid grid-cols-3 grow gap-6">
        <Frame title="Frame 1" />
        <Frame title="Frame 2" />
        <Frame title="Frame 3" />
      </div>
    </main>
  );
}
