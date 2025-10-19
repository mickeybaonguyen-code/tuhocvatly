// File: functions/chat.js (Đây là Backend - Chạy trên máy chủ Cloudflare)

export async function onRequest(context) {
  try {
    // Chỉ chấp nhận yêu cầu POST (bảo mật hơn)
    if (context.request.method !== 'POST') {
      return new Response('Phương thức không được phép', { status: 405 });
    }

    // Đọc "prompt" mà tệp script.js gửi lên
    const body = await context.request.json();
    const userPrompt = body.prompt;

    if (!userPrompt) {
      return new Response('Thiếu nội dung prompt', { status: 400 });
    }

    // 🧠 Đây là nơi gọi AI
    // context.env.AI là biến môi trường AI mà chúng ta sẽ cài đặt ở Bước 3
    const aiResponse = await context.env.AI.run(
      '@cf/meta/llama-3-8b-instruct', // Tên mô hình AI miễn phí
      {
        prompt: userPrompt, // Gửi "siêu prompt" của bạn cho AI
      }
    );

    // Trả kết quả (chỉ là văn bản) về cho tệp script.js
    return new Response(JSON.stringify(aiResponse), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    console.error("Lỗi bên trong Worker:", e);
    return new Response('Lỗi máy chủ nội bộ', { status: 500 });
  }
}
