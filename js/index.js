var STORAGE_KEY = "contacthub_contacts";

var GROUP_COLORS = {
  family:  { bg: "#ecfdf5", text: "#059669" },
  friends: { bg: "#eff6ff", text: "#2563eb" },
  work:    { bg: "#f5f3ff", text: "#7c3aed" },
  school:  { bg: "#fff7ed", text: "#ea580c" },
  other:   { bg: "#f1f5f9", text: "#475569" }
};

var RULES = {
  name:  { required: true,  test: function(v) { return /^[A-Za-z\u0600-\u06FF\s]{2,50}$/.test(v.trim()); } },
  phone: { required: true,  test: function(v) { return /^(01)[0125][0-9]{8}$/.test(v.trim()); } },
  email: { required: false, test: function(v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } }
};

var contacts   = loadContacts();
var editingId  = null;
var avatarDataUrl = "";

var modalEl = document.getElementById("contactModal");
var bsModal = new bootstrap.Modal(modalEl);

function loadContacts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveContacts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function getField(id) {
  return document.getElementById(id);
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(function(w) { return w[0]; }).join("").toUpperCase();
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

function avatarHtml(c) {
  if (c.avatar) {
    return '<img src="' + c.avatar + '" alt="' + escapeHtml(c.name) + '">';
  }
  return escapeHtml(initials(c.name));
}

function render() {
  getField("statTotal").textContent     = contacts.length;
  getField("statFavorites").textContent = contacts.filter(function(c) { return c.favorite; }).length;
  getField("statEmergency").textContent = contacts.filter(function(c) { return c.emergency; }).length;

  renderGrid();
  renderSideList("favoritesList",  contacts.filter(function(c) { return c.favorite; }),  "No favorites yet",               "fa-star");
  renderSideList("emergencyList",  contacts.filter(function(c) { return c.emergency; }), "No emergency contacts yet",      "fa-heart-pulse");
}

function renderGrid() {
  var grid = getField("contactsGrid");
  var term = getField("searchInput").value.trim().toLowerCase();

  var filtered = contacts;
  if (term) {
    filtered = contacts.filter(function(c) {
      return c.name.toLowerCase().includes(term) ||
             c.phone.toLowerCase().includes(term) ||
             (c.email || "").toLowerCase().includes(term);
    });
  }

  if (filtered.length === 0) {
    var msg = contacts.length === 0
      ? 'No contacts yet. Click "Add Contact" to get started.'
      : "No contacts match your search.";
    grid.innerHTML = '<div class="col-12"><div class="empty-state contact-card py-5"><i class="fa-solid fa-address-book fa-2x mb-2 d-block"></i>' + msg + '</div></div>';
    return;
  }

  grid.innerHTML = filtered.map(buildCardHtml).join("");
}

function buildCardHtml(c) {
  var gc = GROUP_COLORS[c.group];
  var groupBadge = gc ? '<span class="badge-group mt-1 d-inline-block" style="background:' + gc.bg + ';color:' + gc.text + ';">' + escapeHtml(c.group) + '</span>' : "";
  var emailRow   = c.email   ? '<p class="small text-muted mb-1 text-truncate"><i class="fa-solid fa-envelope fa-xs me-1"></i>' + escapeHtml(c.email)   + '</p>' : "";
  var addressRow = c.address ? '<p class="small text-muted mb-1 text-truncate"><i class="fa-solid fa-location-dot fa-xs me-1"></i>' + escapeHtml(c.address) + '</p>' : "";
  var notesRow   = c.notes   ? '<p class="small text-muted mt-2 mb-0 fst-italic">' + escapeHtml(c.notes) + '</p>' : "";

  return '<div class="col-sm-6">' +
    '<div class="contact-card p-3 h-100">' +
      '<div class="d-flex gap-3">' +
        '<div class="contact-avatar">' + avatarHtml(c) + '</div>' +
        '<div class="flex-grow-1 min-w-0">' +
          '<div class="d-flex justify-content-between align-items-start">' +
            '<h3 class="h6 fw-bold mb-1 text-truncate">' + escapeHtml(c.name) + '</h3>' +
            '<div class="d-flex gap-1 flex-shrink-0">' +
              '<button class="icon-btn ' + (c.favorite  ? "active-fav" : "") + '" title="Toggle favorite"  onclick="toggleFavorite(\'' + c.id + '\')">' +
                '<i class="fa-solid fa-star small"></i></button>' +
              '<button class="icon-btn ' + (c.emergency ? "active-emg" : "") + '" title="Toggle emergency" onclick="toggleEmergency(\'' + c.id + '\')">' +
                '<i class="fa-solid fa-heart-pulse small"></i></button>' +
            '</div>' +
          '</div>' +
          '<p class="small text-muted mb-1"><i class="fa-solid fa-phone fa-xs me-1"></i>' + escapeHtml(c.phone) + '</p>' +
          emailRow + addressRow + groupBadge + notesRow +
          '<div class="d-flex gap-2 mt-3">' +
            '<button class="btn btn-sm btn-light rounded-3 flex-fill" onclick="openEditModal(\'' + c.id + '\')">' +
              '<i class="fa-solid fa-pen small me-1"></i>Edit</button>' +
            '<button class="btn btn-sm btn-outline-danger rounded-3 flex-fill" onclick="deleteContact(\'' + c.id + '\')">' +
              '<i class="fa-solid fa-trash small me-1"></i>Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderSideList(containerId, list, emptyMsg, icon) {
  var el = getField(containerId);

  if (list.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fa-solid ' + icon + ' fa-lg mb-2 d-block"></i>' + emptyMsg + '</div>';
    return;
  }

  el.innerHTML = list.map(function(c) {
    return '<div class="mini-contact">' +
      '<div class="mini-avatar">' + avatarHtml(c) + '</div>' +
      '<div class="flex-grow-1 min-w-0">' +
        '<p class="small fw-semibold mb-0 text-truncate">' + escapeHtml(c.name) + '</p>' +
        '<p class="text-muted mb-0 text-truncate side-sub">' + escapeHtml(c.phone) + '</p>' +
      '</div>' +
    '</div>';
  }).join("");
}

function clearErrors() {
  for (var name in RULES) {
    getField("contact" + capitalize(name) + "Error").classList.add("d-none");
    getField("contact" + capitalize(name)).classList.remove("is-invalid");
  }
}

function openAddModal() {
  editingId     = null;
  avatarDataUrl = "";
  getField("modalTitle").textContent         = "Add New Contact";
  getField("contactForm").reset();
  getField("contactId").value                = "";
  getField("avatarPreview").innerHTML        = '<i class="fa-solid fa-user"></i>';
  clearErrors();
  bsModal.show();
}

function openEditModal(id) {
  var c = contacts.find(function(x) { return x.id === id; });
  if (!c) return;

  editingId     = id;
  avatarDataUrl = c.avatar || "";

  getField("modalTitle").textContent         = "Edit Contact";
  getField("contactId").value                = c.id;
  getField("contactName").value              = c.name;
  getField("contactPhone").value             = c.phone;
  getField("contactEmail").value             = c.email    || "";
  getField("contactAddress").value           = c.address  || "";
  getField("contactGroup").value             = c.group    || "";
  getField("contactNotes").value             = c.notes    || "";
  getField("contactFavorite").checked        = !!c.favorite;
  getField("contactEmergency").checked       = !!c.emergency;
  getField("avatarPreview").innerHTML        = avatarHtml(c);

  clearErrors();
  bsModal.show();
}

function handleAvatarChange(e) {
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(ev) {
    avatarDataUrl = ev.target.result;
    getField("avatarPreview").innerHTML = '<img src="' + avatarDataUrl + '" alt="avatar">';
  };
  reader.readAsDataURL(file);
}

function handleSubmit(e) {
  e.preventDefault();
  clearErrors();

  var values = {};
  var valid  = true;

  for (var name in RULES) {
    var input = getField("contact" + capitalize(name));
    values[name] = input.value.trim();
    if (!RULES[name].test(values[name])) {
      getField("contact" + capitalize(name) + "Error").classList.remove("d-none");
      input.classList.add("is-invalid");
      valid = false;
    }
  }

  if (!valid) return;

  var data = {
    name:      values.name,
    phone:     values.phone,
    email:     values.email,
    address:   getField("contactAddress").value.trim(),
    group:     getField("contactGroup").value,
    notes:     getField("contactNotes").value.trim(),
    favorite:  getField("contactFavorite").checked,
    emergency: getField("contactEmergency").checked,
    avatar:    avatarDataUrl
  };

  if (editingId) {
    var idx = contacts.findIndex(function(c) { return c.id === editingId; });
    contacts[idx] = Object.assign({}, contacts[idx], data);
  } else {
    data.id = "c_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
    contacts.push(data);
  }

  saveContacts();
  render();
  bsModal.hide();

  if (window.Swal) {
    Swal.fire({
      icon: "success",
      title: editingId ? "Contact updated" : "Contact added",
      timer: 1400,
      showConfirmButton: false
    });
  }
}

function deleteContact(id) {
  var c = contacts.find(function(x) { return x.id === id; });
  if (!c) return;

  function doDelete() {
    contacts = contacts.filter(function(x) { return x.id !== id; });
    saveContacts();
    render();
  }

  if (window.Swal) {
    Swal.fire({
      title: "Delete " + c.name + "?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
      cancelButtonText: "Cancel"
    }).then(function(result) {
      if (result.isConfirmed) doDelete();
    });
  } else if (confirm("Delete " + c.name + "?")) {
    doDelete();
  }
}

function toggleFavorite(id) {
  var c = contacts.find(function(x) { return x.id === id; });
  if (!c) return;
  c.favorite = !c.favorite;
  saveContacts();
  render();
}

function toggleEmergency(id) {
  var c = contacts.find(function(x) { return x.id === id; });
  if (!c) return;
  c.emergency = !c.emergency;
  saveContacts();
  render();
}

getField("addContactBtn").addEventListener("click", openAddModal);
getField("contactForm").addEventListener("submit", handleSubmit);
getField("avatarInput").addEventListener("change", handleAvatarChange);
getField("searchInput").addEventListener("input", renderGrid);

modalEl.addEventListener("hidden.bs.modal", function() {
  getField("contactForm").reset();
  clearErrors();
  editingId     = null;
  avatarDataUrl = "";
});

render();
