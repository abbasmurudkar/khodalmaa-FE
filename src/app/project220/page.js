// page.js

import MachinesDashboard from "./Machine";

export default async function Page() {
  // Get initial data from backend
  const res = await fetch("https://be.khodalmaa.in/api/v1/project1_latest", { cache: "no-store" });
  const initialData = await res.json();

  return <MachinesDashboard initialData={initialData} />;
}
