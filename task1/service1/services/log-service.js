const Actions = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

async function logAction(shopId, plu, action, description = null) {
  try {
    const response = await fetch("http://localhost:3000/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shop_id: shopId,
        plu,
        action,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send data: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(`Error to send logs: ${err.message}`);
  }
}

module.exports = {
  logAction,
  Actions,
};
