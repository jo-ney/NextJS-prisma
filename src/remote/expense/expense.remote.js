import coreRemote from "../core.remote";

const CoreRemote = new coreRemote();

export default class {
  async searchExpense(request) {
    const endpoint = "/api/expense";

    let output = await CoreRemote.get(endpoint, request);

    return output;
  }
}
