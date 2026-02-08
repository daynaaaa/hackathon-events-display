"use client"
import { useContext, useState } from "react";
import { User } from "../_lib/types";
import { AuthContext } from "../_context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
