import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import Header from "../headerComponents/Header";

function HostPage() {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const render = async () => {
      const dataRef = doc(offersCollection, params.id);
      const hostData = await getDoc(dataRef);
      setData({ ...hostData.data() });
    };
    render();
  }, [params.id]);

  return (
    <>
      <Header />
      <div>
        <img src={data.url} alt="img" />
      </div>
    </>
  );
}

export default HostPage;
