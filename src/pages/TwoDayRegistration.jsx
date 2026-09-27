import RegistrationPage from "./RegistrationPage";
import { PLANS, PLAN_TYPES } from "../config/plans";

export default function TwoDayRegistration() {
  return <RegistrationPage plan={PLANS[PLAN_TYPES.TWO_DAY]} />;
}
