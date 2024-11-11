import { useEffect, useState } from "react";

const mockEnabled =
  process.env.NEXT_PUBLIC_ENABLE_MOCK_SERVICE_WORKER === "true";

export default function MSW({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mocksReady, setMocksReady] = useState(false);

  useEffect(() => {
    console.log('hook')
    console.log('process.env.NEXT_PUBLIC_ENABLE_MOCK_SERVICE_WORKER', process.env.NEXT_PUBLIC_ENABLE_MOCK_SERVICE_WORKER)
    if (mockEnabled && !mocksReady && typeof window !== "undefined") {
      import("../../msw/browser").then(({ worker }) => {
        worker.start().then(() => {
          setMocksReady(true);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mockEnabled || (mockEnabled && mocksReady)) {
    return children;
  }

  return null;
}