import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setGlobalLoading, setLoading } from "../store/loadingSlice";


export const useLoading = (key?: string) => {
  const dispatch = useDispatch();

  const globalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading
  );

  const loadingMap = useSelector(
    (state: RootState) => state.loading.loadingMap
  );

  const loading = key ? loadingMap[key] : globalLoading;

  const start = () => {
    if (key) {
      dispatch(setLoading({ key, value: true }));
    } else {
      dispatch(setGlobalLoading(true));
    }
  };

  const stop = () => {
    if (key) {
      dispatch(setLoading({ key, value: false }));
    } else {
      dispatch(setGlobalLoading(false));
    }
  };

  return { loading, start, stop };
};