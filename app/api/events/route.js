export async function GET(req) {
    const SYMBOLS = [
        { symbol: "COMI", name: "البنك التجاري الدولي", price: 55.13 },
        { symbol: "EFG Hermes", name: "هيرمس", price: 22.75 },
        { symbol: "AMOC", name: "الاسكندرية للزيوت المعدنية (اموك)", price: 7.02 },
        { symbol: "ORWE", name: "اوراسكوم للانشاء والصناعة", price: 130.0 },
        { symbol: "FWRY", name: "فوري لتكنولوجيا البنوك", price: 12.50 },
        { symbol: "ESRS", name: "الحديد والصلب المصرية", price: 1.89 },
        { symbol: "EGCH", name: "المصرية القابضة للكيماويات", price: 13.40 },
        { symbol: "JUFO", name: "جهينة للصناعات الغذائية", price: 8.7 },
        { symbol: "CIEB", name: "بنك قناة السويس", price: 18.60 },
        { symbol: "ETEL", name: "المصرية للاتصالات", price: 38.10 },
        { symbol: "MNHD", name: "مدينة نصر للإسكان", price: 7.90 },
        { symbol: "ELKA", name: "الكابلات الكهربائية المصرية", price: 1.45 },
        { symbol: "PHDC", name: "بالم هيلز للتعمير", price: 4.6 },
        { symbol: "SWDY", name: "السويدي اليكتريك", price: 46.30 },
        { symbol: "TALA", name: "طلعت مصطفى القابضة", price: 15.3 },
        { symbol: "HRHO", name: "المجموعة المالية هيرمس القابضة", price: 24.12 },
        { symbol: "SKTM", name: "سيدي كرير للبتروكيماويات", price: 10.50 },
        { symbol: "CLHO", name: "مستشفى كليوباترا", price: 5.90 },
        { symbol: "AMER", name: "عامر جروب القابضة", price: 0.90 },
        { symbol: "CCAP", name: "سيدي كرير للبتروكيماويات القابضة", price: 8.12 }
    ];

    const fluctuate = (value, maxChange = 3) => {
        const change = (Math.random() - 0.5) * 2 * maxChange;
        return +(value + change).toFixed(2);
    };

    const stream = new ReadableStream({
        start(controller) {
            const send = (data) => {
                controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
            };

            const interval = setInterval(() => {
                const data = SYMBOLS.map((s) => {
                    s.price = fluctuate(s.price);
                    const change = fluctuate(0, 1);
                    const percent = ((change / s.price) * 100).toFixed(2);
                    return {
                        symbol: s.symbol,
                        name: s.name,
                        price: s.price,
                        change,
                        percent,
                        updated: new Date().toLocaleTimeString(),
                    };
                });
                send(data);
            }, 1000);

            req.signal.addEventListener("abort", () => {
                clearInterval(interval);
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}
