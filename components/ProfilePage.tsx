import { SessionInterface, Sketch } from "@/common.types";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import SketchCard from "./SketchCard";
import Image from "next/image";

type Props = { session: SessionInterface; sketchs: Array<Sketch> };

const ProfilePage = ({ session, sketchs }: Props) => (
  <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
    <section className="flexBetween max-lg:flex-col gap-10 w-full">
      <div className="flex items-start flex-col w-full">
        <Image
          src={session?.user?.image!}
          width={100}
          height={100}
          className="rounded-full"
          alt="user image"
        />
        <p className="text-4xl font-bold mt-10">{session?.user?.name}</p>
        <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
          I’m Sketch Artist at Handcrafted Sketches 👋
        </p>

        <div className="flex mt-8 gap-5 w-full flex-wrap">
          <Button
            title="Follow"
            leftIcon="/plus-round.svg"
            bgColor="bg-light-white-400 !w-max"
            textColor="text-black-100"
            type="button"
          />
          <Link href={`mailto:${session?.user?.email}`}>
            <Button title="Hire Me" type="button" leftIcon="/email.svg" />
          </Link>
        </div>
      </div>

      {sketchs?.length > 0 ? (
        <Image
          src={sketchs[0]?.image}
          alt="project image"
          width={739}
          height={554}
          className="rounded-xl object-contain"
        />
      ) : (
        <Image
          src="/profile-post.png"
          width={739}
          height={554}
          alt="project image"
          className="rounded-xl"
        />
      )}
    </section>

    <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
      <p className="w-full text-left text-lg font-semibold">Recent Work</p>

      <div className="profile_sketchs">
        {sketchs?.map((sk: Sketch) => (
          <SketchCard key={sk.id} sketch={sk} />
        ))}
      </div>
    </section>
  </section>
);

export default ProfilePage;
