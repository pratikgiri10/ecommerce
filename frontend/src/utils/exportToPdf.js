import jsPdf from 'jspdf';
import {autoTable} from 'jspdf-autotable';

export const exportToPdf = (title, columns, rows) => {
    console.log(columns);
    

    const doc = new jsPdf()

    doc.text(title, 14, 10)
    autoTable(doc, {
        head: [columns],
        body: rows
    })
    doc.save('order.pdf')

}