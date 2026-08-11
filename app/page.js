import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

export default async function Home() {
  const { data: pets, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-md mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <Link href="/add-pet" className="bg-black text-white rounded px-4 py-2 text-sm">
          + Add Pet
        </Link>
      </div>

      {error && <p className="text-red-600 text-sm">{error.message}</p>}

      {pets && pets.length === 0 && (
        <p className="text-gray-500">No pets yet. Add your first one!</p>
      )}

      <ul className="flex flex-col gap-3">
        {pets && pets.map((pet) => (
          <li key={pet.id}>
            <Link
              href={`/pets/${pet.id}`}
              className="block border rounded px-4 py-3 hover:bg-gray-50"
            >
              <p className="font-medium">{pet.name}</p>
              <p className="text-sm text-gray-500">
                {pet.species}{pet.breed ? ` · ${pet.breed}` : ''}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}