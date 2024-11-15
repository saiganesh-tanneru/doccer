import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Form from "next/form";
export function DocsSearch() {
  return (
    <Form action={"/"}>
      <div className="flex items-center gap-4">
        <Input type="search" placeholder="Search in docs" name="search" />
        <Button>Search</Button>
      </div>
    </Form>
  );
}
