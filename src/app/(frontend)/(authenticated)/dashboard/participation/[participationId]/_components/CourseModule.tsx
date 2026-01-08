import { Participation } from '@/payload-types'

type CourseModuleProps = {
  module: any
  participation: Participation
  onCompleted: (nextIndex: number) => void
}

const CourseModule = ({ module, participation, onCompleted }: CourseModuleProps) => {
  switch (module.blockType) {
    default:
      return <div>Unknown module type {module.blockType}</div>
  }
}

export default CourseModule
