import { BACKEND_MICROSERVICE } from "../index";
import { ConditionToLabel } from "../../constants"

const GETCONDITION_URL = `${BACKEND_MICROSERVICE}/api/toLabel/getConditionToLabel`

export const getCondition = async (): Promise<ConditionToLabel> => {
    const response = await fetch(`${GETCONDITION_URL}`, {
    });
    return await response.json();
}