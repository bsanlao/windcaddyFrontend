import { BACKEND_MICROSERVICE } from "../index";
import { ConditionToLabel, ConditionToLabelResponse } from "../../constants"

const GETCONDITION_URL = `${BACKEND_MICROSERVICE}/api/toLabel/getConditionToLabel`
const POSTCONDITION_URL = `${BACKEND_MICROSERVICE}/api/wclabeldatasets`

export const getCondition = async (): Promise<ConditionToLabel> => {
    const response = await fetch(`${GETCONDITION_URL}`, {
    });
    return await response.json();
}
export const saveCondition = async (data: ConditionToLabel): Promise<ConditionToLabelResponse> => {
    try {
        const response = await fetch(POSTCONDITION_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    if (response.ok) {
        return { success: true, response}
    } else {
        console.error('Error en el etiquetado de datos:', response.statusText);
        return { success: false, response };
    }

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { success: false };
    }
}

