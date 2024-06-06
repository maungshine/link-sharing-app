"use client";
import { link } from "@/app/(common)/links/page";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaChevronDown, FaGithub } from "react-icons/fa";

const Base_X = 48;
const Base_Y = 278;

function FormSelect({
  setNewLinks,
  link,
  platform,
}: {
  link: link;
  setNewLinks: Dispatch<SetStateAction<link[] | null>>;
  id: number;
  platform: {
    name: string;
    icon: React.ReactNode;
    egLink: string;
    brandColor: string;
    mockUpIcon: React.ReactNode;
    coordinates: { x: number | string; y: number | string };
  }[];
}) {
  const [show, setShow] = useState<Boolean>(false);

  return (
    <div className="w-full z-50 relative">
      <div className="relative">
        <FaChevronDown
          className={`absolute right-4 top-[50%] bottom-[50%] -translate-y-[50%] transition-all ease-in duration-200 text-primary${
            show ? " rotate-180" : ""
          }`}
        />
        <div className="pl-4 fill-darkgrey">{link && link.platform.icon}</div>
        <input
          placeholder={link ? link.platform.name : ""}
          onClick={() => setShow(true)}
          type="text"
          className="w-full placeholder:text-darkgrey cursor-pointer border-[1.5px] rounded-[8px] h-12 px-12 custom-input focus:shadow-[0_5px_10px_5px_rgba(99,60,255,0.2)]"
        />
      </div>
      <div
        className={`border-[1.5px] flex flex-col absolute w-full top-14 z-50 bg-white px-4 rounded-md max-h-[128px] overflow-y-scroll${
          show ? " d-block opacity-100" : " hidden opacity-0"
        }`}
      >
        {platform.map((platform) => (
          <div
            key={platform.name}
            className="py-3 relative border-b last:border-b-0 text-grey hover:text-primary cursor-pointer fill-grey hover:fill-primary"
            onClick={() => {
              setNewLinks((prev) => {
                let links: link[];

                if (prev) {
                  //   links = [
                  //     {
                  //       ...link,
                  //       platform: {
                  //         name: platform.name,
                  //         icon: platform.icon,
                  //         egLink: platform.egLink,
                  //         brandColor: platform.brandColor,
                  //         mockUpIcon: platform.mockUpIcon,
                  //         coordinates: { x: Base_X, y: Base_Y },
                  //       },
                  //       url: "",
                  //     },
                  //   ];
                  // } else if (prev) {

                  links = [
                    ...prev.map((l) => {
                      if (l.id === link.id) {
                        return {
                          ...l,
                          platform: {
                            ...l.platform,
                            name: platform.name,
                            icon: platform.icon,
                            egLink: platform.egLink,
                            brandColor: platform.brandColor,
                            mockUpIcon: platform.mockUpIcon,
                          },
                        };
                      }

                      return l;
                    }),
                  ];
                } else {
                  return prev;
                }
                return links;
              });

              setShow(false);
            }}
          >
            {platform.icon}

            <p className="ml-8">{platform.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormSelect;
