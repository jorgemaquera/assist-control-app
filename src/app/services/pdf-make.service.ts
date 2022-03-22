import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PdfMakeService {
  constructor() {}

  createPdf(docDefinition: TDocumentDefinitions) {
    return pdfMake.createPdf(docDefinition);
  }
}
