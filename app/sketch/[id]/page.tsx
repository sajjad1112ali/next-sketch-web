import { Sketch } from "@/common.types";
import { getSketheDetails } from "@/lib/db/sketch-actions";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/components/Modal";
import RelatedProjects from "@/components/RelatedProjects";

const SketchDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
    const userImage = '/user-image.svg'
    const name = 'Sajjad Ali'
  const session = await getCurrentUser();
  const sketchData = (await getSketheDetails(id)) as Sketch;
  if (!sketchData) {
    return <p>Failed to fetch sketch details.</p>;
  }
  return (
    <Modal>
    <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
            <Link href={'renderLink()'}>
                <Image
                    src={userImage}
                    width={50}
                    height={50}
                    alt="profile"
                    className="rounded-full"
                />
            </Link>

            <div className="flex-1 flexStart flex-col gap-1">
                <p className="self-start text-lg font-semibold">
                    {sketchData?.title}
                </p>
                <div className="user-info">
                    <Link href={'renderLink()'}>
                        {name}
                    </Link>
                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    <Link href={`/?category=${sketchData.category}`} className="text-primary-purple font-semibold"> 
                        {sketchData?.category}
                    </Link>
                </div>
            </div>
        </div>

        {/* {session?.user?.email === sketchData?.createdBy?.email && (
            <div className="flex justify-end items-center gap-2">
                <ProjectActions projectId={sketchData?.id} />
            </div>
        )} */}
    </section>

    <section className="mt-14">
        <Image
            src={`${sketchData?.image}`}
            className="object-cover rounded-2xl"
            width={1064}
            height={798}
            alt="poster"
        />
    </section>

    <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
            {sketchData?.description}
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
            <Link href={'sketchData?.githubUrl'} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                🖥 <span className="underline">Github</span> 
            </Link>
            <Image src="/dot.svg" width={4} height={4} alt="dot" />
            <Link href={'sketchData?.liveSiteUrl'} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                🚀 <span className="underline">Live Site</span> 
            </Link>
        </div>
    </section>

    <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={'renderLink()'} className="min-w-[82px] h-[82px]">
            <Image
                src={userImage}
                className="rounded-full"
                width={82}
                height={82}
                alt="profile image"
            />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
    </section>

    <RelatedProjects userId={sketchData.userId} projectId={sketchData?.id} />
</Modal>
  );
};

export default SketchDetails;
