// import { networkInterfaces } from "os";

export function prettifyNames(input: string): string {
  return input
    .split("_")
    .map((part, index) =>
      index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part
    )
    .join(" ");
}

export function colorAnalysisBorder(label: string): string {
  switch (label) {
    case "1":
      return "rgba(255, 10, 100, 1)";
    case "2":
      return "rgba(0, 255, 0, 1)";
    case "3":
      return "rgba(0, 0, 255, 1)";
    case "4":
      return "rgba(255, 255, 0, 1)";
    case "5":
      return "rgba(255, 0, 255, 1)";
    case "6":
      return "rgba(0, 255, 255, 1)";
    case "7":
      return "rgba(128, 128, 128, 1)";
    default:
      return "rgba(255, 0, 0, 1)";
  }
}

export async function getThisIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log("Your IP address is: ", data.ip);
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
}

export const ip = "192.168.16.71";
