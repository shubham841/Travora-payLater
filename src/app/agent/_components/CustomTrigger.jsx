"use client"
import { Menu } from "lucide-react"
import { useSidebar } from "./sidebar"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return <button  onClick={toggleSidebar} ><Menu/></button>
}