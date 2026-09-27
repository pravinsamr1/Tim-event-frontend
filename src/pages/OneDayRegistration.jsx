import RegistrationPage from "./RegistrationPage";
import { PLANS, PLAN_TYPES } from "../config/plans";

export default function OneDayRegistration() {
  return <RegistrationPage plan={PLANS[PLAN_TYPES.ONE_DAY]} />;
}
