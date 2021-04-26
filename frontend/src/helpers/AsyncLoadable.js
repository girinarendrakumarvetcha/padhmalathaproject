import loadable from "react-loadable";
import LoadableLoading from "./LoadableLoading";
import { COMPONENT_TIMEOUT, COMPONENT_DELAY } from "../config/constants";

export default function asyncLoadable(
  importFn,
  loading = LoadableLoading,
  delay = COMPONENT_DELAY,
  timeout = COMPONENT_TIMEOUT
) {
  return loadable({
    loader: () => importFn(),
    loading: loading,
    delay: delay,
    timeout: timeout
  });
}
