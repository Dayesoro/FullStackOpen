import CourseDetail from "./CourseDetail"

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => <CourseDetail key={course.id} course={course} />)}
        </div>
    )
}

export default Course