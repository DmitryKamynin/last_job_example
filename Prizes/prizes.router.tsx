import { lazy, memo, Suspense } from "react";
import { useRoute } from "react-router5";

const Main = lazy(() => import("./modules/Main/Views"));
const Edit = lazy(() => import("./modules/EditAdd/Views"));

const MainPrizesRouter = ({ special }: { special: boolean }): JSX.Element => {
  const { route } = useRoute();

  const page = route.name.split(".")[3];

  return (
    <Suspense fallback={null}>
      {page === "edit" || page === "add" ? (
        <Edit page={page} special={special} />
      ) : (
        <Main special={special} />
      )}
    </Suspense>
  );
};
export default memo(MainPrizesRouter);
