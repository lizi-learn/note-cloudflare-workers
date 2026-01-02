// API处理函数
export async function handleAPI(request, env) {
  const url = new URL(request.url);
  const method = request.method;
  
  // 获取所有数据（目录和笔记）
  if (url.pathname === '/api/data' && method === 'GET') {
    const dataJson = await env.NOTEBOOK_DATA.get('data');
    if (dataJson) {
      return new Response(dataJson, {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // 默认数据结构
    const defaultData = {
      categories: [],
      notes: []
    };
    return new Response(JSON.stringify(defaultData), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // 保存数据
  if (url.pathname === '/api/data' && method === 'POST') {
    const data = await request.json();
    await env.NOTEBOOK_DATA.put('data', JSON.stringify(data));
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return new Response('Not Found', { status: 404 });
}
