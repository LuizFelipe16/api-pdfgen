import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  // Toda font que estiver aqui vai estar disponível para ser usada
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique"
  }
}

// Tudo que pode ser inserido no pdf
const documentDefinitions: TDocumentDefinitions = {
  defaultStyle: { font: "Helvetica" },
  content: [
    { text: "Meu primeiro relatório PDF" }
  ]
}

export { fonts, documentDefinitions };