import { link } from "@/app/(common)/links/page";
import { IoReorderTwoOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Dispatch, SetStateAction } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

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
  platform: {
    name: string;
    icon: React.ReactNode;
    egLink: string;
    brandColor: string;
    mockUpIcon: React.ReactNode;
    coordinates: { x: number | string; y: number | string };
  }[];
  id: number;
}) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id,
      data: {
        type: "link",
        link: link,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#FAFAFA] p-4 mt-4 rounded-8 flex flex-col w-full gap-4"
    >
      <div  className="flex justify-between">
        <h3 {...attributes} {...listeners} className="flex items-center gap-1">
          <IoReorderTwoOutline /> <span>Link #{index}</span>
        </h3>
        <Button
          variant={"link"}
          className="font-normal text-grey text-[18px] z-[9999]"
          onClick={() => {
            if (links) {
              let y = 278;
              const newLinks = links.filter((link) => link.id !== id).map((link) => {
                const newlink = { ...link, platform: { ...link.platform, coordinates: { ...link.platform.coordinates, y } } };
                y = y + 64;
                return newlink;
              });
              setNewLinks(newLinks);
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

