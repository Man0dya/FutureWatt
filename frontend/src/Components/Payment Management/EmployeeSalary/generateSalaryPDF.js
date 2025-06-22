import pdfMake from '../../Utils/pdfSetup'; // adjust path as needed


export const generateSalaryPDF = (salaryData) => {
  const docDefinition = {
    content: [
      { text: "Salary Slip", style: "header" },
      { text: `Employee Name: ${salaryData.name}`, margin: [0, 10, 0, 2] },
      { text: `Employee ID: ${salaryData.employeeId}` },
      { text: `Email: ${salaryData.email}` },
      { text: `Month: ${salaryData.month} ${salaryData.year}`, margin: [0, 10, 0, 5] },
      {
        style: "tableExample",
        table: {
          widths: ["*", "*"],
          body: [
            ["Basic Salary", `Rs.${salaryData.basicSalary}`],
            ["Overtime Bonus", `Rs.${salaryData.overtimeBonus}`],
            ["Additional Bonus", `Rs.${salaryData.additionalBonus}`],
            ["Deductions", `Rs.${salaryData.deductions}`],
            [
              { text: "Net Salary", bold: true },
              { text: `Rs.${salaryData.netSalary}`, bold: true },
            ],
          ],
        },
      },
      { text: `Generated on: ${new Date().toLocaleDateString()}`, margin: [0, 20, 0, 0] },
    ],
    styles: {
      header: { fontSize: 18, bold: true, alignment: "center" },
      tableExample: { margin: [0, 5, 0, 15] },
    },
  };

  pdfMake.createPdf(docDefinition).open();
};
