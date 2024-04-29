import { getServerSession as getServerSessionNextAuth } from "next-auth";
import { authOptions } from "./auth-options";

export const getServerSession = () => getServerSessionNextAuth(authOptions);
