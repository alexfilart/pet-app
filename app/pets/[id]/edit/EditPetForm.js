'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabaseClient'

export default function EditPetForm({ pet }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: pet.name || '',
    species: pet.species || '',
    breed: pet.breed || '',
    birth_date: pet.birth_date || '',
    notes: pet.notes || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const { error } = await supabase
      .from('pets')
      .update({
        name: form.name,
        species: form.species,
        breed: form.breed || null,
        birth_date: form.birth_date || null,
        notes: form.notes || null,
      })
      .eq('id', pet.id)

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    router.refresh()
    router.push(`/pets/${pet.id}`)
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit {pet.name}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Species *</label>
          <input
            type="text"
            name="species"
            value={form.species}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Breed</label>
          <input
            type="text"
            name="breed"
            value={form.breed}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Birth date</label>
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            max={new Date().toISOString().slice(0, 10)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  )
}