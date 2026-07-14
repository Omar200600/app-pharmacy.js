// app-pharmacy.js - ملف التحكم المخصص للصيدليات
const LICENSE_KEY = "OMAR-AXIS-2026-XYZ"; 
const WHATSAPP_NUMBER = "967777777777"; // رقم صيدليتك

const businessData = {
    name: "صيدلية الشفاء الحديثة",
    type: "pharmacy",
    hours: "يومياً من 8 صباحاً حتى 11 مساءً",
    welcomeText: "مرحباً بك في صيدلية الشفاء! يمكنك الاستفسار عن الأدوية أو تصوير الروشتة وطلبها مباشرة عبر الواتساب. 💊",
    items: [
        { name: "بندول", price: "500 ريال", category: "أدوية", status: "متوفر", extraInfo: "مسكن للآلام وخافض للحرارة" },
        { name: "فيتامين سي", price: "1200 ريال", category: "فيتامينات", status: "متوفر", extraInfo: "فوار لتقوية المناعة" },
        { name: "شراب كحة", price: "800 ريال", category: "أدوية", status: "متوفر", extraInfo: "مهدئ للسعال طارد للبلغم" }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('botName')) document.getElementById('botName').innerText = businessData.name;
    if (document.getElementById('welcomeMessage')) document.getElementById('welcomeMessage').innerText = businessData.welcomeText;
});

async function getAIResponse(userMessage) {
    if (LICENSE_KEY !== "OMAR-AXIS-2026-XYZ") return;
    const messageLower = userMessage.toLowerCase().trim();

    if (messageLower.includes("دوام") || messageLower.includes("وقت") || messageLower.includes("تفتحوا")) {
        appendMessage(`أوقات العمل في ${businessData.name} هي: ${businessData.hours}`, 'bot');
        return;
    }

    let foundItems = [];
    for (let item of businessData.items) {
        if (messageLower.includes(item.name.toLowerCase()) || (item.extraInfo && messageLower.includes(item.extraInfo.toLowerCase()))) {
            foundItems.push(item);
        }
    }

    if (foundItems.length > 0) {
        foundItems.forEach(item => {
            if (item.status === "متوفر") {
                const whatsappText = encodeURIComponent(`مرحباً ${businessData.name}، أود طلب شراء دواء: (${item.name}) بسعر ${item.price} عبر مساعدكم الذكي.`);
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;
                const responseHtml = `
                    <div style="margin-bottom: 5px;">
                        <strong>💊 ${item.name}</strong><br>
                        💰 السعر: ${item.price}<br>
                        💡 التفاصيل: ${item.extraInfo}<br>
                        ✅ الحالة: ${item.status}
                    </div>
                    <a href="${whatsappUrl}" target="_blank" class="whatsapp-btn" style="background-color: #25D366; display: inline-flex; align-items: center; gap: 8px; color: white; padding: 8px 15px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: bold; margin-top: 5px;">
                         طلب الدواء عبر الواتساب 💬
                    </a>
                `;
                appendHtmlMessage(responseHtml, 'bot');
            }
        });
        return;
    }

    appendMessage(`بخصوص استفسارك عن "${userMessage}"، تم إرسال الطلب للصيدلي المناوب ليفيدك بتوفره وبدائله فوراً!`, 'bot');
}
