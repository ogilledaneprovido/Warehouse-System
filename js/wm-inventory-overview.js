let inventory = [
    { name: "Cement", category: "Binding", stock: 120, unit: "bags", status: "OK" },
    { name: "Rebar", category: "Steel", stock: 30, unit: "pcs", status: "Low" },
    { name: "Plywood", category: "Wood", stock: 75, unit: "sheets", status: "Medium" },
    { name: "Gravel", category: "Aggregate", stock: 200, unit: "kg", status: "OK" },
    { name: "Paint", category: "Finishing", stock: 12, unit: "cans", status: "Low" }
];

function renderInventory() {
    const tbody = document.getElementById('inventory-table-body');
    tbody.innerHTML = "";
    inventory.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.stock}</td>
            <td>${item.unit}</td>
            <td class="status-${item.status.toLowerCase()}">${item.status}</td>
            <td>
                <button class="action-btn" onclick="viewItem(${idx})">View</button>
                <button class="action-btn" onclick="openEditModal(${idx})">Edit</button>
                <button class="action-btn" onclick="openDeleteModal(${idx})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// View Modal logic
const viewModal = document.getElementById('viewModal');
const closeViewModal = document.getElementById('closeViewModal');
const viewItemDetails = document.getElementById('viewItemDetails');
function viewItem(idx) {
    const item = inventory[idx];
    viewItemDetails.innerHTML = `
        <strong>Material Name:</strong> ${item.name}<br>
        <strong>Category:</strong> ${item.category}<br>
        <strong>Stock:</strong> ${item.stock}<br>
        <strong>Unit:</strong> ${item.unit}<br>
        <strong>Status:</strong> ${item.status}
    `;
    viewModal.style.display = "flex";
}
closeViewModal.onclick = () => { viewModal.style.display = "none"; };

// Delete Modal logic
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const deleteItemDetails = document.getElementById('deleteItemDetails');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let deleteIdx = null;
function openDeleteModal(idx) {
    const item = inventory[idx];
    deleteItemDetails.innerHTML = `
        Are you sure you want to delete <strong>${item.name}</strong> (${item.category})?
    `;
    deleteModal.style.display = "flex";
    deleteIdx = idx;
}
closeDeleteModal.onclick = () => { deleteModal.style.display = "none"; };
cancelDeleteBtn.onclick = () => { deleteModal.style.display = "none"; };
confirmDeleteBtn.onclick = () => {
    if (deleteIdx !== null) {
        inventory.splice(deleteIdx, 1);
        renderInventory();
        deleteModal.style.display = "none";
        deleteIdx = null;
    }
};

// Modal logic for Add/Edit
const addModal = document.getElementById('addModal');
const openAddModalBtn = document.getElementById('openAddModalBtn');
const closeAddModal = document.getElementById('closeAddModal');
openAddModalBtn.onclick = () => { addModal.style.display = "flex"; };
closeAddModal.onclick = () => { addModal.style.display = "none"; };

const editModal = document.getElementById('editModal');
const closeEditModal = document.getElementById('closeEditModal');
closeEditModal.onclick = () => { editModal.style.display = "none"; };

window.openEditModal = openEditModal;
window.viewItem = viewItem;
window.openDeleteModal = openDeleteModal;

// Add Inventory Form
document.getElementById('addInventoryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newItem = {
        name: document.getElementById('materialName').value,
        category: document.getElementById('category').value,
        stock: document.getElementById('stock').value,
        unit: document.getElementById('unit').value,
        status: document.getElementById('status').value
    };
    inventory.push(newItem);
    renderInventory();
    document.getElementById('addSuccessMsg').textContent = 'Inventory item added successfully!';
    document.getElementById('addSuccessMsg').style.display = 'block';
    setTimeout(() => {
        document.getElementById('addSuccessMsg').style.display = 'none';
        document.getElementById('addInventoryForm').reset();
        addModal.style.display = "none";
    }, 1200);
});

// Edit Inventory Modal logic
function openEditModal(idx) {
    const item = inventory[idx];
    document.getElementById('editMaterialName').value = item.name;
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editStock').value = item.stock;
    document.getElementById('editUnit').value = item.unit;
    document.getElementById('editStatus').value = item.status;
    editModal.style.display = "flex";
    editModal.dataset.idx = idx;
}

// Edit Inventory Form
document.getElementById('editInventoryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const idx = editModal.dataset.idx;
    inventory[idx].name = document.getElementById('editMaterialName').value;
    inventory[idx].category = document.getElementById('editCategory').value;
    inventory[idx].stock = document.getElementById('editStock').value;
    inventory[idx].unit = document.getElementById('editUnit').value;
    inventory[idx].status = document.getElementById('editStatus').value;
    renderInventory();
    document.getElementById('editSuccessMsg').textContent = 'Inventory item updated successfully!';
    document.getElementById('editSuccessMsg').style.display = 'block';
    setTimeout(() => {
        document.getElementById('editSuccessMsg').style.display = 'none';
        editModal.style.display = "none";
    }, 1200);
});

// Global modal close on background click
window.onclick = function(event) {
    if (event.target === addModal) addModal.style.display = "none";
    if (event.target === editModal) editModal.style.display = "none";
    if (event.target === viewModal) viewModal.style.display = "none";
    if (event.target === deleteModal) deleteModal.style.display = "none";
};

// Initial render
renderInventory();
