import RootNavigator from "./navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}
