'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function DeleteButton({ petId }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm('Delete this pet? This cannot be undone.')
    if (!confirmed) return

    setDeleting(true)
    const { error } = await supabase.from('pets').delete().eq('id', petId)
    setDeleting(false)

    if (error) {
      alert(error.message)
      return
    }

    window.location.href = '/'
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-red-600 text-sm hover:underline disabled:opacity-50"
    >
      {deleting ? 'Deleting...' : 'Delete pet'}
    </button>
  )
}