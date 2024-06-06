"use client";
import AddLink from "@/components/form/AddLink";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import IconFrontendMentor from "@/components/svg/IconFrontendMentor";
import IconGithub from "@/components/svg/IconGithub";
import PhoneMockUp from "@/components/svg/PhoneMockUp";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import Droppable from "@/components/drag-and-drop/Droppable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

const Base_X = 35;
const Base_Y = 278;

export type link = {
  id: number;
  platform: {
    name: string;
    icon: React.ReactNode;
    egLink: string;
    brandColor: string;
    mockUpIcon: React.ReactNode;
    coordinates: {
      x: number | string;
      y: number | string;
    };
  };
  url: string;
};

const platform = [
  {
    name: "Github",
    icon: (
      <IconGithub color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    egLink: "https://github.com/maungshine",
    brandColor: "#1A1A1A",
    mockUpIcon: <IconGithub color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Frontend Mentor",
    icon: (
      <IconFrontendMentor color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    egLink: "https://www.frontendmentor.io/profile/maungshine",
    brandColor: "#6abecd",
    mockUpIcon: <IconFrontendMentor color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
];

function page() {
  const [activeLink, setActiveLink] = useState<link | null>(null);
  const [coordinates, setCoordinates] = useState<{
    x: string | number;
    y: string | number;
  }>({ x: Base_X, y: Base_Y });
  const [newLinks, setNewLinks] = useState<link[] | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (count !== 0) {
      if (newLinks) {
        setNewLinks([
          ...newLinks,
          {
            id: count,
            platform: {
              name: "",
              icon: "",
              egLink: "",
              brandColor: "",
              mockUpIcon: "",
              coordinates: { x: coordinates.x, y: coordinates.y },
            },
            url: "",
          },
        ]);
      } else {
        setNewLinks([
          {
            id: count,
            platform: {
              name: "",
              icon: "",
              egLink: "",
              brandColor: "",
              mockUpIcon: "",
              coordinates: { x: coordinates.x, y: coordinates.y },
            },
            url: "",
          },
        ]);
      }

      return () => setNewLinks(null);
    }
  }, [count]);

  useEffect(() => {
    if (newLinks && newLinks.length > 0) {
      setCoordinates((prev) => {
        return { ...prev, y: (prev.y as string) + 64 };
      });
    } else {
      setCoordinates({ x: Base_X, y: Base_Y });
    }
  }, [newLinks?.length]);

  const items = useMemo(() => {
    if (newLinks) {
      return newLinks.map((item) => {
        return item.id;
      });
    }
  }, [JSON.stringify(newLinks)]);

  function onDragStart(event: DragStartEvent) {
    console.log("drag started", event);

    if (event.active.data.current?.type === "link") {
      setActiveLink(event.active.data.current.link);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeLinkId = active.id;
    const overLinkId = over.id;

    if (activeLinkId === overLinkId) return;

    setNewLinks((links) => {
      if (links) {
        const activeLinkIndex = links?.findIndex(
          (link) => link.id === activeLinkId
        );

        const overLinkindex = links?.findIndex(
          (link) => link.id === overLinkId
        );

        let y = Base_Y;
        
        return arrayMove(links, activeLinkIndex, overLinkindex).map(
          (link, index) => {

            let links = {
              ...link,
              platform: {
                ...link.platform,
                coordinates: {
                  ...link.platform.coordinates,
                  y,
                },
              },
            };

            y = y + 64;

            return links;
          }
        );
      }
      return links;
    });
  }

  return (
    <main className="flex-1 md:grid md:grid-cols-5 md:gap-4 p-4 bg-[#FAFAFA]/50">
      <section className="md:flex hidden md:col-span-2 items-start justify-center bg-white md:flex-1">
        <div className="mt-20">
          <PhoneMockUp links={newLinks} color="" />
        </div>
      </section>
      <section className="flex-1 md:col-span-3 bg-white">
        <div className="p-6">
          <h2 className="heading-m text-darkgrey">Customize your links</h2>
          <p className="body-m text-grey mt-2">
            {
              "Add/edit/remove links below and then share all your profiles with the world!"
            }
          </p>
          <div className="flex mt-8">
            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => setCount((prev) => prev + 1)}
            >
              + Add new link
            </Button>
          </div>

          {(!newLinks || newLinks?.length === 0) && (
            <article className="py-[46px] px-5 flex flex-col items-center mt-6 sm:px-[76px] bg-[#FAFAFA]">
              <Image
                src={"/assets/images/illustration-empty.svg"}
                width={124}
                height={80}
                className="h-[80px] w-[124px]"
                alt="a hand scrolling on mobile phone"
              />
              <h2 className="heading-m text-darkgrey mt-4">
                {"Let's get you started"}
              </h2>
              <p className="text-grey text-justify mt-4 sm:text-center">
                {
                  'Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We\'re here to help you share your profiles with everyone!'
                }
              </p>
            </article>
          )}

          {newLinks && newLinks?.length > 0 && (
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <div>
                <SortableContext items={items as number[]}>
                  {newLinks &&
                    newLinks.map((link, index) => (
                      <AddLink
                        index={index + 1}
                        links={newLinks}
                        link={link}
                        key={link.id}
                        id={link.id}
                        platform={platform}
                        setNewLinks={setNewLinks}
                      />
                    ))}
                </SortableContext>
              </div>
            </DndContext>
          )}

          <hr className="my-4 text-grey h-[2px]" />
          <div className="flex mt-8">
            <Button
              className="w-full sm:w-auto sm:ml-auto sm:px-6 sm:h-10"
              disabled={!!newLinks && newLinks.length > 0 ? false : true}
            >
              Save
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
