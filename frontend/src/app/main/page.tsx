"use client";
import axios from "axios";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    axios.get("http://localhost:8080", {
      withCredentials: true,
    });
  }, []);
  return <div>page</div>;
}
