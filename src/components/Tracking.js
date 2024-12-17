import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { CardContent, Card } from "./ui/card";
import '../css/Tracking.css';


ChartJS.register(ArcElement, Tooltip, Legend);
const sidebarItems = {
  provincial: ["Province 1", "Province 2", "Province 3"],
  local: ["Municipality 1", "Municipality 2"],
};

const data = {
  labels: [
    'A',
    'B',
    'C',
    'D'
  ],
  datasets: [{
    data: [400, 300, 300, 200],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
    ],
    borderWidth: 1,
  }]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Government Statistics',
    }
  }
}

function Tracking() {
  return (
    <>
      <div className="flex">
        <div className="h-screen w-48 border-r">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="main" className="accordionitem">
              <AccordionTrigger className="accordiontrigger">
                Main
              </AccordionTrigger>
            </AccordionItem>
            <AccordionItem value="provincial" className="accordionitem">
              <AccordionTrigger className="accordiontrigger">Provincial</AccordionTrigger>
              <AccordionContent >
                {sidebarItems.provincial.map((item) => (
                  <button
                    key={item}
                    className="w-full flex items-center px-4 py-2 hover:bg-muted text-sm font-medium"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {item}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="local" className="accordionitem-2">
              <AccordionTrigger className="accordiontrigger">Local</AccordionTrigger>
              <AccordionContent>
                {sidebarItems.local.map((item) => (
                  <button
                    key={item}
                    className="w-full flex items-center px-4 py-2 hover:bg-muted text-sm font-medium"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {item}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex-1 p-6">
          <Card>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <Pie data={data} options={options} />
              </div>
              <p className="mt-4 text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </CardContent>
          </Card>

        </div>
      </div >

    </>
  );
}

export default Tracking;
