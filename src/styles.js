// CSS样式
export const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    height: 100vh;
    display: flex;
    background: #f5f5f5;
    overflow: hidden;
  }
  
  .app-container {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  
  /* 左侧目录面板 */
  .sidebar {
    width: 280px;
    background: #2d3748;
    color: white;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #4a5568;
  }
  
  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid #4a5568;
  }
  
  .sidebar-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  .add-category-btn {
    width: 100%;
    padding: 8px 12px;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }
  
  .add-category-btn:hover {
    background: #3182ce;
  }
  
  .categories-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }
  
  .category-item {
    padding: 12px;
    margin-bottom: 4px;
    background: #374151;
    border-radius: 6px;
    cursor: move;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.2s;
  }
  
  .category-item:hover {
    background: #4b5563;
  }
  
  .category-item.active {
    background: #4299e1;
  }
  
  .category-item.dragging {
    opacity: 0.5;
  }
  
  .category-name {
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .category-actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  .category-item:hover .category-actions {
    opacity: 1;
  }
  
  .category-btn {
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
  
  .category-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .category-btn.delete:hover {
    background: #e53e3e;
  }
  
  /* 右侧内容区域 */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
  }
  
  .content-header {
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  
  .sidebar-toggle-btn {
    display: none;
    width: 36px;
    height: 36px;
    border: none;
    background: #f3f4f6;
    color: #1f2937;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  
  .sidebar-toggle-btn:hover {
    background: #e5e7eb;
  }
  
  .sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
  
  .content-title {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
  }
  
  .add-note-btn {
    padding: 8px 16px;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }
  
  .add-note-btn:hover {
    background: #059669;
  }
  
  .notes-list {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
  
  .note-item {
    padding: 12px;
    margin-bottom: 8px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s;
  }
  
  .note-item:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
  
  .note-item.editing {
    background: white;
    border-color: #4299e1;
  }
  
  .note-content {
    flex: 1;
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
    word-break: break-word;
    padding-right: 12px;
  }
  
  .note-actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  .note-item:hover .note-actions,
  .note-item.editing .note-actions {
    opacity: 1;
  }
  
  .note-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #6b7280;
    transition: all 0.2s;
  }
  
  .note-btn:hover {
    background: #e5e7eb;
    color: #1f2937;
  }
  
  .note-btn.edit {
    color: #4299e1;
  }
  
  .note-btn.edit:hover {
    background: #dbeafe;
  }
  
  .note-btn.delete {
    color: #ef4444;
  }
  
  .note-btn.delete:hover {
    background: #fee2e2;
  }
  
  .note-btn.save {
    color: #10b981;
  }
  
  .note-btn.save:hover {
    background: #d1fae5;
  }
  
  .note-btn.cancel {
    color: #6b7280;
  }
  
  .note-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    min-height: 60px;
  }
  
  .note-input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #9ca3af;
    font-size: 14px;
  }
  
  .empty-state-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
  }
  
  .loading {
    padding: 20px;
    text-align: center;
    color: #6b7280;
  }
  
  /* 编辑目录输入框 */
  .category-input {
    width: 100%;
    padding: 6px 8px;
    background: #4b5563;
    border: 1px solid #6b7280;
    border-radius: 4px;
    color: white;
    font-size: 14px;
  }
  
  .category-input:focus {
    outline: none;
    border-color: #4299e1;
  }
  
  /* 滚动条样式 */
  .categories-list::-webkit-scrollbar,
  .notes-list::-webkit-scrollbar {
    width: 8px;
  }
  
  .categories-list::-webkit-scrollbar-track,
  .notes-list::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .categories-list::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 4px;
  }
  
  .notes-list::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
  
  .categories-list::-webkit-scrollbar-thumb:hover,
  .notes-list::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  
  /* 移动端响应式样式 */
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      left: -280px;
      top: 0;
      bottom: 0;
      z-index: 999;
      transition: left 0.3s ease;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }
    
    .sidebar.open {
      left: 0;
    }
    
    .sidebar-overlay {
      display: block;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .sidebar-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    
    .sidebar-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .content-header {
      padding: 12px 16px;
    }
    
    .content-title {
      font-size: 18px;
    }
    
    .add-note-btn {
      padding: 6px 12px;
      font-size: 13px;
    }
    
    .notes-list {
      padding: 12px;
    }
    
    .note-item {
      padding: 10px;
      margin-bottom: 6px;
    }
    
    .note-content {
      font-size: 13px;
    }
    
    .sidebar-header {
      padding: 16px;
    }
    
    .sidebar-title {
      font-size: 16px;
    }
    
    .add-category-btn {
      padding: 6px 10px;
      font-size: 13px;
    }
    
    .category-item {
      padding: 10px;
    }
    
    .category-name {
      font-size: 13px;
    }
  }
`;
