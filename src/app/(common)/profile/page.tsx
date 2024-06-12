import { getUserProfile } from '@/actions/update-profile.actions';
import { auth } from '@/auth'
import ProfileMain from '@/components/profile/ProfileMain'
import { getLinks } from '@/queries/link'


async function ProfilePage() {
    const session = await auth();
    const userProfile = await getUserProfile(session?.user?.email as string);
    const links = await getLinks()
    console.log(userProfile)
  return (
    <ProfileMain links={links} userProfile={userProfile} />
  )
}

export default ProfilePage