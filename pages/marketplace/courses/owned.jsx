import { OwnedCourseCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";
import { Message } from "@components/ui/common";

export default function OwnedCourses() {

  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
        <Message>
            My custom message!
          </Message>
          <Button>
            Watch the course
          </Button>
        </OwnedCourseCard>
      </section>
    </>
  )
}