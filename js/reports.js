const searchInput = document.getElementById('searchTable');
const tableRows = document.querySelectorAll('#reportsTable tbody tr');

searchInput.addEventListener('keyup', function () {
    const filter = this.value.toUpperCase();
    tableRows.forEach(r => {
        const plate = r.cells[1].innerText.toUpperCase();
        const receipt = r.cells[0].innerText.toUpperCase();
        r.style.display = (plate.includes(filter) || receipt.includes(filter)) ? '' : 'none';
    });
});

// Pagination (5 rows per page)
let currentPage = 1;
const rowsPerPage = 5;

function showPage(page) {
    const rows = Array.from(tableRows);
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    rows.forEach((r, i) => r.style.display = (i >= start && i < end) ? '' : 'none');
    currentPage = page;
}
document.querySelectorAll('.pagination button').forEach(btn => {
    btn.addEventListener('click', function () {
        const action = this.innerText.toLowerCase();
        const totalPages = Math.ceil(tableRows.length / rowsPerPage);
        if (action === 'previous') showPage(Math.max(1, currentPage - 1));
        else if (action === 'next') showPage(Math.min(totalPages, currentPage + 1));
        else showPage(parseInt(action));
    });
});
showPage(1);