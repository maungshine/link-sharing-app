import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function RegisterPage() {
  return (
    <main className="p-8 flex flex-col sm:items-center sm:justify-center flex-1 sm:bg-[#FAFAFA]">
      <div className="py-8 flex sm:justify-center justify-start">
        <Image
          alt="devlink logo"
          src={"/assets/images/logo-devlinks-large.svg"}
          width={200}
          height={40}
          className="w-[182px] h-10"
        />
      </div>
      <section className="max-w-[476px] sm:bg-white sm:p-8 sm:rounded-sm">
        <h1 className="heading-auth">Create account</h1>
        <p className="body-m text-grey mt-2">
          {"Let\'s get you started sharing your links!"}
        </p>
        <form action="" className="mt-8">
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="e.g.alex@email.com"
            className="placeholder:text-darkgrey/50"
            wrapperClass="mt-4"
            src="/assets/images/icon-email.svg"
            label="Password"
          />
          <FormInput
            wrapperClass="mt-4"
            src="/assets/images/icon-password.svg"
            label="Create password"
            placeholder="At least 8 characters"
            name="password"
            type="password"
            id="password"
            className="placeholder:text-darkgrey/50"
          />
          <FormInput
            wrapperClass="mt-4"
            src="/assets/images/icon-password.svg"
            label="Confirm password"
            placeholder="At least 8 characters"
            name="confirm-password"
            type="password"
            id="confirm-password"
            className="placeholder:text-darkgrey/50"
          />
          <p className="body-s text-darkgrey/50 my-4">Password must contain at least 8 characters</p>
          <div className="flex mt-6">
            <Button className="w-full">Create new account</Button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="body-m text-grey">Already have an account?</p>
          <Link href={'/login'} className="text-primary">Login</Link>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
