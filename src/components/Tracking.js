import "../css/Tracking.css";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
const sidebarItems = {
  provincial: ["Province 1", "Province 2", "Province 3"],
  local: ["Municipality 1", "Municipality 2"],
};

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
              <AccordionTrigger className="accordiontrigger">
                Provincial
              </AccordionTrigger>
              <AccordionContent>
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
              <AccordionTrigger className="accordiontrigger">
                Local
              </AccordionTrigger>
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
      </div>
    </>
  );
}

export default Tracking;
