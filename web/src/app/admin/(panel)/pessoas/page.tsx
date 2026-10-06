import Link from "next/link";
import { leadsForPerson, people, sourceLabel } from "@/lib/data";

export default function PeoplePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Pessoas</h1>
      <p className="mt-1 text-sm text-gray-500">O mesmo telefone reúne todos os interesses da pessoa.</p>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Origem</th>
              <th className="px-4 py-3">Interesses</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} className="border-b border-gray-50">
                <td className="px-4 py-3 font-medium">{person.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  {person.phone}
                  <div className="text-xs">{person.email}</div>
                </td>
                <td className="px-4 py-3">{sourceLabel[person.source]}</td>
                <td className="px-4 py-3">{leadsForPerson(person.id).length}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/pessoas/${person.id}`} className="text-primary-600">
                    Ficha
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
