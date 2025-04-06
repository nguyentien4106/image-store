import { useCallback } from 'react'
import { useNotification } from '../notification'

export const useDownloadFile = () => {
  const { success, error } = useNotification()

  const downloadFile = useCallback(async (url: string, contentType: string, fileName: string) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'image/*',
          'Content-Type': contentType,
        },
        mode: 'cors',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)

      success("File downloaded successfully")
      return true
    } catch (err) {
      error("Failed to download file. Please try again. " + err.message)
      return false
    }
  }, [success, error])

  return { downloadFile }
}
