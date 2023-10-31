import { useRouter } from "next/router";
import HeadPoint from "@/components/headpoint";
import { useEffect } from "react";
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    alert(router.query.id);
  }, [useRouter.isReady]);
  return (
    <>
      <HeadPoint />
    </>
  );
}
