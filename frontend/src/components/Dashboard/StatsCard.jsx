import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const StatsCard = ({ title, value }) => (

      <Card className='w-[380px] text-center'>
             <CardHeader>
                <CardTitle>{title}</CardTitle>
                {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
            </CardHeader>
            <CardContent>
               <p>{value}</p>
            </CardContent>
           
        </Card>

//   <Card className="bg-white shadow-md rounded-lg p-6">
//     <div className="flex items-center">
//       {/* {Icon && <Icon className="text-blue-500 mr-4" />} */}
//       <div>
//         <p className="text-lg font-semibold">{title}</p>
//         <p className="text-2xl">{value}</p>
//       </div>
//     </div>
//   </Card>
);
