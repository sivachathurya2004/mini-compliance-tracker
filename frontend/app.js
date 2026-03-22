let selectedClient = null;

async function loadClients() {
    const res = await fetch('http://localhost:5000/clients');
    const clients = await res.json();

    const ul = document.getElementById('clients');
    ul.innerHTML = '';

    clients.forEach(c => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.innerText = c.company_name;

        li.onclick = () => {
            selectedClient = c.id;

            document.querySelectorAll('#clients li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');

            loadTasks();
        };

        ul.appendChild(li);
    });
}
async function loadTasks() {
    if (!selectedClient) return;

    const res = await fetch(`http://localhost:5000/tasks/${selectedClient}`);
    let tasks = await res.json();

    const filter = document.getElementById('statusFilter').value;

    if (filter) {
        tasks = tasks.filter(t => t.status === filter);
    }

    const ul = document.getElementById('tasks'); // ✅ IMPORTANT FIX
    ul.innerHTML = '';

    // ✅ EMPTY STATE
    if (tasks.length === 0) {
        ul.innerHTML = "<li class='list-group-item text-muted text-center'>No tasks yet</li>";
        return;
    }

    tasks.forEach(t => {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const today = new Date();
        const due = new Date(t.due_date);

        if (t.status === 'Pending' && due < today) {
            li.classList.add('overdue');
        }

        const leftDiv = document.createElement('div');
        leftDiv.innerHTML = `
            <strong>${t.title}</strong><br>
            <small>${t.category || ""}</small>
        `;

        const rightDiv = document.createElement('div');

        const badge = document.createElement('span');
        badge.className = `badge ${t.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`;
        badge.innerText = t.status;

        rightDiv.appendChild(badge);

        if (t.status === 'Pending') {
            const btn = document.createElement('button');
            btn.className = "btn btn-sm btn-success ms-2";
            btn.innerText = "Mark Complete";

            btn.onclick = async (e) => {
                e.stopPropagation();

                await fetch(`http://localhost:5000/tasks/${t.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Completed' })
                });

                loadTasks();
            };

            rightDiv.appendChild(btn);
        }

        li.appendChild(leftDiv);
        li.appendChild(rightDiv);

        ul.appendChild(li);
    });
}

async function addTask() {
    if (!selectedClient) {
        alert("Please select a client first!");
        return;
    }

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const due_date = document.getElementById('due_date').value;

    if (!title || !due_date) {
        alert("Title and due date are required!");
        return;
    }

    await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: selectedClient,
            title,
            category,
            due_date,
            status: 'Pending',
            priority: 'Medium'
        })
    });

    // clear inputs
    document.getElementById('title').value = '';
    document.getElementById('category').value = '';
    document.getElementById('due_date').value = '';

    
    alert("Task added successfully!");
    loadTasks();
}

loadClients();