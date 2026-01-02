// JavaScript应用逻辑
export const script = `
  let data = { categories: [], notes: [] };
  let currentCategoryId = null;
  let draggedElement = null;
  
  // 加载数据
  async function loadData() {
    try {
      const response = await fetch('/api/data');
      data = await response.json();
      if (!data.categories) data.categories = [];
      if (!data.notes) data.notes = [];
      renderCategories();
      if (data.categories.length > 0 && !currentCategoryId) {
        selectCategory(data.categories[0].id);
      } else if (currentCategoryId) {
        renderNotes(currentCategoryId);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    }
  }
  
  // 保存数据
  async function saveData() {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('保存数据失败:', error);
      alert('保存失败: ' + error.message);
    }
  }
  
  // 渲染目录列表
  function renderCategories() {
    const container = document.getElementById('categoriesList');
    if (data.categories.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📁</div><div>暂无目录</div></div>';
      return;
    }
    
    // 按order排序
    const sortedCategories = [...data.categories].sort((a, b) => (a.order || 0) - (b.order || 0));
    
    container.innerHTML = sortedCategories.map(category => \`
      <div class="category-item \${currentCategoryId === category.id ? 'active' : ''}" 
           draggable="true"
           data-id="\${category.id}"
           ondragstart="handleDragStart(event)"
           ondragover="handleDragOver(event)"
           ondrop="handleDrop(event)"
           ondragend="handleDragEnd(event)">
        <div class="category-name" onclick="selectCategory('\${category.id}')">\${escapeHtml(category.name)}</div>
        <div class="category-actions">
          <button class="category-btn" onclick="editCategory('\${category.id}')" title="编辑">✏️</button>
          <button class="category-btn delete" onclick="deleteCategory('\${category.id}')" title="删除">🗑️</button>
        </div>
      </div>
    \`).join('');
  }
  
  // 选择目录
  function selectCategory(categoryId) {
    currentCategoryId = categoryId;
    renderCategories();
    renderNotes(categoryId);
    document.getElementById('addNoteBtn').style.display = 'block';
    const category = data.categories.find(c => c.id === categoryId);
    document.getElementById('contentTitle').textContent = category ? category.name : '笔记';
  }
  
  // 添加目录
  function addCategory() {
    const name = prompt('请输入目录名称:');
    if (!name || !name.trim()) return;
    
    const newCategory = {
      id: Date.now().toString(),
      name: name.trim(),
      order: data.categories.length
    };
    
    data.categories.push(newCategory);
    renderCategories();
    selectCategory(newCategory.id);
    saveData();
  }
  
  // 编辑目录
  function editCategory(categoryId) {
    event.stopPropagation();
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const categoryItem = document.querySelector(\`.category-item[data-id="\${categoryId}"]\`);
    const nameDiv = categoryItem.querySelector('.category-name');
    const originalName = category.name;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'category-input';
    input.value = originalName;
    input.onblur = function() {
      const newName = input.value.trim();
      if (newName && newName !== originalName) {
        category.name = newName;
        renderCategories();
        saveData();
        if (currentCategoryId === categoryId) {
          document.getElementById('contentTitle').textContent = newName;
        }
      } else {
        nameDiv.textContent = originalName;
        nameDiv.style.display = 'block';
        input.remove();
      }
    };
    input.onkeydown = function(e) {
      if (e.key === 'Enter') {
        input.blur();
      } else if (e.key === 'Escape') {
        nameDiv.style.display = 'block';
        input.remove();
      }
    };
    
    nameDiv.style.display = 'none';
    categoryItem.insertBefore(input, nameDiv);
    input.focus();
    input.select();
  }
  
  // 删除目录
  function deleteCategory(categoryId) {
    event.stopPropagation();
    if (!confirm('确定要删除这个目录吗？目录下的所有笔记也会被删除。')) return;
    
    data.categories = data.categories.filter(c => c.id !== categoryId);
    data.notes = data.notes.filter(n => n.categoryId !== categoryId);
    
    if (currentCategoryId === categoryId) {
      currentCategoryId = null;
      document.getElementById('contentTitle').textContent = '请选择目录';
      document.getElementById('addNoteBtn').style.display = 'none';
      document.getElementById('notesList').innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><div>请选择一个目录</div></div>';
    }
    
    renderCategories();
    saveData();
  }
  
  // 拖拽排序
  function handleDragStart(e) {
    draggedElement = e.currentTarget;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const categoryItem = e.currentTarget.closest('.category-item');
    if (categoryItem && categoryItem !== draggedElement) {
      const rect = categoryItem.getBoundingClientRect();
      const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
      const allItems = Array.from(document.querySelectorAll('.category-item'));
      const draggedIndex = allItems.indexOf(draggedElement);
      const targetIndex = allItems.indexOf(categoryItem);
      
      if (next && draggedIndex < targetIndex) {
        categoryItem.parentNode.insertBefore(draggedElement, categoryItem.nextSibling);
      } else if (!next && draggedIndex > targetIndex) {
        categoryItem.parentNode.insertBefore(draggedElement, categoryItem);
      }
    }
  }
  
  function handleDrop(e) {
    e.preventDefault();
    updateCategoryOrder();
  }
  
  function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    updateCategoryOrder();
    draggedElement = null;
  }
  
  function updateCategoryOrder() {
    const items = document.querySelectorAll('.category-item');
    items.forEach((item, index) => {
      const categoryId = item.getAttribute('data-id');
      const category = data.categories.find(c => c.id === categoryId);
      if (category) {
        category.order = index;
      }
    });
    saveData();
  }
  
  // 渲染笔记列表
  function renderNotes(categoryId) {
    const container = document.getElementById('notesList');
    const notes = data.notes.filter(n => n.categoryId === categoryId);
    
    if (notes.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><div>暂无笔记，点击上方按钮添加</div></div>';
      return;
    }
    
    container.innerHTML = notes.map(note => \`
      <div class="note-item" data-id="\${note.id}">
        <div class="note-content">\${escapeHtml(note.content).replace(/\\n/g, '<br>')}</div>
        <div class="note-actions">
          <button class="note-btn edit" onclick="editNote('\${note.id}')" title="编辑">✏️</button>
          <button class="note-btn delete" onclick="deleteNote('\${note.id}')" title="删除">🗑️</button>
        </div>
      </div>
    \`).join('');
  }
  
  // 添加笔记
  function addNote() {
    if (!currentCategoryId) return;
    
    const newNote = {
      id: Date.now().toString(),
      categoryId: currentCategoryId,
      content: '',
      createdAt: new Date().toISOString()
    };
    
    data.notes.push(newNote);
    renderNotes(currentCategoryId);
    editNote(newNote.id);
    saveData();
  }
  
  // 编辑笔记
  function editNote(noteId) {
    const note = data.notes.find(n => n.id === noteId);
    if (!note) return;
    
    const noteItem = document.querySelector(\`.note-item[data-id="\${noteId}"]\`);
    if (!noteItem) return;
    
    const contentDiv = noteItem.querySelector('.note-content');
    const originalContent = note.content;
    
    noteItem.classList.add('editing');
    
    const textarea = document.createElement('textarea');
    textarea.className = 'note-input';
    textarea.value = originalContent;
    
    // 保存处理函数
    const saveHandler = () => {
      const newContent = textarea.value.trim();
      note.content = newContent;
      renderNotes(currentCategoryId);
      saveData();
    };
    
    // 取消处理函数
    const cancelHandler = () => {
      renderNotes(currentCategoryId);
    };
    
    textarea.onkeydown = function(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        cancelHandler();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        saveHandler();
      }
    };
    
    contentDiv.style.display = 'none';
    noteItem.insertBefore(textarea, contentDiv);
    
    // 更新操作按钮
    const actions = noteItem.querySelector('.note-actions');
    const saveBtn = document.createElement('button');
    saveBtn.className = 'note-btn save';
    saveBtn.textContent = '✓';
    saveBtn.title = '保存 (Ctrl+Enter)';
    saveBtn.onclick = () => saveHandler();
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'note-btn cancel';
    cancelBtn.textContent = '✕';
    cancelBtn.title = '取消 (Esc)';
    cancelBtn.onclick = () => cancelHandler();
    
    actions.innerHTML = '';
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }
  
  // 取消编辑（兼容性函数）
  function cancelEditNote(noteId) {
    renderNotes(currentCategoryId);
  }
  
  // 删除笔记
  function deleteNote(noteId) {
    if (!confirm('确定要删除这条笔记吗？')) return;
    
    data.notes = data.notes.filter(n => n.id !== noteId);
    renderNotes(currentCategoryId);
    saveData();
  }
  
  // 工具函数
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    loadData();
  });
`;
