import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      {children}
    </div>
  );
}

export default AuthLayout;
