export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate,
    };

    const res = await fetch(
      `https://vue-http-demo-c40f2-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      { method: "PUT", body: JSON.stringify(coachData) }
    );

    //const responseData = await res.json();

    if (!res.ok) {
      return;
    }
    context.commit("registerCoach", { ...coachData, id: userId });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const res = await fetch(
      `https://vue-http-demo-c40f2-default-rtdb.firebaseio.com/coaches.jso`
    );
    const responseData = await res.json();
    if (!res.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      return error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestap");
  },
};
