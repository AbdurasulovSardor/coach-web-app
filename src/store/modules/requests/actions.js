export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message,
    };
    const response = await fetch(
      `https://vue-http-demo-c40f2-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    const responseDate = await response.json();

    if (!response.ok) {
      const error = new Error(responseDate.message || "Failed to send request");
      throw error;
    }
    newRequest.id = responseDate.firstName;
    newRequest.coachId = payload.coachId;
    context.commit("newRequest", newRequest);
  },
  async fetchRequest(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-http-demo-c40f2-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const responseDate = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseDate.message || "Failed to fetch request"
      );
      throw error;
    }

    const requests = [];

    for (const key in responseDate) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseDate[key].userEmail,
        message: responseDate[key].userMessage,
      };
      requests.push(request);
    }

    context.commit("setRequest", requests);
  },
};
