import { minikitConfig } from "../../../minikit.config";

export async function GET() {
  return Response.json({
    accountAssociation: minikitConfig.accountAssociation,
    baseBuilder: minikitConfig.baseBuilder,
    miniapp: minikitConfig.miniapp,
  });
}
