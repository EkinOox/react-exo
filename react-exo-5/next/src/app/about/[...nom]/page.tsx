export default async function nom({
  params,
}: {
  params: Promise<{ nom: string }>
}) {
  const { nom } = await params
  return <div>My Post: {nom[0]}, Age = {nom[1]} ans</div>
}