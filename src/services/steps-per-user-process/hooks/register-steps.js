/* eslint-disable quotes */

const findService = require("../../../functions/findService");

module.exports = () => {
  return async (context) => {
    const { data } = context;
    const { stepPerUserProcessUserId, stepPerUserProcessType } = data;

    let response = {
      alert: "",
      type: "error",
    };
    if (!stepPerUserProcessUserId || !stepPerUserProcessType) {
      response.alert =
        "No fueron proporcionadas las propiedades minimas de registro";
      context.result = response;
      return context;
    }

    const processTypeDbReponse = await findService(
      context,
      { id: stepPerUserProcessType },
      "types"
    );

    if (!processTypeDbReponse.data.length > 0) {
      response.alert =
        "El id de tipo ingresado no corresponde a ningún tipo registrado en la base de datos";
      context.result = response;
      return context;
    }

    const userDbReponse = await findService(
      context,
      { id: stepPerUserProcessUserId },
      "users"
    );

    if (!userDbReponse.data.length > 0) {
      response.alert =
        "El id de usuario ingresado no corresponde a ningún usuario registrado en la base de datos";
      context.result = response;
      return context;
    }

    const stepsPerUserProcessDbResponse = await findService(
      context,
      { stepPerUserProcessUserId, stepPerUserProcessType },
      "steps-per-user-process"
    );

    if (stepsPerUserProcessDbResponse.data.length > 0) {
      response.alert =
        "En la base de datos ya hay un registro de pasos por proceso de usuario correspondientes al id de usuario y tipo ingresado";
      response.type = "succes";
      context.result = response;
      return context;
    }

    let stepPerUserProcessStepsPerProcessId = 1;
    let stepPerUserProcessInvalidSteps = [];
    if (stepPerUserProcessType === 3) {
      stepPerUserProcessStepsPerProcessId = 1;
      stepPerUserProcessInvalidSteps = [4, 6];
    }
    if (
      stepPerUserProcessType === 4 ||
      stepPerUserProcessType === 5 ||
      stepPerUserProcessType === 6
    ) {
      stepPerUserProcessStepsPerProcessId = 2;
    }
    if (stepPerUserProcessType === 32) {
      stepPerUserProcessStepsPerProcessId = 3;
    }

    context.data = {
      stepPerUserProcessReadySteps: data.stepPerUserProcessReadySteps
        ? data.stepPerUserProcessReadySteps
        : [],
      stepPerUserProcessStepsPerProcessId:
        data.stepPerUserProcessStepsPerProcessId
          ? data.stepPerUserProcessStepsPerProcessId
          : stepPerUserProcessStepsPerProcessId,
      stepPerUserProcessInvalidSteps: data.stepPerUserProcessInvalidSteps
        ? data.stepPerUserProcessInvalidSteps
        : stepPerUserProcessInvalidSteps,
      stepPerUserProcessUserId,
      stepPerUserProcessType,
      stepPerUserProcessState: data.stepPerUserProcessState
        ? data.stepPerUserProcessState
        : true,
    };

    // context.result = response;
    return context;
  };
};
