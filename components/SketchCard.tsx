import { Sketch } from "@/common.types";
import Image from "next/image";
import Link from "next/link";

function generateRandomLikesAndViews() {
    const minLikes = 10; // Minimum number of likes
    const maxLikes = 200; // Maximum number of likes
    const minViews = 1000; // Minimum number of views
    const maxViews = 10000; // Maximum number of views
  
    const randomLikes = Math.floor(Math.random() * (maxLikes - minLikes + 1)) + minLikes;
    const randomViews = (Math.floor(Math.random() * (maxViews - minViews + 1)) + minViews) / 1000;
  
    return {
      likes: randomLikes,
      views: `${randomViews}k`,
    };
  }
const SketchCard = ({ sketch }: { sketch: Sketch }) => {
  const {
    id,
    userId,
    title,
    image,
    description,
    createdAt,
    category,
    isActive,
  } = sketch;
  const { likes, views } = generateRandomLikesAndViews();

  const userImage = '/user-image.svg'
  const name = 'Sajjad Ali'
  return <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
    <Link href={`/sketch/${id}`} className='flexCenter group relative w-full h-full'>
        <Image src={image} alt={title} width={414} height={314} className='w-full h-full rounded-2xl object-contain' />
        <div className="hidden group-hover:flex profile_card-title"><p className="w-full">{title}</p></div>
    </Link>
    <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
            <div className="flexCenter gap-2">
                <Image src={userImage} width={24} height={24} className='rounded-full' alt="user Image" />
                <p>{name}</p>
            </div>
        </Link>
        <div className="flexCenter gap-3">
            <div className="flexCenter gap-2">
                <Image src={`/heart.svg`} width={13} height={12} alt="heart" />
                <p className="text-sm">{likes}</p>
            </div>
            <div className="flexCenter gap-2">
                <Image src={`/eye.svg`} width={13} height={12} alt="heart" />
                <p className="text-sm">{views}</p>
            </div>
        </div>
    </div>
  </div>;
};

export default SketchCard;
