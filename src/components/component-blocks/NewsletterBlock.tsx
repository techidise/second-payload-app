'use client'

/*
 * @fileoverview: Newsletter block components for handling newsletter form display and submission
 * @module: NewsletterBlock
 */

import { useState } from 'react'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

// import { Button } from '@/components/ui/button'

import type { Form } from '@payloadcms/plugin-form-builder/types'

/**
 * Props type for the newsletter block extracted from Page layout
 * @typedef {Extract<Page['layout'[0], {blockType: 'newsletter-form'}]>} NewsletterProps
 */
type NewsletterProps = Extract<Page['layout'][0], { blockType: 'newsletter-form' }>

/**
 * Form state type for managing form submission states
 * @typedef { Object } FormState
 * @property { boolean } loading - Indicates if form is currently submitting
 * @property { string | null } error - Error message if submission failed, null otherwise
 * @property { boolean } success - Indicates if form was submitted successfully
 */
type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

/**
 * Type representing an input form field from the Form interface
 * Only includes fields that have input elements
 * @typedef {Object} InputFormField
 * @property { 'text' | 'email' | 'textarea' | 'number' | 'checkbox' | 'select' | 'country' | 'state'} blockType - Type of input field
 * @property { string } name - Field name identifier
 * @property { string | null } [label] - Optional label for the field
 * @property { boolean | null } [required] - Optional flag indicating if field is required
 */

type InputFormField = Extract<
  NonNullable<Form['fields']>[number],
  {
    blockType:
      | 'text'
      | 'email'
      | 'textarea'
      | 'number'
      | 'checkbox'
      | 'select'
      | 'country'
      | 'state'
    name: string
    label?: string | null
    required?: boolean | null
  }
>

/**
 * NewsletterBlock component
 *
 * This component displays a newsletter form and handles form submission.
 * It uses the payload CMS form fields to create the form and handle submission.
 * The form supports various input types and provides feedback on submission status.
 *
 * @component
 * @param { Object } props - Component props
 * @param {NewsletterProps} props.block - Newsletter block configuration from Payload CMS
 * @returns {JSX.Element} Newsletter form component
 */

export default function NewsletterBlock({ block }: { block: NewsletterProps }) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  /**
   * Handles form submission
   * Submits form data to the API and manages submission state
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   * @returns {Promise<void>}
   * @throws {Error} When form submission fails
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!block.form || typeof block.form !== 'object') return

    setFormState({
      loading: true,
      error: null,
      success: false,
    })

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to sumbit form')
      }
      setFormState({
        loading: false,
        error: null,
        success: true,
      })

      // Reset the form
      ;(e.target as HTMLFormElement).reset()

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          loading: false,
          error: null,
          success: false,
        })
      }, 5000)
    } catch (error) {
      console.error(error)
      setFormState({
        loading: false,
        error: 'Failed to submit form',
        success: false,
      })
    }
  }

  return (
    <div className="bg-red-200">
      {typeof block?.form === 'object' && block?.form?.title === 'newsletter-form-1' && (
        <div>
          <h2 className="text-amber-300">{block.heading}</h2>
          <form className="bg-slate-700" onSubmit={handleSubmit}>
            {block.form.fields?.map((field) => {
              // only render input fields
              const inputField = field as InputFormField
              if (!('name' in field)) return null

              return (
                <div key={inputField.name}>
                  <label htmlFor={inputField.name}>{inputField.label}</label>
                  <input
                    type={inputField.blockType === 'email' ? 'email' : 'text'}
                    name={inputField.name}
                    required={inputField.required || false}
                    placeholder={inputField.label || ''}
                    className="w-full p-10 rounded-full border-4 bg-amber-300"
                  />
                </div>
              )
            })}
            {/* display error or success message */}
            {formState.error && <p className="text-red-500">{formState.error}</p>}
            {formState.success ? (
              <div className="text-green-400">
                <RichText data={block.form.confirmationMessage!} />
              </div>
            ) : (
              <button type="submit">{block.form.submitButtonLabel || 'Submit'}</button>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
