import { MainContainer } from "@/components/containers";
import { Permissions } from "@/pages/permissions-page";

export default function PermissionsPage() {
  const data = getData();
  return (
    <MainContainer>
      <Permissions />
    </MainContainer>
  );
}

function getData() {
  console.log("server side");
}
