import ProfilePage from '@/components/ProfilePage'
import { getUserSketchs } from '@/lib/db/sketch-actions'
import { getCurrentUser } from '@/lib/session'
type Props = {
  params: {
    id: number
  }
}
const UserProfile = async ({params}: Props) => {
  const session = await getCurrentUser();

  const userSketchs = await getUserSketchs(+params.id);
  if (userSketchs.length === 0 ) return (
    <p className='no-result-text'>Sketches not found for this user.</p>
  )
  return (
    <ProfilePage session={session} sketchs={userSketchs}/>
  )
}

export default UserProfile