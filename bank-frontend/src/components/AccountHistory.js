import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import Navbar from "./Navbar";
import '../styles/accdetails.css'

export default function AccountHistory() {
  const [history, setHistory] = useState("");

  useEffect(() => {
    axios
      .get("/acchistory")
      .then((res) => setHistory(res.data))
      .catch(() => setHistory("Failed to load history"));
  }, []);

  return <>
    <Navbar/>
     <pre>{history}</pre>
    </>;
}
