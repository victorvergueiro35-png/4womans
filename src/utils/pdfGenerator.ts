import { jsPDF } from 'jspdf';
import { AMALFI_PAGES } from '../data/amalfiPages';

export const generateAmalfiPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Cover Page
  doc.setFillColor(249, 245, 240); // Cream #F9F5F0
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative border
  doc.setDrawColor(139, 58, 90); // Burgundy #8B3A5A
  doc.setLineWidth(0.8);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);
  doc.setDrawColor(212, 165, 165); // Rose Gold #D4A5A5
  doc.setLineWidth(0.3);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // Logo & Title
  doc.setTextColor(139, 58, 90);
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  doc.text('4WOMANS', pageWidth / 2, 60, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(212, 165, 165);
  doc.text('DESENVOLVIMENTO E BELEZA FEMININA', pageWidth / 2, 68, { align: 'center' });

  doc.setTextColor(139, 58, 90);
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.text('DIETA AMALFITANA', pageWidth / 2, 100, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(44, 44, 44);
  doc.text('O Segredo das Mulheres Mais Lindas', pageWidth / 2, 112, { align: 'center' });
  doc.text('e Longevas do Mundo', pageWidth / 2, 120, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Manual Completo — 112 Páginas & Protocolo Integral', pageWidth / 2, 150, { align: 'center' });
  doc.text('Treinos em Casa 35+ • Diagnóstico • Cardápios • 30 Chás • Longevidade', pageWidth / 2, 158, { align: 'center' });

  doc.setFontSize(9);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth / 2, 260, { align: 'center' });

  // Generate pages for all 52 slides
  AMALFI_PAGES.forEach((page, index) => {
    doc.addPage();

    // Background
    doc.setFillColor(249, 245, 240);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header bar
    doc.setFillColor(139, 58, 90);
    doc.rect(0, 0, pageWidth, 16, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.text('4WOMANS  •  DIETA AMALFITANA', margin, 11);
    doc.text(`Página ${page.id} de 52`, pageWidth - margin, 11, { align: 'right' });

    // Chapter and Title
    let yPos = 30;

    doc.setTextColor(212, 165, 165);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text((page.chapter || 'DIETA AMALFITANA').toUpperCase(), margin, yPos);
    yPos += 7;

    doc.setTextColor(139, 58, 90);
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text(page.title, margin, yPos);
    yPos += 7;

    if (page.subtitle) {
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(11);
      doc.text(page.subtitle, margin, yPos);
      yPos += 10;
    } else {
      yPos += 4;
    }

    // Quote Box (if exists)
    if (page.quote) {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(212, 165, 165);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'FD');

      doc.setTextColor(139, 58, 90);
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      const splitQuote = doc.splitTextToSize(`"${page.quote}"`, contentWidth - 10);
      doc.text(splitQuote, margin + 5, yPos + 7);
      yPos += 28;
    }

    // Body Text
    doc.setTextColor(44, 44, 44);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    page.body.forEach((paragraph) => {
      const splitText = doc.splitTextToSize(paragraph, contentWidth);
      doc.text(splitText, margin, yPos);
      yPos += splitText.length * 5.5 + 3;
    });

    // Bullets (if exists)
    if (page.bullets && page.bullets.length > 0) {
      yPos += 2;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      page.bullets.forEach((bullet) => {
        const splitBullet = doc.splitTextToSize(bullet, contentWidth - 4);
        doc.text(splitBullet, margin + 2, yPos);
        yPos += splitBullet.length * 5 + 2;
      });
    }

    // Highlight Box (if exists)
    if (page.highlight) {
      yPos = Math.max(yPos + 4, 230);
      doc.setFillColor(235, 225, 228); // Soft Rose Tint
      doc.setDrawColor(139, 58, 90);
      doc.setLineWidth(0.6);
      doc.roundedRect(margin, yPos, contentWidth, 18, 2, 2, 'FD');

      doc.setTextColor(139, 58, 90);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      const splitHighlight = doc.splitTextToSize(`✦ REGRA DE OURO: ${page.highlight}`, contentWidth - 8);
      doc.text(splitHighlight, margin + 4, yPos + 6);
    }

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text('4womans — Desenvolvimento e Beleza Feminina', pageWidth / 2, pageHeight - 10, { align: 'center' });
  });

  // Save the PDF
  doc.save('4womans_Dieta_Amalfitana_Playbook_Completo.pdf');
};
