import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

export default async function PetDetail({ params }) {
  const { id } = await params

  const { data: pet, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !pet) {
    notFound()
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← Back to all pets
      </Link>

      <div className="flex justify-between items-start mt-4 mb-1">
        <h1 className="text-2xl font-bold">{pet.name}</h1>
        <div className="flex gap-3">
          <Link href={`/pets/${pet.id}/edit`} className="text-sm hover:underline">
            Edit
          </Link>
          <DeleteButton petId={pet.id}/>
        </div>
      </div>

      <p className="text-gray-500 mb-6">
        {pet.species}{pet.breed ? ` · ${pet.breed}` : ''}
      </p>

      <dl className="flex flex-col gap-3">
        <div>
          <dt className="text-sm text-gray-500">Birth date</dt>
          <dd>{pet.birth_date || '—'}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Notes</dt>
          <dd>{pet.notes || '—'}</dd>
        </div>
      </dl>
    </main>
  )
}