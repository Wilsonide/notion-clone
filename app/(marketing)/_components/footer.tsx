import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="flex w-full p-6 z-50 bg-background items-center dark:bg-[#1f1f1f]">
      <Logo />
      <div className="ml-auto w-full justify-between md:justify-end flex gap-x-2 items-center text-muted-foreground">
        <Button variant="ghost">Privacy Policy</Button>
        <Button variant="ghost">Terms & Conditions</Button>
      </div>
    </div>
  );
};
