// src/app/api/test-api/route.ts

export async function GET(request: Request) {
    const url =
      "http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02" +
      "?serviceKey=qIpYDTXd6lhaG13C/3FtyG698PH7jtb96/QAiAfXx8V2qm5CfzO7TCl6rBwzC7Hd3w+IDXPtZHuFrls32LRFuQ==" +
      "&pageNo=1&numOfRows=5";
  
    try {
      const res = await fetch(url);
      const xml = await res.text();
  
      return new Response(xml, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
    } catch (error) {
      return new Response("Failed to fetch data", { status: 500 });
    }
  }
  