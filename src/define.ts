import deepIterate from "@/utils/deep-iterate";
import getType from "@/utils/get-type";

type DefinitionMap = Record<Key, unknown>;
type Key = string;

export function define<TMap extends DefinitionMap>(definition: TMap) {
  return <K extends keyof TMap>(key: K): TMap[K] => {
    const value = definition[key];

    deepIterate(value, (key: string, value: unknown, path: string) => {
      const type = getType(value);
      // TODO: get fake value based on type

      // TODO: construct object property based on `path`

      console.log(
        "[>define]",
        "[key]",
        key,
        "[value]",
        "[path]",
        path,
        "[type]",
        type
      );
    });

    return value;
  };
}

export default define;
