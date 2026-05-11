import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Card>
        <CardTitle className="text-center">Common</CardTitle>
        <Button>Click here</Button>
      </Card>
    </div>
  );
}
