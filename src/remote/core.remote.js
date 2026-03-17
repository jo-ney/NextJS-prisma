// const API_URL = "http://localhost:4000";

const API_URL = "https://backend-node-js-template.vercel.app";

export default class CoreRemote {
  async post(endpoint, inputdata) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputdata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const output = await response.json();
    return output;
  }

  // async get(endpoint, inputdata) {
  // console.log('console------>11111111111111inputdata:', inputdata);
  //     const url = `${API_URL}${endpoint}`;
  //     console.log('console------>url:', url);

  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     //   body: JSON.stringify(inputdata)
  //       // No body for GET requests!
  //     });

  //     if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const output = await response.json();
  //       return output;
  // }

  // async get(endpoint, inputdata) {
  //     // const params = new URLSearchParams(inputdata?.inputData || {}).toString();
  //     const url = `${API_URL}${endpoint}`;

  //     console.log('Full URL:', url);

  //     const response = await fetch(url, { method: 'GET' });
  //     console.log('console------>response:', response);

  //     if (!response.ok) throw new Error(`HTTP ${response.status}`);
  //     return response.json();
  //   }

  async get(endpoint, inputdata) {
    try {
      // Build URL with query parameters if inputdata exists
      const url = `${API_URL}${endpoint}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(inputdata),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("❌ Fetch error:", error);
      throw error;
    }
  }
}
