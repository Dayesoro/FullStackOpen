import Part from './Part'

const Content = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(course =>
                <Part key={course.id} name={course.name} exercises={course.exercises} />
            )}
        </div>
    )
}

export default Content