import { link } from "@/app/(common)/links/page";
import { IoReorderTwoOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Dispatch, SetStateAction } from "react";

function AddLink({
  index,
  links,
  link,
  setNewLinks,
  platform,
  id,
}: {
  index: number;
  links: link[] | null;
  link: link;
  setNewLinks: Dispatch<SetStateAction<link[] | null>>;
  platform: { name: string; icon: React.ReactNode, egLink: string, brandColor: string, mockUpIcon: React.ReactNode, coordinates: { x: number | string, y: number | string, }, }[];
  id: number;
}) {
  return (
    <div className="bg-[#FAFAFA] p-4 mt-4 rounded-8 flex flex-col w-full gap-4">
      <div className="flex justify-between">
        <h3 className="flex items-center gap-1">
          <IoReorderTwoOutline /> <span>Link #{index}</span>
        </h3>
        <Button
          variant={"link"}
          className="font-normal text-grey text-[18px]"
          onClick={() => {
            if (links) {
              setNewLinks(links?.filter((l) => l.id !== link.id));
            }
          }}
        >
          Remove
        </Button>
      </div>
      <FormSelect
        link={link}
        setNewLinks={setNewLinks}
        id={id}
        platform={platform}
      />
     <FormInput
            wrapperClass="mt-4"
            src="/assets/images/icon-link.svg"
            label="Password"
            placeholder={`e.g. ${link.platform.egLink}`}
            name="url"
            type="text"
            id="url"
            className="placeholder:text-darkgrey/50 h-12 border-border focus:shadow-[0_5px_10px_5px_rgba(99,60,255,0.2)]"
          />
    </div>
  );
}

export default AddLink;