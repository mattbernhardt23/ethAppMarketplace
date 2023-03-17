import { normalizeOwnedCourse } from "@utils/normalize";
import { createCourseHash } from "@utils/createCourseHash";
import useSWR from "swr";

export const handler = (web3, contract) => (courses, account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedCourses/${account}` : null),
    async () => {
      const ownedCourses = [];
      for (let i = 0; i < courses.length; i++) {
        // We have our course list, and we are looping through it.
        // Create a variable for our specific course
        const course = courses[i];

        // One of the courses has no id, this will skip the following code, and move on to the next course in the loop.
        if (!course.id) {
          continue;
        }

        // We are creating our course hash which takes into account the owner(the account) and the course id.
        const courseHash = createCourseHash(web3)(course.id, account);

        // We are passing our courseHash to our getCourseByHash function, and it will add that course to our array.
        // By including the "call" function, we do not use any gas.
        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call();
        // If the course owner is not equal to the zero address, thenwe know it has an owner.
        if (
          ownedCourse.owner !== "0x0000000000000000000000000000000000000000"
        ) {
          const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
          ownedCourses.push(normalized);
        }
      }
      return ownedCourses;
    }
  );

  return {
    ...swrRes,
    lookup:
      swrRes.data?.reduce((accumulator, course) => {
        accumulator[course.id] = course;
        return accumulator;
      }, {}) ?? {},
  };
};
