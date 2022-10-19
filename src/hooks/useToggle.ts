import useLocalStorage from "./useLocalStorage";

const useToggle = (key: string, initValue: any) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (value: boolean) => {
    setValue((prev: string) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };

  return [value, toggle];
};

export default useToggle;
