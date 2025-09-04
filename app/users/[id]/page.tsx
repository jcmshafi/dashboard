

import UserDetails from "@/components/UserDetails";
import { getUser } from "@/lib/getUser-utils";


export default async function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
 console.log(user);
  return <UserDetails  user={user} />;
}
