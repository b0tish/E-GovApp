import "../css/Tracking.css";
import { useEffect, useState } from "react";
import { CardContent, Card } from "../components/ui/card";
import ProvinceList from "../components/ProvinceList";
import AddProvinceForm from "../components/AddProvinceForm";
import AddLocalForm from "../components/AddLocalForm";

function Tracking() {
  const [provinces, setProvinces] = useState([]);
  const [locals, setLocals] = useState([]);
  const [showAddProvinceForm, setShowAddProvinceForm] = useState(false);
  const [showAddLocalForm, setShowAddLocalForm] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:5000/provinces");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.log("province error");
      }
    };

    fetchProvinces();
  }, []);

  const handleAddProvinceClick = () => {
    setShowAddProvinceForm(true);
    setShowAddLocalForm(false);
  };

  const handleAddLocalClick = () => {
    setShowAddLocalForm(true);
    setShowAddProvinceForm(false);
  };

  const handleCloseForm = () => {
    setShowAddProvinceForm(false);
    setShowAddLocalForm(false);
  };

  return (
    <>
      <div>
        <button onClick={handleAddProvinceClick}>Add Province</button>
        <button onClick={handleAddLocalClick}>Add Local</button>
        <Card>
          <CardContent>Main</CardContent>
        </Card>
        <Card className="m-3">
          <p className="text-center">Province</p>
          <CardContent className="flex flex-wrap justify-center">
            <ProvinceList provinces={provinces} setProvinces={setProvinces} />
          </CardContent>
        </Card>
      </div>
      {showAddProvinceForm && (
        <AddProvinceForm
          onClose={handleCloseForm}
          setProvinces={setProvinces}
        />
      )}
      {showAddLocalForm && (
        <AddLocalForm
          onClose={handleCloseForm}
          provinces={provinces}
          setLocals={setLocals}
        />
      )}
    </>
  );
}

export default Tracking;
