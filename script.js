document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử DOM (chỉ chạy khi trang chat.html được tải)
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Thoát nếu không ở trang chat (ví dụ: ở trang index.html)
    if (!chatWindow || !userInput || !sendBtn) {
        return;
    }

    // =================================================================
    // ==== VIỆC CẦN LÀM 1: THAY THẾ API_KEY CỦA BẠN VÀO ĐÂY ====
    // =================================================================
    // LƯU Ý BẢO MẬT: KHÔNG BAO GIỜ ĐỂ API KEY LỘ RA BÊN NGOÀI
    // Code này chỉ chạy ở phía client (trình duyệt), dễ bị lộ key.
    // Với dự án thật, bạn nên tạo một server (backend) để giấu key này.
    const API_KEY = "AIzaSyBGFjNJNv5zxFQ_3ttbGKW8xzHkfEz03qI"; 
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    // =================================================================
    // ==== VIỆC CẦN LÀM 2: DÁN NỘI DUNG SÁCH GIÁO KHOA VÀO ĐÂY ====
    // =================================================================
    const textbookContext = `
        CHUYÊN ĐỀ 3: VẬT LÍ VỚI GIÁO DỤC VỀ BẢO VỆ MÔI TRƯỜNG Bài 7. Môi trường và bảo vệ môi trường Môi trường và Phát triển bền vữngTheo Luật Bảo vệ môi trường của Việt Nam, môi trường bao gồm các yếu tố vật chất tự nhiên và nhân tạo bao quanh con người, ảnh hưởng đến đời sống và sự phát triển126. Cấu trúc môi trường gồm ba thành tố có mối quan hệ chặt chẽ: sinh thái tự nhiên, xã hội – nhân văn, và hoạt động kinh tế. Phát triển bền vững là sự phát triển đáp ứng nhu cầu hiện tại mà không làm ảnh hưởng đến khả năng đáp ứng nhu cầu của các thế hệ tương lai, đòi hỏi sự hài hòa giữa tăng trưởng kinh tế, công bằng xã hội và bảo vệ môi trường128.Các yếu tố ảnh hưởng đến môi trườngÔ nhiễm môi trường: Sự xâm nhập của các chất độc hại vào đất, nước và không khí.Biến đổi khí hậu: Sự thay đổi nhiệt độ toàn cầu, dâng nước biển và các hiện tượng thời tiết cực đoan130.Phát triển dân số: Gia tăng dân số gây áp lực lớn lên tài nguyên thiên nhiên131.Bảo vệ môi trườngViệc bảo vệ môi trường là cần thiết để hướng tới sự phát triển bền vững132. Nhiều chiến lược quốc tế đã được đề ra, như Tuyên ngôn Stockholm (1972), Nghị định thư Montreal (1987) và Hiệp định Paris (2017). Việt Nam cũng đã ban hành Luật Bảo vệ môi trường và đặt ra các mục tiêu dài hạn để đảm bảo cân bằng sinh thái và phát triển kinh tế xanh. Mỗi cá nhân và hộ gia đình có vai trò quan trọng trong việc bảo vệ môi trường thông qua các hành động như giảm thiểu, phân loại rác thải sinh hoạt; tiết kiệm điện; và tham gia các hoạt động cộng đồng.Bài 8. Năng lượng hoá thạch và năng lượng tái tạo 136Năng lượng hoá thạchĐây là năng lượng được sinh ra từ các nhiên liệu như than đá, dầu mỏ, khí thiên nhiên, được hình thành từ xác sinh vật qua hàng triệu năm137. Đây là nguồn năng lượng không tái tạo, có trữ lượng giới hạn và sẽ cạn kiệt138. Ưu điểm của nó là có thể sử dụng bất kỳ lúc nào và chi phí khai thác tương đối thấp139. Tuy nhiên, nhược điểm lớn là việc đốt cháy chúng sinh ra các khí thải độc hại, gây hiệu ứng nhà kính và ô nhiễm môi trường140.Năng lượng tái tạoĐây là dạng năng lượng từ các nguồn tự nhiên vô tận hoặc có khả năng tái tạo nhanh chóng như Mặt Trời, gió, nước, địa nhiệt và sinh khối141.Năng lượng mặt trời: Được chuyển hóa thành điện năng (pin quang điện) hoặc nhiệt năng (bếp, máy nước nóng năng lượng mặt trời).Năng lượng gió: Sử dụng tuabin gió để chuyển động năng của gió thành điện năng.Năng lượng nước (thủy điện): Tận dụng thế năng của nước ở các đập cao để làm quay tuabin phát điện144.Năng lượng địa nhiệt: Khai thác nhiệt từ trong lòng đất.Năng lượng sinh khối: Năng lượng từ các vật liệu hữu cơ như rơm rạ, bã mía, rác thải146.Vai trò của năng lượng tái tạo là rất quan trọng, giúp giảm phụ thuộc vào năng lượng hóa thạch, đảm bảo an ninh năng lượng và giảm thiểu tác động đến môi trường.Bài 9. Tác động của việc sử dụng năng lượng ở Việt Nam 148Tình hình sử dụng năng lượngViệt Nam vẫn phụ thuộc nhiều vào năng lượng hóa thạch. Than đá là nguồn nhiên liệu chủ yếu cho các ngành công nghiệp nặng và sản xuất điện149. Dầu khí cũng đóng vai trò quan trọng, đáp ứng một phần đáng kể nhu cầu xăng dầu và sản xuất điện của cả nước150. Mặc dù có tiềm năng lớn, việc khai thác năng lượng tái tạo (thủy điện, điện gió, điện mặt trời) vẫn chưa tương xứng151.Tác động đến môi trường, kinh tế và khí hậuThan đá: Việc khai thác than đá gây ô nhiễm nguồn nước, xói mòn đất và phá hủy thảm thực vật152. Các nhà máy nhiệt điện than là nguồn phát thải khí nhà kính chính153.Dầu khí: Quá trình lọc dầu thải ra nhiều hóa chất độc hại. Các sự cố tràn dầu gây ô nhiễm nghiêm trọng môi trường biển.Năng lượng nước (thủy điện): Việc xây dựng các đập thủy điện làm mất diện tích rừng, thay đổi dòng chảy tự nhiên và tác động tiêu cực đến hệ sinh thái.Năng lượng mặt trời: Mặc dù sạch khi vận hành, việc sản xuất và xử lý các tấm pin mặt trời sau khi hết hạn sử dụng (chứa các kim loại nặng) là một thách thức môi trường lớn156.Năng lượng gió: Tiếng ồn từ các tuabin có thể ảnh hưởng đến cư dân và hệ động vật. Việc xử lý các cánh quạt khổng lồ sau khi hết hạn sử dụng cũng là một vấn đề.Bài 10. Ô nhiễm môi trường 158Các tác nhân gây ô nhiễmKhai thác và sử dụng nhiên liệu hóa thạch: Đây là tác nhân chính gây ô nhiễm không khí, đất, và nước159. Việc đốt cháy nhiên liệu hóa thạch giải phóng các khí độc hại như $CO_2$, $SO_2$, và $NO_x$, là nguyên nhân chính gây ra hiệu ứng nhà kính và mưa acid160160160160.Mưa acid: Là hiện tượng các acid như $H_2SO_4$ và $HNO_3$ lắng đọng từ khí quyển xuống mặt đất161. Nó gây hại cho cây cối, sinh vật dưới nước, và ăn mòn các công trình xây dựng.Năng lượng hạt nhân và ô nhiễm phóng xạ: Các chất thải từ nhà máy điện hạt nhân hoặc các sự cố rò rỉ có thể gây ô nhiễm phóng xạ lâu dài, gây ra các bệnh nghiêm trọng như ung thư và dị tật di truyền.Biến đổi khí hậu và Suy giảm tầng OzoneBiến đổi khí hậu: Là sự thay đổi của hệ thống khí hậu toàn cầu, chủ yếu do hoạt động của con người làm tăng nồng độ khí nhà kính. Các biểu hiện rõ rệt bao gồm sự nóng lên toàn cầu, băng tan ở hai cực, mực nước biển dâng, và các hiện tượng thời tiết cực đoan như siêu bão, hạn hán.Suy giảm tầng Ozone: Tầng ozone trong khí quyển có vai trò hấp thụ tia cực tím có hại từ Mặt Trời166. Các chất hóa học do con người tạo ra, đặc biệt là CFC, đã phá hủy các phân tử ozone, tạo ra "lỗ thủng tầng ozone" và làm tăng nguy cơ ung thư da và các bệnh về mắt cho con người.
    `;

    // Gán sự kiện cho nút Gửi và phím Enter
    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    /**
     * Hàm xử lý chính khi người dùng gửi tin nhắn
     */
    async function handleSendMessage() {
        const userQuestion = userInput.value.trim();
        if (userQuestion === "") return;

        // 1. Hiển thị câu hỏi của người dùng lên màn hình
        addMessageToWindow(userQuestion, 'user');
        userInput.value = ''; // Xóa nội dung trong ô input

        // 2. Hiển thị trạng thái "đang tải"
        const loadingMessage = addMessageToWindow("Bot đang suy nghĩ...", 'bot loading');

        // 3. Xây dựng prompt cuối cùng gửi đến AI
        const finalPrompt = buildFinalPrompt(userQuestion);

        try {
            // 4. Gọi API
            const botResponse = await callChatbotAPI(finalPrompt);

            // 5. Gỡ bỏ tin nhắn "đang tải" và hiển thị câu trả lời của bot
            chatWindow.removeChild(loadingMessage);
            addMessageToWindow(botResponse, 'bot');

        } catch (error) {
            // 6. Xử lý lỗi
            console.error("Lỗi gọi API:", error);
            chatWindow.removeChild(loadingMessage);
            addMessageToWindow("Xin lỗi, đã có lỗi xảy ra. Bạn vui lòng thử lại sau.", 'bot');
        }
    }

    /**
     * Hàm quan trọng: Xây dựng prompt để hướng dẫn AI trả lời
     */
    function buildFinalPrompt(userQuestion) {
        // Đây chính là phần "tự bổ sung thêm prompt" mà bạn yêu cầu
        return `
            Bạn là một trợ lý AI (chatbot) với vai trò là một giáo viên Vật Lý THPT thân thiện, nhiệt tình.
            
            **NGỮ LIỆU BẮT BUỘC (CONTEXT):**
            Dưới đây là toàn bộ nội dung của Chủ đề 3, Sách giáo khoa Vật lí Chuyên đề 10 (Chân trời sáng tạo):
            --- BẮT ĐẦU NGỮ LIỆU ---
            ${textbookContext}
            --- KẾT THÚC NGỮ LIỆU ---

            **YÊU CẦU DÀNH CHO BẠN:**
            Một học sinh vừa hỏi bạn câu hỏi sau: "${userQuestion}"

            **HÃY THỰC HIỆN CÁC BƯỚC SAU:**
            1.  **KIỂM TRA NGỮ LIỆU:** Đọc kỹ câu hỏi của học sinh và tìm kiếm câu trả lời CHỈ trong phần **NGỮ LIỆU BẮT BUỘC** ở trên.
            2.  **NẾU TÌM THẤY TRONG NGỮ LIỆU:** Hãy trả lời câu hỏi đó một cách rõ ràng, sư phạm, và giải thích dựa trên nội dung đã cho. Bắt đầu câu trả lời một cách tự nhiên (ví dụ: "Chào em, theo nội dung chúng ta đang học thì...", "Rất hay! Về vấn đề này, sách giáo khoa có nêu rõ:..." ).
            3.  **NẾU KHÔNG TÌM THẤY TRONG NGỮ LIỆU:** Hãy thông báo RÕ RÀNG cho học sinh rằng câu hỏi này nằm ngoài phạm vi Chủ đề 3. 
                * SAU KHI THÔNG BÁO, bạn CÓ THỂ cung cấp thêm thông tin bên ngoài nếu bạn biết, nhưng phải nói rõ: "Tuy nhiên, nếu em muốn tìm hiểu thêm, thì (thông tin bên ngoài)...".
                * Ví dụ trả lời: "Câu hỏi này rất thú vị, nhưng nó nằm ngoài phạm vi Chủ đề 3 (Vật lí Chuyên đề 10) mà chúng ta đang tìm hiểu. Tuy nhiên, nếu em muốn tìm hiểu thêm, thì (giải thích thông tin bên ngoài)..."
            
            Giữ giọng văn luôn thân thiện, khuyến khích học sinh tự học.
        `;
    }

    /**
     * Hàm gọi API của Google Gemini (hoặc AI khác)
     */
    async function callChatbotAPI(promptText) {
        const payload = {
            contents: [
                {
                    parts: [
                        { text: promptText }
                    ]
                }
            ],
            // Có thể thêm các cài đặt an toàn (safetySettings) tại đây nếu cần
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Trích xuất văn bản trả lời từ cấu trúc JSON của Gemini
        // Kiểm tra kỹ cấu trúc response nếu bạn dùng API khác
        try {
            return data.candidates[0].content.parts[0].text;
        } catch (e) {
            console.error("Lỗi trích xuất dữ liệu:", data);
            throw new Error("Không thể phân tích phản hồi từ AI.");
        }
    }

    /**
     * Hàm thêm tin nhắn vào cửa sổ chat
     */
    function addMessageToWindow(message, sender) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message', ...sender.split(' '));
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message; // Dùng textContent để tránh lỗi XSS

        messageWrapper.appendChild(messageParagraph);
        chatWindow.appendChild(messageWrapper);

        // Tự động cuộn xuống tin nhắn mới nhất
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        return messageWrapper; // Trả về phần tử tin nhắn (để dùng khi xóa tin nhắn "loading")
    }

});




