import { Block } from 'payload'
import { text } from 'stream/consumers'

export const QuizBlock: Block = {
  slug: 'quiz',
  labels: {
    singular: 'Quiz',
    plural: 'Quizzes',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'questions',
      label: 'Questions',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'questions',
          label: 'Questions',
          type: 'text',
          required: true,
        },
        {
          name: 'answers',
          label: 'Answers',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'answer',
              label: 'Answer',
              type: 'text',
              required: true,
            },
            {
              name: 'correct',
              label: 'Correct',
              type: 'checkbox',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
