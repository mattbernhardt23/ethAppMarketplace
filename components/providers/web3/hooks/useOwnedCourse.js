import { normalizeOwnedCourse } from "@utils/normalize"
import { createCourseHash } from "@utils/createCourseHash"
import useSWR from "swr"
 
export const useOwnedCourse = (web3, contract) => (course, account) => {
  const swrRes = useSWR(() =>
    (web3 && contract && account) ? `web3/ownedCourse/${account}` : null,
    async () => {
     
      const courseHash = createCourseHash(web3)(course.id, account)

      const ownedCourse = await contract.methods.getCourseByHash(web3)(courseHash).call()
      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null
      }

      return normalizeOwnedCourse(web3)(course, ownedCourse)
    }
  )

  return swrRes
}