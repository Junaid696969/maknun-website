import { useState, useEffect } from 'react'
import { useDocumentOperation } from 'sanity'

export function RestockAction({ id, type, published, onComplete }: any) {
  const { patch, publish } = useDocumentOperation(id, type)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if (isPublishing && !published) {
      setIsPublishing(false)
    }
  }, [isPublishing, published])

  // This is the logic that hits your API
  const handleNotify = async () => {
    if (window.confirm("Send 'Back in Stock' emails to all waiting customers?")) {
      try {
        const res = await fetch('http://localhost:3000/api/notify-restock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            productId: id, 
            productName: published?.name 
          }),
        })
        if (res.ok) alert("Alerts sent successfully!")
      } catch (err) {
        alert("Error sending alerts. Make sure your Next.js server is running.")
      }
      onComplete()
    }
  }

  // Only show the button if the product is NOT sold out (meaning you just restocked it)
  if (type !== 'product' || published?.isSoldOut === true) {
    return null
  }
  return {
    label: 'Notify Waiting Customers',
    onHandle: handleNotify,
    color: 'positive'
  }
}