import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/resizable";
import { Frame } from "./components/frame";

export default function App() {
  return (
    <main className="min-h-screen p-6 flex flex-col gap-6">
      <h1 className="text-xl">Frame Panels</h1>

      <ResizablePanelGroup direction="horizontal" className="grow">
        <ResizablePanel defaultSize={25}>
          <Frame title="Frame 1" />
        </ResizablePanel>
        <ResizableHandle className="min-w-2 bg-gray-200 mx-1 rounded-2xl" />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40}>
              <Frame title="Frame 2" />
            </ResizablePanel>
            <ResizableHandle className="min-h-2 bg-gray-200 my-1 rounded-2xl" />
            <ResizablePanel defaultSize={60}>
              <Frame title="Frame 3" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
