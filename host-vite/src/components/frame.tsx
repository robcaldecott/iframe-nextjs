import * as React from "react";

export function Frame(props: { title: string }) {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="h-full flex flex-col">
      <p className="text-sm">Loaded: {loaded ? "true" : "false"}</p>
      <iframe
        ref={ref}
        className="w-full grow"
        src="http://localhost:5173"
        title={props.title}
        onLoad={() => {
          console.log(`frame ${props.title} has loaded`);
          setLoaded(true);
        }}
      />
    </div>
  );
}
