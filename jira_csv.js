function parseCSV(text) {
    const rows = [];
    let current = '';
    let inQuotes = false;
    const chars = text.trim();
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === '"') {
            if (inQuotes && chars[i + 1] === '"') { current += '"'; i++; }
            else { inQuotes = !inQuotes; }
        } else if (c === ',' && !inQuotes) {
            if (!rows.length || rows[rows.length - 1].done) { rows.push({ cells: [current], done: false }); }
            else { rows[rows.length - 1].cells.push(current); }
            current = '';
        } else if ((c === '\n' || c === '\r') && !inQuotes) {
            if (c === '\r' && chars[i + 1] === '\n') i++;
            if (!rows.length || rows[rows.length - 1].done) { rows.push({ cells: [current], done: true }); }
            else { rows[rows.length - 1].cells.push(current); rows[rows.length - 1].done = true; }
            current = '';
        } else {
            if (!rows.length || rows[rows.length - 1].done) { rows.push({ cells: [], done: false }); }
            current += c;
        }
    }
    if (current || (rows.length && !rows[rows.length - 1].done)) {
        if (!rows.length || rows[rows.length - 1].done) { rows.push({ cells: [current], done: true }); }
        else { rows[rows.length - 1].cells.push(current); }
    }
    return rows.map(r => r.cells);
}

function statusBadge(val) {
    const v = val.trim();
    if (v === 'Done') return '<span class="status-badge done">Done</span>';
    if (v === 'In Progress') return '<span class="status-badge in-progress">In Progress</span>';
    return '<span class="status-badge todo">' + v + '</span>';
}

function buildTable(rows, columns) {
    const header = rows[0];
    const colIdx = columns.map(c => header.findIndex(h => h.trim() === c));
    let html = '<table class="sprint-table"><thead><tr>';
    columns.forEach(c => { html += '<th>' + c + '</th>'; });
    html += '</tr></thead><tbody>';
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].every(c => !c.trim())) continue;
        html += '<tr>';
        colIdx.forEach((idx, j) => {
            const val = idx >= 0 && rows[i][idx] ? rows[i][idx].trim() : '—';
            html += '<td>' + (columns[j] === 'Status' ? statusBadge(val) : val) + '</td>';
        });
        html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
}

// Sprint 1 data
if (document.getElementById('planning-table')) {
    fetch('Sprint1_deliverables/Project_Planning_real.csv')
        .then(r => r.text())
        .then(text => {
            const rows = parseCSV(text);
            document.getElementById('planning-table').innerHTML =
                buildTable(rows, ['Issue key', 'Summary', 'Assignee', 'Status', 'Due date']);
        });
}

if (document.getElementById('backlog-table')) {
    fetch('Sprint1_deliverables/Project Backlog.csv')
        .then(r => r.text())
        .then(text => {
            const rows = parseCSV(text);
            document.getElementById('backlog-table').innerHTML =
                buildTable(rows, ['Issue key', 'Summary', 'Assignee', 'Priority', 'Status']);
        });
}

// Sprint 2 data
if (document.getElementById('sprint2-backlog-table')) {
    fetch('Sprint2_deliverables/Sprint2BacklogCSV.xlsx - Jira (3).csv')
        .then(r => r.text())
        .then(text => {
            const rows = parseCSV(text);
            document.getElementById('sprint2-backlog-table').innerHTML =
                buildTable(rows, ['Issue key', 'Summary', 'Assignee', 'Priority', 'Status']);
        });
}