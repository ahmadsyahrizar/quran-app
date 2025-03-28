import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

{/* Tajweed Rules Reference */ }

export default function TajweedReference() {
 return (
  <Card className="mt-6">
   <CardHeader>
    <CardTitle>Tajweed Rules Reference</CardTitle>
   </CardHeader>
   <CardContent>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
     {[
      {
       name: 'Noon Sakinah',
       description: 'Rules for pronouncing noon with a sukoon',
       color: 'bg-blue-100 text-blue-800'
      },
      {
       name: 'Meem Sakinah',
       description: 'Rules for pronouncing meem with a sukoon',
       color: 'bg-green-100 text-green-800'
      },
      {
       name: 'Madd (Elongation)',
       description: 'Prolongation of vowel sounds',
       color: 'bg-purple-100 text-purple-800'
      },
      {
       name: 'Qalqalah',
       description: 'Vibration sound for certain letters',
       color: 'bg-red-100 text-red-800'
      },
      {
       name: 'Ikhfa',
       description: 'Hidden pronunciation of noon or tanween',
       color: 'bg-orange-100 text-orange-800'
      },
      {
       name: 'Idgham',
       description: 'Merging of similar consonant sounds',
       color: 'bg-teal-100 text-teal-800'
      }
     ].map((rule, index) => (
      <div
       key={index}
       className={`
            ${rule.color} 
            p-4 rounded-lg 
            flex flex-col 
            space-y-2
          `}
      >
       <h3 className="font-bold text-lg">{rule.name}</h3>
       <p className="text-sm">{rule.description}</p>
      </div>
     ))}
    </div>
   </CardContent>
  </Card>
 )
}  
