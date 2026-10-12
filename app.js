(() => {
  'use strict';
  const STORAGE_KEY = 'bugun-panel-v1';
  const $ = (selector) => document.querySelector(selector);
  const els = {
    date: $('#dateLabel'), title: $('#pageTitle'), subtitle: $('#subtitle'), breadcrumb: $('#breadcrumbTitle'),
    taskList: $('#taskList'), taskHeading: $('#taskHeading'), taskDescription: $('#taskDescription'), taskTotal: $('#taskTotal'),
    todayCount: $('#todayCount'), doneCount: $('#doneCount'), remainingCount: $('#remainingCount'), progressText: $('#progressText'),
    progressDetail: $('#progressDetail'), progressPercent: $('#progressPercent'), ring: $('#progressRing'), habitList: $('#habitList'),
    habitProgress: $('#habitProgress'), note: $('#quickNote'), noteStatus: $('#noteStatus'), noteCount: $('#noteCount'),
    dialog: $('#taskDialog'), form: $('#taskForm'), dialogTitle: $('#dialogTitle'), saveTask: $('#saveTask'), taskName: $('#taskName'),
    taskPriority: $('#taskPriority'), taskDue: $('#taskDue'), toast: $('#toast')
  };
  const today = localDateKey(new Date());
  let state, filter = 'today', editingId = null, toastTimer;
  function localDateKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function freshState() { return { tasks: [], notes: '', habits: [{ id: uid(), name: 'Su iç', emoji: '💧', checkedDate: '' }, { id: uid(), name: 'Biraz hareket et', emoji: '🌿', checkedDate: '' }, { id: uid(), name: 'Kitap oku', emoji: '📖', checkedDate: '' }] }; }
  function uid() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; }
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return freshState();
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.habits)) throw new Error('Beklenmeyen veri biçimi');
      return { tasks: parsed.tasks.filter(t => t && typeof t.id === 'string' && typeof t.title === 'string').map(t => ({...t, completed: !!t.completed, priority: ['low','medium','high'].includes(t.priority) ? t.priority : 'medium'})), notes: typeof parsed.notes === 'string' ? parsed.notes : '', habits: parsed.habits.filter(h => h && typeof h.id === 'string' && typeof h.name === 'string').map(h => ({...h, emoji: h.emoji || '✳'})) };
    } catch (error) { console.error('Bugün verileri okunamadı:', error); setTimeout(() => showToast('Kayıtlı veriler okunamadı. Yeni bir liste açıldı.'), 0); return freshState(); }
  }
  state = load();
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; } catch (error) { console.error('Bugün verileri kaydedilemedi:', error); showToast('Kaydedilemedi. Tarayıcı alanını kontrol et.'); return false; } }
  function showToast(message) { els.toast.textContent = message; els.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2600); }
  const priorityNames = { high: 'Yüksek öncelik', medium: 'Normal öncelik', low: 'Düşük öncelik' };
  function formatDue(date) { if (!date) return ''; if (date === today) return 'Bugün'; const d = new Date(`${date}T12:00:00`); return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(d); }
  function visibleTasks() {
    if (filter === 'completed') return state.tasks.filter(t => t.completed).sort((a,b) => (b.completedAt || '').localeCompare(a.completedAt || ''));
    if (filter === 'upcoming') return state.tasks.filter(t => !t.completed && t.due && t.due > today).sort((a,b) => a.due.localeCompare(b.due));
    return state.tasks.filter(t => !t.completed && (!t.due || t.due <= today)).sort((a,b) => ({high:0,medium:1,low:2}[a.priority]-({high:0,medium:1,low:2}[b.priority])) || (a.createdAt || '').localeCompare(b.createdAt || ''));
  }
  function renderTasks() {
    const list = visibleTasks(); els.taskList.replaceChildren(); els.taskTotal.textContent = list.length;
    const titles = {today:['Görevlerin','Aklındakileri sıraya koy.'],upcoming:['Yaklaşan görevler','Önündeki günlere göz at.'],completed:['Tamamlananlar','Bugüne kadar yaptıklarına bak.']};
    els.taskHeading.textContent = titles[filter][0]; els.taskDescription.textContent = titles[filter][1];
    if (!list.length) {
      const empty = document.createElement('div'); empty.className = 'empty-state';
      const icon = document.createElement('span'); icon.className = 'empty-illustration'; icon.textContent = filter === 'completed' ? '✓' : filter === 'upcoming' ? '☼' : '✦';
      const strong = document.createElement('strong'); strong.textContent = filter === 'completed' ? 'Henüz tamamlanan görev yok' : filter === 'upcoming' ? 'Takviminde yaklaşan görev yok' : 'Bugün için listen tertemiz';
      const p = document.createElement('p'); p.textContent = filter === 'completed' ? 'Bir görevi bitirdiğinde burada göreceksin.' : filter === 'upcoming' ? 'Son tarih eklediğin görevler burada görünür.' : 'Yeni bir görev ekleyerek başlayabilirsin.';
      empty.append(icon,strong,p); els.taskList.append(empty);
    }
    list.forEach(task => {
      const row = document.createElement('div'); row.className = `task-row${task.completed ? ' is-done' : ''}`;
      const check = document.createElement('input'); check.type = 'checkbox'; check.className = 'task-check'; check.checked = task.completed; check.setAttribute('aria-label', `${task.title} görevini ${task.completed ? 'tamamlanmadı' : 'tamamlandı'} olarak işaretle`); check.addEventListener('change', () => { task.completed = check.checked; task.completedAt = check.checked ? new Date().toISOString() : ''; save(); render(); });
      const info = document.createElement('div'); info.className = 'task-info'; const name = document.createElement('div'); name.className = 'task-title'; name.textContent = task.title;
      const meta = document.createElement('div'); meta.className = 'task-meta'; const priority = document.createElement('span'); priority.className = `priority ${task.priority}`; priority.textContent = priorityNames[task.priority]; meta.append(priority);
      if (task.due) { const due = document.createElement('span'); due.className = `task-date${task.due < today && !task.completed ? ' overdue' : ''}`; due.textContent = `· ${formatDue(task.due)}`; meta.append(due); }
      info.append(name,meta); const actions = document.createElement('div'); actions.className = 'row-actions';
      const edit = document.createElement('button'); edit.type = 'button'; edit.textContent = '✎'; edit.title = 'Görevi düzenle'; edit.setAttribute('aria-label', `${task.title} görevini düzenle`); edit.addEventListener('click', () => openTask(task));
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.title = 'Görevi sil'; remove.setAttribute('aria-label', `${task.title} görevini sil`); remove.addEventListener('click', () => { state.tasks = state.tasks.filter(t => t.id !== task.id); save(); render(); showToast('Görev silindi.'); });
      actions.append(edit,remove); row.append(check,info,actions); els.taskList.append(row);
    });
  }
  function renderProgress() {
    const active = state.tasks.filter(t => !t.completed && (!t.due || t.due <= today)); const done = state.tasks.filter(t => t.completed && t.completedAt && localDateKey(new Date(t.completedAt)) === today); const count = active.length + done.length; const percent = count ? Math.round(done.length / count * 100) : 0;
    els.todayCount.textContent = active.length; els.doneCount.textContent = done.length; els.remainingCount.textContent = active.length; els.progressPercent.textContent = `${percent}%`; els.ring.style.background = `conic-gradient(#62836a ${percent}%, #e9eee7 ${percent}%)`; els.ring.setAttribute('aria-label', `Tamamlanma yüzde ${percent}`);
    els.progressText.textContent = count ? (percent === 100 ? 'Harika, bugünlük her şey tamam!' : percent >= 60 ? 'Çok iyi gidiyorsun!' : 'Güzel bir başlangıç yaptın') : 'Güzel bir başlangıç yapabilirsin';
    els.progressDetail.textContent = count ? `${done.length} görev tamamlandı · ${active.length} görev kaldı` : 'Bir görev ekleyerek gününü şekillendir.';
  }
  function renderHabits() {
    els.habitList.replaceChildren(); const checked = state.habits.filter(h => h.checkedDate === today).length; els.habitProgress.textContent = `${checked}/${state.habits.length}`;
    if (!state.habits.length) { const p = document.createElement('p'); p.className = 'habit-empty'; p.textContent = 'Küçük bir alışkanlık ekleyerek başlayabilirsin.'; els.habitList.append(p); }
    state.habits.forEach(habit => { const row = document.createElement('div'); row.className = `habit-row${habit.checkedDate === today ? ' complete' : ''}`; const check = document.createElement('input'); check.type = 'checkbox'; check.className = 'habit-check'; check.checked = habit.checkedDate === today; check.setAttribute('aria-label', `${habit.name} alışkanlığını bugün ${check.checked ? 'tamamlanmadı' : 'tamamlandı'} olarak işaretle`); check.addEventListener('change', () => { habit.checkedDate = check.checked ? today : ''; save(); renderHabits(); }); const emoji = document.createElement('span'); emoji.className = 'habit-emoji'; emoji.textContent = habit.emoji; const name = document.createElement('span'); name.className = 'habit-name'; name.textContent = habit.name; const del = document.createElement('button'); del.className = 'icon-button'; del.type = 'button'; del.textContent = '×'; del.title = 'Alışkanlığı sil'; del.setAttribute('aria-label', `${habit.name} alışkanlığını sil`); del.addEventListener('click', () => { state.habits = state.habits.filter(h => h.id !== habit.id); save(); renderHabits(); }); row.append(check,emoji,name,del); els.habitList.append(row); });
  }
  function render() { renderTasks(); renderProgress(); renderHabits(); document.querySelectorAll('[data-filter]').forEach(button => { const selected = button.dataset.filter === filter; if (button.classList.contains('filter-tab')) { button.classList.toggle('selected', selected); button.setAttribute('aria-selected', String(selected)); } else button.classList.toggle('active', selected); }); }
  function setFilter(next) { filter = next; els.breadcrumb.textContent = next === 'today' ? 'Bugün' : next === 'upcoming' ? 'Yaklaşan' : 'Tamamlanan'; els.title.innerHTML = next === 'today' ? 'Güne merhaba<span class="wave"> ✳</span>' : next === 'upcoming' ? 'Önündeki günler<span class="wave"> ✳</span>' : 'Neler başardın?<span class="wave"> ✳</span>'; els.subtitle.textContent = next === 'today' ? 'Bugün için küçük bir plan, büyük bir fark yaratabilir.' : next === 'upcoming' ? 'Planların hazır, gerisi adım adım.' : 'Tamamladığın her şey için kendine teşekkür et.'; render(); }
  function openTask(task = null) { editingId = task?.id || null; els.dialogTitle.textContent = task ? 'Görevi düzenle' : 'Yeni görev'; els.saveTask.textContent = task ? 'Değişiklikleri kaydet' : 'Görevi ekle'; els.taskName.value = task?.title || ''; els.taskPriority.value = task?.priority || 'medium'; els.taskDue.value = task?.due || ''; els.dialog.showModal(); els.taskName.focus(); }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  $('#addTaskTop').addEventListener('click', () => openTask()); $('#addTaskInline').addEventListener('click', () => openTask());
  $('#cancelTask').addEventListener('click', () => els.dialog.close()); $('.close-dialog').addEventListener('click', () => els.dialog.close());
  els.dialog.addEventListener('click', event => { if (event.target === els.dialog) els.dialog.close(); });
  els.form.addEventListener('submit', event => { event.preventDefault(); const title = els.taskName.value.trim(); if (!title) { els.taskName.focus(); return; } const due = els.taskDue.value; if (due && !/^\d{4}-\d{2}-\d{2}$/.test(due)) { showToast('Geçerli bir son tarih seç.'); return; } if (editingId) { const task = state.tasks.find(t => t.id === editingId); if (task) Object.assign(task, { title, priority: els.taskPriority.value, due }); } else state.tasks.push({ id: uid(), title, priority: els.taskPriority.value, due, completed: false, createdAt: new Date().toISOString() }); save(); els.dialog.close(); els.form.reset(); els.taskPriority.value = 'medium'; render(); showToast(editingId ? 'Görev güncellendi.' : 'Görev eklendi.'); editingId = null; });
  $('#moreTasks').addEventListener('click', () => { const completed = state.tasks.filter(t => t.completed); if (!completed.length) { showToast('Temizlenecek tamamlanmış görev yok.'); return; } state.tasks = state.tasks.filter(t => !t.completed); save(); render(); showToast(`${completed.length} tamamlanmış görev silindi.`); });
  function addHabit() { const name = window.prompt('Alışkanlığın adı ne olsun?'); if (name === null) return; if (!name.trim()) { showToast('Alışkanlık adı boş olamaz.'); return; } state.habits.push({ id: uid(), name: name.trim().slice(0,50), emoji: '✳', checkedDate: '' }); save(); renderHabits(); }
  $('#addHabit').addEventListener('click', addHabit); $('#addHabitText').addEventListener('click', addHabit);
  els.note.value = state.notes; els.noteCount.textContent = `${state.notes.length} / 2000`; let noteTimer;
  els.note.addEventListener('input', () => { els.noteCount.textContent = `${els.note.value.length} / 2000`; els.noteStatus.textContent = 'Kaydediliyor…'; clearTimeout(noteTimer); noteTimer = setTimeout(() => { state.notes = els.note.value; const ok = save(); els.noteStatus.textContent = ok ? 'Kaydedildi' : 'Kaydedilemedi'; }, 250); });
  els.date.textContent = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  render();
})();
