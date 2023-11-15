export const load = async ({ locals }) => {
    return {
      user: locals.user,
      washer: locals.washer,
    }
}