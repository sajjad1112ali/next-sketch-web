import { getUserSketchs } from "@/lib/db/sketch-actions";
import { Sketch } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  userId: number;
  sketchId: number;
};
const RelatedSketchs = async ({ userId, sketchId }: Props) => {
  const userSketchs = await getUserSketchs(userId);
  const filteredSketchs = userSketchs.filter(
    (proj: Sketch) => proj.id !== sketchId
  );
  if (filteredSketchs.length === 0) return null;

  const userImage = "/user-image.svg";
  const name = "Sajjad Ali";
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {name}</p>
      </div>
      <div className="related_sketchs-grid">
        {filteredSketchs.map((proj: Sketch) => (
          <div
            key={proj.id}
            className="flexCenter related_sketch-card drop-shadow-card"
          >
            <Link
              href={`sketch/${proj.id}`}
              className="flexCenter w-full h-full group relative"
            >
              <Image
                src={proj.image}
                alt={proj.title}
                width={414}
                height={314}
                className="w-full h-full rounded-2xl object-cover"
              />
              <div className="hidden group-hover:flex related_sketch-card_title">
                <p className="w-full">{proj.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedSketchs;
