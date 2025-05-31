import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loading";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <main className="flex flex-col bg-primary-main cursor-default h-full w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-60px)]">
          <Loader />
        </div>
      ) : (
        <Outlet />
      )}
      <footer className="py-4 text-start px-8">
        © بصراحه ٢٠٢٥. جميع الحقوق محفوظة.
      </footer>
    </main>
  );
}
