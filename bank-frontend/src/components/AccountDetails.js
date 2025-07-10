import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

import Footer from './Footer'
import Navbar from "./Navbar";
import '../styles/accdetails.css'

export default function AccountDetails() {
  const [details, setDetails] = useState("");

  useEffect(() => {
    axios
      .get("/mydetails")
      .then((res) => setDetails(res.data))
      .catch(() => setDetails("Failed to load details"));
  }, []);

  return <>
    <Navbar/>
     <pre>{details}</pre>;
     {console.log(details)}
     <Footer/>
  </>
}
