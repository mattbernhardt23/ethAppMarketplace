import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
    // The Reduce Function creates an object so that we can look up courses based on key-value pairs.
    courseMap: courses.reduce((a, c, i) => {
      // We're creating a property of the accumulator which will be a course id, and we will asign to that course id the course itself.
      a[c.id] = c;
      // we're simply giving the course id an index property.
      a[c.id].index = i;
      // We are returning the accumulator to continue the loop through our courses.
      return a;
    }, {}),
    // The above empty object is the empty ovject we start with, and we are simply adding to it.
  };
};
