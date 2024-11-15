import { Doc } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { bytesToKB } from "@/app/utils/docs";

type DocCardProps = {
  doc: Doc;
};
export function DocCard({ doc }: DocCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base line-clamp-2">{doc.fileName}</CardTitle>
        <CardDescription>{bytesToKB(doc.size)} KB</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            Created: {doc.createdAt.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Updated: {doc.updatedAt.toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={"secondary"}>Open</Button>
      </CardFooter>
    </Card>
  );
}
