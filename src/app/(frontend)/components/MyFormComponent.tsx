'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const MyFormComponent = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  // const [fileUploadId, setFileUploadedId] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  type fieldProp = {
    id: number
    name: string
    label: string
    blockType: string | number
    value: string | number
  }

  // 1) Get the form from payload.
  useEffect(() => {
    // Fetch the form configuration
    fetch(`/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
        console.log('cmsForm', data)
      })
      .catch((error) => setError('Error loading form'))
  }, [formId])

  // 2) Render the form based on field types.

  // 3) Handle form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let fileUploadedId = null

    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // get the file from the form data, if it exists
    const file = formData.get('file')
    if (file) {
      console.log('file', file)
      // upload the file to payload
      const formDataToSend = new FormData()
      formDataToSend.append('file', file as File)
      formDataToSend.append(
        '_payload',
        JSON.stringify({
          alt: (file as File).name,
        }),
      )
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formDataToSend,
      })
      console.log('response', response)
      if (!response.ok) {
        throw new Error('Failed to upload file')
      }
      const data = await response.json()
      console.log('data', data)
      debugger
      fileUploadedId = data?.doc?.id
    }

    // delete the file from the form data, so it's not sent to payload, because it's already uploaded
    if (file) {
      formData.delete('file')
    }

    // convert the form data to a json object, for fields that are not files
    const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
      field: name,
      value: value.toString(),
    }))

    // Send the form data to Payload
    const response = await fetch('/api/form-submissions', {
      method: 'POST',
      body: JSON.stringify({
        form: formId,
        submissionData: dataToSend,
        ...(cmsForm?.hasAttachment && fileUploadedId ? { file: fileUploadedId } : {}),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('response', response)
    if (response.ok) {
      const confirmationMessage = cmsForm?.confirmationMessage
      if (confirmationMessage) {
        setSuccess(true)
      }
    } else {
      setError('Form submission failed')
      setSuccess(false)
    }

    // reset the form
    formRef.current?.reset()
    fileUploadedId = null
  }

  if (!cmsForm) return <div>Loading....</div>

  if (success && cmsForm.confirmationMessage) {
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
    return <RichText data={cmsForm.confirmationMessage} />
  }

  return (
    <div className="w-full max-w-lg bg-red-500 p-8 rounded">
      <form onSubmit={handleSubmit} ref={formRef}>
        {cmsForm?.fields.map((field: fieldProp) => (
          <div key={field.id}>
            <Label className="text-amber-200" htmlFor={field.name}>
              {field.label}
            </Label>
            <Input className="border-amber-50" type={field.blockType} name={field.name} />
          </div>
        ))}
        {cmsForm.hasAttachment && (
          <div>
            <Label htmlFor="file">{cmsForm.hasAttachmentLabel || 'Attachment'}</Label>
            <Input type="file" name="file" id="file" />
          </div>
        )}
        <Button
          className="bg-amber-800 border-amber-100 text-white hover:bg-amber-600"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default MyFormComponent
