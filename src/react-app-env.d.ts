/// <reference types="react-scripts" />
declare module '*.txt' {
  const content: string;
  export default content;
}
declare module 'js-md5' {
  const md5: (data: string) => string;
  export default md5;
}

declare global {
  interface Window {
    FLOW_WEB: Record<string, any>;
  }
}
