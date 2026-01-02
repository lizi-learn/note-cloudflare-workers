import { handleAPI } from './api.js';
import { getHTML } from './template.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 处理API请求
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env);
    }
    
    // 返回前端页面
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(getHTML(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    
    return new Response('Not Found', { status: 404 });
  },
};
