window.onload = function () {
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.addEventListener("click", function () {
      const element = document.getElementById("payslipContainer");

      const opt = {
        margin: 0.3,
        filename: 'payslip.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      setTimeout(() => {
        html2pdf().set(opt).from(element).save();
      }, 100);
    });
  };