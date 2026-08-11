import { notFound } from 'next/navigation'
import { supabase } from '../../../../lib/supabaseClient'
import EditPetForm from './EditPetForm'

export default async function EditPet({ params }) {
  const { id } = await params

  const { data: pet, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !pet) {
    notFound()
  }

  return <EditPetForm pet={pet} />
}