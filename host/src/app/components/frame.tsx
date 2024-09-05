"use client";

import * as React from "react";

export function Frame(props: { title: string }) {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [name, setName] = React.useState("");

  // In dev mode we might not get the `load` event from
  // the iframe
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        setLoaded(true);
      }, 500);
    }
  }, []);

  React.useEffect(() => {
    if (loaded && ref.current?.contentWindow) {
      const message = { type: "setProps", payload: { title: props.title } };
      ref.current.contentWindow.postMessage(message, "http://localhost:5173");
    }
  }, [loaded, props.title]);

  React.useEffect(() => {
    const handler = (
      event: MessageEvent<{ type: string; payload: { name: string } }>
    ) => {
      if (
        event.origin === "http://localhost:5173" &&
        event.source === ref.current?.contentWindow &&
        event.data.type === "click"
      ) {
        setName(event.data.payload.name);
      }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <p className="text-sm">Selected user: {name}</p>
      <iframe
        ref={ref}
        className="w-full grow"
        src="http://localhost:5173"
        title="Frame"
        onLoad={() => {
          console.log(`frame ${props.title} has loaded`);
          setLoaded(true);
        }}
      />
    </div>
  );
}
