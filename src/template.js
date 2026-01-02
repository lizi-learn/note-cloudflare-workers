import { styles } from './styles.js';
import { script } from './script.js';

// HTML模板生成函数
export function getHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>临时笔记</title>
  <style>${styles}</style>
</head>
<body>
  <div class="app-container">
    <!-- 左侧目录面板 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-title">📁 目录</div>
        <button class="add-category-btn" onclick="addCategory()">+ 新建目录</button>
      </div>
      <div class="categories-list" id="categoriesList">
        <div class="loading">加载中...</div>
      </div>
    </div>
    
    <!-- 右侧内容区域 -->
    <div class="main-content">
      <div class="content-header">
        <div class="content-title" id="contentTitle">请选择目录</div>
        <button class="add-note-btn" id="addNoteBtn" onclick="addNote()" style="display: none;">+ 新建笔记</button>
      </div>
      <div class="notes-list" id="notesList">
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <div>请选择一个目录</div>
        </div>
      </div>
    </div>
  </div>
  
  <script>${script}</script>
</body>
</html>`;
}
