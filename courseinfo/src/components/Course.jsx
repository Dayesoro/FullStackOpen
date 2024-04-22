import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content courseParts={course.parts} />
            <Total courseParts={course.parts} />
        </div>
    )
}

export default Course