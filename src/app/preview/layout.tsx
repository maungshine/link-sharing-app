import { Button } from "@/components/ui/button";
import Link from "next/link";

function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col sm:bg-[#fafafa] sm:relative">
        <nav className="flex w-full sm:hidden items-center justify-between py-4 px-6 z-30 sm:bg-white sm:mt-4 rounded-2xl">
          <Link href={'/links'} className="border border-primary rounded-md py-2 text-md font-semibold text-sm text-primary hover:bg-hover-foreground/50 px-4" >Back to Editor</Link>
          <Button>Share Link</Button>
        </nav>
      <div className="absolute hidden sm:block bg-primary w-screen h-[300px] rounded-b-3xl sm:px-4">
        <nav className="flex w-full items-center justify-between py-4 px-6 z-30 sm:bg-white sm:mt-4 rounded-2xl">
          <Link href={'/links'} className="border border-primary rounded-md py-2 text-md font-semibold text-sm text-primary hover:bg-hover-foreground/50 px-4" >Back to Editor</Link>
          <Button>Share Link</Button>
        </nav>
      </div>
      {children}
    </div>
  );
}

export default PreviewLayout;
