import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="space-y-6 text-center">
        <h1 className="text-8xl font-extrabold tracking-tight text-primary">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>

          <p className="text-muted-foreground">
            Sorry, the page you are looking for does not exist.
          </p>
        </div>

        <Button size="lg">
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
