import { RootStackParamList } from "./src/components/navigation/Navigation";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}