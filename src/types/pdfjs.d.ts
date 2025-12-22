declare module "pdfjs-dist/legacy/build/pdf" {
    const pdfjsLib: any;
    export default pdfjsLib;
    export const GlobalWorkerOptions: any;
    export function getDocument(src: any): any;
}

declare module "pdfjs-dist/legacy/build/pdf.worker.min.mjs";
declare module "pdfjs-dist/legacy/build/pdf.worker.min.js";
