import * as React from "react";

export function Frame(props: { title: string }) {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (loaded && ref.current?.contentWindow) {
      const message = { type: "setProps", payload: { title: props.title } };
      ref.current.contentWindow.postMessage(message, "http://localhost:5173");
    }
  }, [loaded, props.title]);

  return (
    <iframe
      ref={ref}
      className="w-full h-full"
      src="http://localhost:5173"
      title="Frame"
      onLoad={() => {
        console.log(`frame ${props.title} has loaded`);
        setLoaded(true);
      }}
    />
  );
}
