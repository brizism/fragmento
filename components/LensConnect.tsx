import { useLens } from "../hooks/useLens";
import Button from "./Button";

export default function LensConnect() {
  const { isTokenValid, login } = useLens();

  if (isTokenValid) return null;

  return <Button onClick={login}>Login with Lens</Button>;
}
