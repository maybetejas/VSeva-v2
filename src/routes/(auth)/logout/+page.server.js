import { redirect } from '@sveltejs/kit'


export const load = async ({cookies}) => {
  cookies.set('session', '', {
    path: '/',
    expires: new Date(0),
  })

  // redirect the user
  throw redirect(302, '/')
}
