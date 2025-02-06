import "../css/Tracking.css";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

function Tracking() {
  const [provinces, setProvinces] = useState([]);
  const [locals, setLocals] = useState([]);
  const [selectedItem, setSelectedItem] = useState("main");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("/provinces");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.log("province error");
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const allLocals = [];
        for (const province of provinces) {
          const response = await fetch(`/province/${province._id0}/locals`);
          const data = await response.json();
          allLocals.push(...data);
        }
        setLocals(allLocals);
      } catch (error) {
        console.log("local error");
      }
    };

    if (provinces.lenght > 0) {
      fetchLocals();
    }
  }, [provinces]);

  const handleAccodionChange = (value) => {
    setSelectedItem(value);
  };

  return (
    <>
      <div className="flex">
        <div className="h-screen w-48 border-r">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={handleAccodionChange}
            value={selectedItem}
          >
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
                {provinces.map((province) => (
                  <button
                    key={province._id}
                    className="w-full flex items-center px-4 py-2 hover:bg-muted text-sm font-medium"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {province.name}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="local" className="accordionitem-2">
              <AccordionTrigger className="accordiontrigger">
                Local
              </AccordionTrigger>
              <AccordionContent>
                {locals.map((local) => (
                  <button
                    key={local._id}
                    className="w-full flex items-center px-4 py-2 hover:bg-muted text-sm font-medium"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {local.name}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex-1 p-6">
          {selectedItem === "main" && (
            <div>
              <h1>Content for main</h1>
              <button>Add Province</button>
            </div>
          )}
          {selectedItem === "provincial" && <div>Content for provincial</div>}
          {selectedItem === "local" && <div>Content for local</div>}
        </div>
      </div>
    </>
  );
}

export default Tracking;
