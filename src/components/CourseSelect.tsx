import { Course } from '../data/courses';

interface CourseSelectProps {
  courses: Course[];
  selectedCourse: Course;
  onSelectCourse: (course: Course) => void;
}

const CourseSelect: React.FC<CourseSelectProps> = ({
  courses,
  selectedCourse,
  onSelectCourse,
}) => {
  return (
    <div className="flex gap-4">
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelectCourse(course)}
          className={`
            p-4 rounded-lg shadow-md transition-all
            ${
              selectedCourse.id === course.id
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'
            }
          `}
        >
          <h3 className="font-bold text-lg mb-1">{course.name}</h3>
          <p className={`text-sm ${
            selectedCourse.id === course.id ? 'text-blue-100' : 'text-gray-600'
          }`}>
            {course.description}
          </p>
          <p className={`text-sm mt-2 ${
            selectedCourse.id === course.id ? 'text-blue-100' : 'text-gray-600'
          }`}>
            Par {course.par}
          </p>
        </button>
      ))}
    </div>
  );
};

export default CourseSelect;