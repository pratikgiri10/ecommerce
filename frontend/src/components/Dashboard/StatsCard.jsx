import { Icon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const StatsCard = ({stats}) => (

     <Card className="shadow-sm rounded-2xl">
            <CardContent className=" flex item-center justify-between p-4 ">
              
              <div className='flex flex-col items-start space-y-2'>
                  <p className="text-sm text-gray-500">{stats.label}</p>
                  <p className="text-xl font-semibold">{stats.value}</p>
              </div>
              <span className="text-3xl">{stats.icon}</span>
            </CardContent>
      </Card>

 
);
