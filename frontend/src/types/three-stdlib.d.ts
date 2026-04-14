declare module "three/examples/jsm/loaders/STLLoader.js" {
  import { Loader } from "three";
  export class STLLoader extends Loader {
    load(
      url: string,
      onLoad: (geometry: any) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: unknown) => void
    ): void;
  }
}