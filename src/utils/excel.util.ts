import * as XLSX from 'xlsx';

// Дані для таблиці
export function generateExcelUtil() {
    const data = [
        ["Ім'я", "Вік", "Місто"],
        ["Олександр", 25, "Київ"],
        ["Марія", 30, "Львів"]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "example.xlsx");
}
