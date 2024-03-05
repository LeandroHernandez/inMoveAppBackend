/* eslint-disable quotes */
const findService = require("../../../functions/findService");
const createService = require("../../../functions/createService");
module.exports = () => {
  return async (context) => {
    const { data } = context;

    let response = {};

    const userDbResponse = await findService(
      context,
      { userPhone: data.userPhone },
      "users"
    );
    if (!userDbResponse.data.length > 0) {
      response.data = {
        alert: "El usuario no se encuentra registrado",
        type: "error",
      };
      context.result = response;
      return response;
    } else {
      const stepsPerProcessDbResponse = await findService(
        context,
        { stepPerProcessReference: "Registro Conductor" },
        "steps-per-process"
      );
      const typeDbResponse = await findService(
        context,
        { typeName: "Registro Conductor" },
        "types"
      );
      const stepsPerProcessId =
        stepsPerProcessDbResponse.data.length > 0
          ? stepsPerProcessDbResponse.data[0].id
          : 1;
      const userId =
        userDbResponse.data.length > 0 ? userDbResponse.data[0].id : 1;
      const processTypeId =
        typeDbResponse.data.length > 0 ? typeDbResponse.data[0].id : 19;
      const stepsPerUserProcessDbResponse = await findService(
        context,
        {
          stepPerUserProcessUserId: userId,
          stepPerUserProcessType: processTypeId,
        },
        "steps-per-user-process"
      );
      if (!stepsPerUserProcessDbResponse.data.length > 0) {
        createService(context, "steps-per-user-process", {
          stepPerUserProcessReadySteps: [],
          // stepPerUserProcessStepsPerProcessId:
          //   stepsPerProcessRoleDbResponse.data.length > 0
          //     ? stepsPerProcessRoleDbResponse.data[0].id
          //     : 1,
          stepPerUserProcessStepsPerProcessId: stepsPerProcessId,
          stepPerUserProcessUserId: userId,
          stepPerUserProcessType: processTypeId,
          stepPerUserProcessState: true,
        })
          .then((stepPerUserProcessCreated) => {
            console.log({ stepPerUserProcessCreated });
            // response.data = {
            //   alert: "Usuario registrado correctamente",
            //   type: "succes",
            //   user: {
            //     ...userDbResponse.data[0],
            //     stepPerUserProcess: { ...stepPerUserProcessCreated },
            //   },
            // };
          })
          .catch((error) => {
            console.log({ error });
            response.data = {
              alert: "No se pudo registrar el dispositivo",
              type: "error",
            };
            context.result = response;
            return context;
          });
      }
    }
    context.result = response;
  };
};
